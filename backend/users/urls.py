"""
URLs for users application
"""

from django.urls import path
from users.api import ApplicationUserRegister

urlpatterns = [
    path("", ApplicationUserRegister.as_view(), name="user_register"),
]