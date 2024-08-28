"""
Serializers for map application
"""
from rest_framework import serializers
from map.models import MapItem

class MapItemSerializer(serializers.ModelSerializer):
    """
    Map item serializer
    """

    class Meta:
        """
        Model and fields specification
        """
        model = MapItem
        fields = "__all__"