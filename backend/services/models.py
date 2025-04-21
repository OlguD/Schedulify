from test.support import stat
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class SocialAccounts(models.Model):
    PLATFORM_CHOICES = [
       ('instagram', 'Instagram'),
       ('facebook', 'Facebook'),
       ('twitter', 'Twitter'),
       ('linkedin', 'LinkedIn'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    platform = models.CharField(max_length=50, choices=PLATFORM_CHOICES)
    access_token = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.platform}"


class Content(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('scheduled', 'Scheduled'),
        ('published', 'Published'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(upload_to='content_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    draft = models.BooleanField(default=True)
    scheduled_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    social_accounts = models.ManyToManyField(SocialAccounts)

    def __str__(self):
        return f"{self.user} - {self.title}"
