from django.shortcuts import render
from django.core.exceptions import PermissionDenied
from .permissions import IsOwner
from .models import UserFeedback
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import UserFeedbackSerializer
from django.shortcuts import get_object_or_404
from rest_framework import generics

class UserFeedbackViewSet(viewsets.ModelViewSet):
  serializer_class = UserFeedbackSerializer
  permission_classes = [IsOwner]

  def destroy(self):
    raise PermissionDenied()

  def get_queryset(self):
    user = self.request.user
    return UserFeedback.objects.filter(user=user)

class UserFeedbackAdminViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = UserFeedbackSerializer
  permission_classes = [IsAdminUser]
  queryset = UserFeedback.objects.all()