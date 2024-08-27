from rest_framework.generics import CreateAPIView
from rest_framework import status
from rest_framework.response import Response
from users.serializers import ApplicationUserAuthenticationSerializer, UserAuthenticationSerializer

class ApplicationUserRegister(CreateAPIView):
    """
    Register a new application user
    """
    serializer_class = UserAuthenticationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        application_user_serializer = ApplicationUserAuthenticationSerializer(data={"user": serializer.validated_data})
        application_user_serializer.is_valid(raise_exception=True)
        application_user_serializer.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
