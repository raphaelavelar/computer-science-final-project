"""
API for posts application
"""
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from posts.models import Post
from posts.serializers import PostSerializer

class PostAll(ListCreateAPIView):
    """
    Create and list post
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetail(RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update and destroy a post
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
