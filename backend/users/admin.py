"""
Admin models
"""
from django.contrib import admin
from .models import ApplicationUser

class ApplicationUserAdmin(admin.ModelAdmin):
    """
    Application user admin model
    """
    list_display = ("user", "bio", "profile_picture")

admin.site.register(ApplicationUser, ApplicationUserAdmin)