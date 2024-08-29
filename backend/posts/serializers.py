"""
Serializers for posts application
"""
from rest_framework import serializers
from posts.models import Post

class PostSerializer(serializers.ModelSerializer):
    """
    Post item serializer
    """

    class Meta:
        """
        Model and fields specification
        """
        model = Post
        fields = "__all__"