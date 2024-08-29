"""
Serializers for posts application
"""
from rest_framework import serializers
from django.utils import timezone
from users.serializers import ApplicationUserSerializer
from posts.models import Post

class PostListSerializer(serializers.ModelSerializer):
    """
    Post list serializer
    """
    author = ApplicationUserSerializer(read_only=True)

    class Meta:
        """
        Model and fields specification
        """
        model = Post
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        del representation["author"]["bio"]
        del representation["author"]["profile_picture"]

        return representation

class PostCreateSerializer(serializers.ModelSerializer):
    """
    Post create serializer
    """

    class Meta:
        """
        Model and fields specification
        """
        model = Post
        fields = "__all__"
        read_only_fields = ("publication_date", )

    def create(self, validated_data):
        validated_data["publication_date"] = timezone.now()
        return super().create(validated_data)


class PostDetailSerializer(serializers.ModelSerializer):
    """
    Post detail serializer
    """

    class Meta:
        """
        Model and fields specification
        """
        model = Post
        fields = ("pk", "title", "content", "last_updated_at")