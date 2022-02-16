from django.contrib.auth import login, get_user_model
from django.contrib.auth.models import Group
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from .serializers import UserSerializer, RegisterSerializer, GroupSerializer

# Create your views here.


class MyDataView(APIView):
    """
    View class for displaying the data of the current logged in user.
    """
    def get(self, request):
        """
        Serializes the user data for the logged in user and returns it.
        """
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class GroupView(generics.ListAPIView):
    """
    View class for listing all the available groups in the system.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class RegisterView(generics.CreateAPIView):
    """
    View class for handling user registration.
    """
    queryset = get_user_model().objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class LoginView(KnoxLoginView):
    """
    View class to handle user logins. Public endpoint which does not require authentication.
    """
    permission_classes = (permissions.AllowAny,)

    # pylint: disable=redefined-builtin
    def post(self, request, format=None):
        """
        Check authentication token, log user in, and return the necessary data.
        """
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super().post(request, format=format)
