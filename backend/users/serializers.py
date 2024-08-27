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
        user_data = validated_data["user"]
        user = User.objects.create(username=user_data["username"], email=user_data["email"], password=user_data["password"])
        application_user = ApplicationUser.objects.create(user=user)
        application_user.save()

        return application_user