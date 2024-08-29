"""
URLs for posts application
"""

from django.urls import path
from posts.api import PostAll, PostDetail

urlpatterns = [
    path("", PostAll.as_view(), name="map_all"),
    path("<int:pk>", PostDetail.as_view(), name="map_detail"),
]