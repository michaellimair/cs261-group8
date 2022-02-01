from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from dbcampus.permissions import IsOwner
from .serializers import UserSerializer
from .models import UserProfile

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsOwner])
class UserView(viewsets.ModelViewSet):
  def get(self, request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
