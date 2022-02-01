from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from dbcampus.permissions import IsOwner
from django.contrib.auth.models import User
from .serializers import UserSerializer, RegisterSerializer
from .models import UserProfile

# Create your views here.

class UserView(APIView):
  @permission_classes([IsAuthenticated, IsOwner])
  def get(self, request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class RegisterView(generics.CreateAPIView):
  queryset = User.objects.all()
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer
