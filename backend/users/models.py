"""
Models for users application
"""
from django.db import models
from django.contrib.auth.models import User

class ApplicationUser(models.Model):
    """
    Application user model
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=250, blank=True)
    profile_picture = models.FileField(blank=True)