"""
API for users application
"""
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework import status
from rest_framework.response import Response
from users.serializers import ApplicationUserAuthenticationSerializer, UserAuthenticationSerializer, ApplicationUserSerializer
from users.models import ApplicationUser

class ApplicationUserRegister(CreateAPIView, ListAPIView):
    """
    Register a new application user
    """
    queryset = ApplicationUser.objects.all()
    serializer_class = UserAuthenticationSerializer

    def get(self, request, *args, **kwargs):
        self.serializer_class = ApplicationUserSerializer

        return super().list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        application_user_serializer = ApplicationUserAuthenticationSerializer(data={"user": serializer.validated_data})
        application_user_serializer.is_valid(raise_exception=True)
        application_user_serializer.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

