from django.contrib.auth.models import User

def email_exists(email):
    return User.objects.filter(email=email).exists()

def username_exists(username):
    return User.objects.filter(username=username).exists()

def password_is_valid(password):
    return len(password) >= 8
