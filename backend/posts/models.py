"""
Models for posts application
"""
from django.db import models
from users.models import ApplicationUser

class Post(models.Model):
    """
    Model for a post
    """
    author = models.OneToOneField(ApplicationUser, on_delete=models.DO_NOTHING)
    publication_date = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=150, blank=False, null=False)
    content = models.TextField(max_length=1500, blank=False, null=False)