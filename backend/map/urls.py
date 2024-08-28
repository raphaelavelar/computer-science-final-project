"""
URLs for map application
"""

from django.urls import path
from map.api import MapItemAll, MapItemDetail

urlpatterns = [
    path("", MapItemAll.as_view(), name="map_all"),
    path("<int:pk>", MapItemDetail.as_view(), name="map_detail"),
]