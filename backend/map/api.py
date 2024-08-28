"""
API for map application
"""
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from map.models import MapItem
from map.serializers import MapItemSerializer

class MapItemAll(ListCreateAPIView):
    """
    Create and list map items
    """
    queryset = MapItem.objects.all()
    serializer_class = MapItemSerializer

class MapItemDetail(RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update and destroy a map item
    """
    queryset = MapItem.objects.all()
    serializer_class = MapItemSerializer
