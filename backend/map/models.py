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
    category = models.CharField(
        max_length=16,
        choices=(
            ("danger", "danger"),
            ("food bank", "food bank"),
            ("medical services", "medical services"),
            ("people", "people"),
            ("person", "person"),
            ("pet shelter", "pet shelter"),
            ("search", "search"),
            ("shelter", "shelter"),
            ("warning", "warning"),
            ("water", "water"),
        )
    )
    latitude = models.FloatField()
    longitude = models.FloatField()