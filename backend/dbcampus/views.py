from django.contrib.auth import login
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from ***REMOVED***.permissions import IsOwner
from django.contrib.auth.models import User
from .serializers import UserSerializer, RegisterSerializer
from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authentication import BasicAuthentication

# Create your views here.

class MyDataView(APIView):
  @permission_classes([IsAuthenticated, IsOwner])
  def get(self, request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class RegisterView(generics.CreateAPIView):
  queryset = User.objects.all()
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer

class LoginView(KnoxLoginView):
  permission_classes = (permissions.AllowAny,)

  def post(self, request, format=None):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    login(request, user)
    return super(LoginView, self).post(request, format=None)
