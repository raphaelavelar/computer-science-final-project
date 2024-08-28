"""
API for users application
"""
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import logout
from users.serializers import ApplicationUserAuthenticationSerializer, UserAuthenticationSerializer, ApplicationUserSerializer
from users.models import ApplicationUser

class ApplicationUserRegister(CreateAPIView, ListAPIView):
    """
    Register and lists application users
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

class ApplicationUserDetail(RetrieveUpdateDestroyAPIView):
    """
    Retrive, update and destroy application users
    """
    queryset = ApplicationUser.objects.all()
    serializer_class = ApplicationUserSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class ApplicationUserLogout(APIView):
    """
    Logout an application user
    """

    def post(self, request, *args, **kwargs):
        logout(request)

        return Response(status=status.HTTP_200_OK)