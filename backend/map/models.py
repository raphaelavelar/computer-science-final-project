"""
Models for map application
"""
from django.db import models

class MapItem(models.Model):
    """
    Model for a map item
    """
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=500)
    latitude = models.FloatField()
    longitude = models.FloatField()