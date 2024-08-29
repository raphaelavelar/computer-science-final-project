"""
Serializers for users application
"""
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
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
    Application user authentication serializer
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

class UserSerializer(serializers.ModelSerializer):
    """
    User serializer
    """

    class Meta:
        """
        Model and fields specification
        """
        model = User
        fields = ("username", "first_name", "last_name", "email")

class ApplicationUserSerializer(UserSerializer):
    """
    Application user serializer
    """
    username = UserSerializer().get_fields()["username"]
    first_name = UserSerializer().get_fields()["first_name"]
    last_name = UserSerializer().get_fields()["last_name"]
    email = UserSerializer().get_fields()["email"]

    class Meta:
        """
        Model and fields specification
        """
        model = ApplicationUser
        fields = ("username", "first_name", "last_name", "email", "bio", "profile_picture")

    def to_representation(self, instance):
        return {
            "username": instance.user.username,
            "first_name": instance.user.first_name,
            "last_name": instance.user.last_name,
            "email": instance.user.email,
            "bio": instance.bio,
            "profile_picture": instance.profile_picture if instance.profile_picture else None,
        }