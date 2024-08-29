"""
Models for posts application
"""
from django.db import models
from users.models import ApplicationUser

class Post(models.Model):
    """
    Model for a post
    """
    author = models.ForeignKey(ApplicationUser, on_delete=models.DO_NOTHING)
    title = models.CharField(max_length=150, blank=False, null=False)
    content = models.TextField(max_length=1500, blank=False, null=False)
    publication_date = models.DateTimeField(blank=False, null=False)
    last_updated_at = models.DateTimeField(auto_now=True)