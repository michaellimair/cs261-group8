from typing import Dict
from django.contrib.auth import login, get_user_model
from django.contrib.auth.models import Group
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView

from business_area.models import BusinessArea

from .models import UserProfile
from .serializers import UserSerializer, RegisterSerializer, GroupSerializer, UserProfileSerializer

# Create your views here.

class UserProfileViewSet(viewsets.ViewSet):
    """View sets for user profile update

    Args:
        viewsets (_type_): Viewsets
    """

    def get_queryset(self):
        """
        Limit queryset to feedback created by a specific user.
        """
        user = self.request.user
        return UserProfile.objects.filter(user=user)

    def retrieve(self, _, user_pk=None):
        """Retrieves the profile of a certain user

        Args:
            user_pk (int): Primary key of the user
        """
        profile = get_object_or_404(self.get_queryset(), user=user_pk)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def update(self, request, user_pk=None):
        """Updates the profile of a user

        Args:
            user_pk (int): Primary key of the user
        """
        profile = get_object_or_404(self.get_queryset(), user=user_pk)

        data: Dict = request.data.copy()

        if 'business_area' in request.data:
            data['business_area'] = get_object_or_404(BusinessArea, id=data['business_area'])

        serializer = UserProfileSerializer(profile, data=data, partial=True)
        serializer.is_valid(True)

        serializer.save()

        return Response(serializer.data)


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
