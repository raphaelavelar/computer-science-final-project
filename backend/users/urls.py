"""
URLs for users application
"""

from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from users.api import ApplicationUserRegister, ApplicationUserDetail

urlpatterns = [
    path("", ApplicationUserRegister.as_view(), name="user_register"),
    path("<int:pk>", ApplicationUserDetail.as_view(), name="user_detail"),
    path("login/", obtain_auth_token, name="user_login"),
]