from django.urls import path
from . import views

urlpatterns = [
    path('auth/login/', views.user_login, name='user_login'),
    path('auth/register/', views.user_register, name='user_register'),
    path('auth/logout/', views.user_logout, name='user_logout'),

    path('social-accounts/', views.social_accounts, name='social_accounts'),
    path('social-account/<int:id>', views.handle_get_social_account, name='handle_get_social_account'),
    path('social-account/update/<int:id>', views.handle_update_social_account, name='handle_update_social_account'),
    path('social-account/delete/<int:id>', views.handle_delete_social_account, name='handle_delete_social_account'),

    path('contents/', views.handle_get_content, name='handle_get_content'),
    path('contents/<int:id>', views.get_content_detail, name='get_content_detail'),
    path('content/create/', views.handle_create_content, name='handle_create_content'),
    path('content/update/<int:id>/', views.handle_update_content, name='handle_update_content'),
    path('content/delete/<int:id>/', views.handle_delete_content, name='handle_delete_content'),
    path('content/<int:id>/schedule/', views.handle_schedule_content, name='handle_schedule_content'),
    path('content/<int:id>/status/', views.handle_get_content_status, name='handle_content_status'),
]
