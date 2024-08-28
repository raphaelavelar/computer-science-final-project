"""
URLs for users application
"""

from django.urls import path
from users.api import ApplicationUserRegister, ApplicationUserDetail

urlpatterns = [
    path("", ApplicationUserRegister.as_view(), name="user_register"),
    path("<int:pk>", ApplicationUserDetail.as_view(), name="user_detail"),
]