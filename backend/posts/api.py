"""
API for posts application
"""
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from posts.models import Post
from posts.serializers import PostListSerializer, PostCreateSerializer, PostDetailSerializer

class PostAll(ListCreateAPIView):
    """
    Create and list post
    """
    queryset = Post.objects.all()
    serializer_class = PostCreateSerializer

    def get(self, request, *args, **kwargs):
        self.serializer_class = PostListSerializer

        return self.list(request, *args, **kwargs)

class PostDetail(RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update and destroy a post
    """
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
