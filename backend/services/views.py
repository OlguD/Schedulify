from django.http.response import JsonResponse
from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from .utils.helper import email_exists, username_exists, password_is_valid

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
