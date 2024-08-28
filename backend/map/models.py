"""
Models for map application
"""
from django.db import models

class MapItem(models.Model):
    """
    Model for a map item
    """
    name = models.CharField(max_length=250)
    description = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()