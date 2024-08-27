"""
Serializers for users application
"""
from rest_framework import serializers
from django.contrib.auth.models import User
from users.models import ApplicationUser

class UserAuthenticationSerializer(serializers.ModelSerializer):
    """
    User authentication serializer
    """

    class Meta:
        """
        Model and fields specification
        """
        model = User
        fields = ("username", "email", "password")

class ApplicationUserAuthenticationSerializer(serializers.ModelSerializer):
    """
    Application user serializer
    """
    user = UserAuthenticationSerializer()

    class Meta:
        """
        Model and fields specification
        """
        model = ApplicationUser
        fields = ("user", )

    def create(self, validated_data):
        user = User.objects.get(username=validated_data["username"])
        application_user = ApplicationUser.objects.create()
        application_user.user = user

        application_user.save()

        return application_user