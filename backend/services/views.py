from django.http.response import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from .models import Content, SocialAccounts
from .utils.helper import email_exists, username_exists, password_is_valid

import json
import datetime
from idlelib.idle_test.test_config import usercfg

# Create your views here.

### USER
def user_register(request) -> JsonResponse:
    username = request.POST.get('username')
    password = request.POST.get('password')
    email = request.POST.get('email')
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')

    if not email_exists(email) and not username_exists(username):
        return JsonResponse({'error': 'Email or username already exists'}, status=400)

    if not password_is_valid(password):
        return JsonResponse({'error': 'Password must be at least 8 characters long'}, status=400)

    user = User.objects.create_user(username=email, email=email, password=password,
                                    first_name=first_name, last_name=last_name)
    user.save()

    return JsonResponse({'message': 'User registered successfully'}, status=201)


def user_login(request) -> JsonResponse:
    username = request.POST.get('username')
    password = request.POST.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({'message': 'Login successful'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=401)

def user_logout(request) -> JsonResponse:
    logout(request)
    return JsonResponse({'message': 'Logout successful'}, status=200)
###

### CONTENT

def social_accounts(request) -> JsonResponse:
    """
    Add and show social accounts
    """
    # add platform
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required'}, status=401)

    if request.method == 'POST':
        platform = request.POST.get('platform')
        access_token = request.POST.get('access_token')
        username = request.POST.get('username')

        if not all([platform, access_token, username]):
            return JsonResponse({'error': 'Missing required fileds'}, status=400)

        if platform not in dict(SocialAccounts.PLATFORM_CHOICES):
            return JsonResponse({'error': 'Invalid Platform'}, status=400)

        try:
            social_account, created = SocialAccounts.objects.update_or_create(
                user=request.user,
                platform=platform,
                defaults={
                    'access_token': access_token,
                    'username': username
                }
            )

            return JsonResponse({
                'message': 'Social account added successfully',
                'data': {
                    'platform': social_account.platform,
                    'username': social_account.username,
                    'created_at': social_account.created_at
                }
            }, status=201 if created else 200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    elif request.method == 'GET':
        try:
            accounts = SocialAccounts.objects.filter(user=request.user)
            accounts_data = [{
               'platform': account.platform,
               'username': account.username,
               'created_at': account.created_at
            } for account in accounts]

            return JsonResponse({
                'data': accounts_data,
            }, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({
        'error': 'Method not allowed'},
        status=405
    )

def handle_get_social_account(request, id) -> JsonResponse:
    try:
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Authentication required'}, status=401)

        accounts = SocialAccounts.objects.filter(user=request.user, id=id)
        account = accounts.first()

        if account:
            return JsonResponse({
                'platform': account.platform,
                'username': account.username,
                'access_token': account.access_token,
                'created_at': account.created_at
            })
        else:
            return JsonResponse({
                'error': f'An error occurred while getting accounts for {request.user}'
            })

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def handle_update_social_account(request, id) -> JsonResponse:
    try:
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Authentication required'}, status=401)

        accounts = SocialAccounts.objects.filter(user=request.user, id=id)
        account = accounts.first()

        if account:
            data = json.loads(request.body)
            account.platform = data.get('platform', account.platform)
            account.username = data.get('username', account.username)
            account.access_token = data.get('access_token', account.access_token)
            account.save()

            return JsonResponse({
                'message': 'Social account updated successfully',
                'data': {
                    'platform': account.platform,
                    'username': account.username,
                    'access_token': account.access_token,
                    'created_at': account.created_at
                }
            }, status=200)

        else:
            return JsonResponse({
                'error': f"Couldn't find any account for {request.user}"
            })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def handle_delete_social_account(request, id):
    try:
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Authentication required'}, status=401)

        accounts = SocialAccounts.objects.filter(user=request.user, id=id)
        account = accounts.first()

        if account:
            account.delete()

            return JsonResponse({
                'message': 'Social account deleted successfully',
            }, status=200)

        else:
            return JsonResponse({
                'error': 'An error occurred while deleting the social account'
            }, status=404)

    except Exception as e:
        return JsonResponse({'error': str(e), 'message': 'An error occured while deleting account'}, status=500)

###

### CONTENT

def handle_get_content(request, id):
    try:
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Authentication required'}, status=401)

        contents = Content.objects.filter(user=request.user, id=id)

        if contents:
            data = [{
                'title': content.title,
                'content': content.content,
                'image': content.image if content.image else None,
                'created_at': content.created_at,
                'draft': content.draft,
                'scheduled_at': content.schedulet_at,
                'social_accounts': content.social_accounts,
            } for content in contents]

            return JsonResponse({
                'message': 'success',
                'data': data
            })

        else:
            return JsonResponse({"message": f"Couldn't find any content for {request.user}"})

    except Exception as e:
        return JsonResponse({'error': str(e), 'message': 'An error occured while getting content'})

def handle_create_content(request):
    try:
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Authentication required'}, status=401)

        title: str = request.POST.get('title')
        content_text: str = request.POST.get('content')
        image = request.FILES.get('image') # dosya yuklemesi icin
        scheduled_at = request.POST.get('scheduled_at')
        draft = request.POST.get('draft', True) # Default True

        if not all([title, content_text]):
            return JsonResponse({
                'error': 'Title and content are required'
            }, status=400)


        new_content = Content.objects.create(
            user=request.user,
            title=title,
            content=content_text,
            image=image,
            draft=draft,
            scheduled_at=scheduled_at if scheduled_at else None,
        )

        user_social_accounts = SocialAccounts.objects.filter(user=request.user)
        new_content.social_accounts.add(*user_social_accounts)

        return JsonResponse({
            'message': 'Content created successfully',
            'data': {
                'id': new_content.id,
                'title': new_content.title,
                'content': new_content.content,
                'image': new_content.image.url if new_content.image else None,
                'created_at': new_content.created_at,
                'draft': new_content.draft,
                'scheduled_at': new_content.scheduled_at,
                'social_accounts': list(user_social_accounts.values('platform', 'username'))

            }
        }, status=201)

    except Exception as e:
        return JsonResponse({
            'error': str(e),
            'message': 'An error occured while creating content'
        }, status=500)

def get_content_detail(request, id):
    try:
        if not request.user.is_authenticated:
            return JsonResponse({
                'error': 'Unauthorized',
                'message': 'You must be logged in to access this content'
            }, status=401)

        content = Content.objects.get(id=id)

        if not content:
            return JsonResponse({
                'error': 'Content not found',
                'message': 'The requested content does not exist'
            })

        return JsonResponse({
            'message': 'Content retrieved successfully',
            'data': {
                'id': content.id,
                'title': content.title,
                'content': content.content,
                'image': content.image.url if content.image else None,
                'created_at': content.created_at,
                'draft': content.draft,
                'scheduled_at': content.scheduled_at,
                'social_accounts': list(content.social_accounts.values('platform', 'username'))
            }
        })

    except Exception as e:
        return JsonResponse({
            'error': str(e),
            'message': 'An error occured while retrieving content'
        }, status=500)

def handle_update_content(request, id):
    try:
        if not request.user.is_authenticated:
            return JsonResponse({
                'error': 'Unauthorized',
                'message': 'You must be logged in to access this content'
            }, status=401)

        content = Content.objects.get(id=id)

        if not content:
            return JsonResponse({
                'error': 'Content not found',
                'message': 'The requested content does not exist'
            })

        data = json.loads(request.body)

        content.title = data['title']
        content.content = data['content']
        content.image = data['image']
        content.draft = data['draft']
        content.scheduled_at = data['scheduled_at']

        content.save()

        return JsonResponse({
            'message': 'Content updated successfully',
            'data': {
                'id': content.id,
                'title': content.title,
                'content': content.content,
                'image': content.image.url if content.image else None,
                'created_at': content.created_at,
                'draft': content.draft,
                'scheduled_at': content.scheduled_at,
                'social_accounts': list(content.social_accounts.values('platform', 'username'))
            }
        })
    except Exception as e:
        return JsonResponse({
            'error': str(e),
            'message': 'An error occurred while updating content'
        }, status=500)

def handle_delete_content(request, id) -> JsonResponse:
    try:
        if not request.user.is_authenticated:
            return JsonResponse({
                'error': 'Unauthorized',
                'message': 'You must be logged in to access this content'
            }, status=401)

        content = Content.objects.get(id=id)

        if not content:
            return JsonResponse({
                'error': 'Content not found',
                'message': 'The requested content does not exist'
            })

        content.delete()

        return JsonResponse({
            'message': 'Content deleted successfully'
        })

    except Exception as e:
        return JsonResponse({
            'error': str(e),
            'message': 'An error occured while deleting content'
        }, status=500)


def handle_schedule_content(request, id, schedule_time) -> JsonResponse:
    try:
        if not request.user.is_authenticated:
            return JsonResponse({
                'error': 'Unauthorized',
                'message': 'You must be logged in to access this content'
            }, status=401)

        content = Content.objects.get(id=id)

        if not content:
            return JsonResponse({
                'error': 'Content not found',
                'message': 'The requested content does not exist'
            })

        content.schedule_time = schedule_time
        content.save()

        return JsonResponse({
            'message': 'Content scheduled successfully',
            'id': content.id,
            'schedule_time': content.schedule_time
        })

    except Exception as e:
        return JsonResponse({
            'error': str(e),
            'message': 'An error occurred while scheduling content'
        }, status=500)

def handle_get_content_status(request, id) -> JsonResponse:
    try:
        if not request.user.is_authenticated:
            return JsonResponse({
                'error': 'Unauthorized',
                'message': 'You must be logged in to access this content'
            }, status=401)

        content = Content.objects.get(id=id)

        if not content:
            return JsonResponse({
                'error': 'Content not found',
                'message': 'The requested content does not exist'
            }, status=404)

        return JsonResponse({
            'status': content.draft,
            'message': 'Content status retrieved successfully'
        })

    except Exception as e:
        return JsonResponse({
            'error': str(e),
            'message': 'An error occurred while getting content status'
        })

def handle_get_analytics(request):
    pass
