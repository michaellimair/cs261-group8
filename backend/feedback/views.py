from django.http import Http404, HttpResponse, HttpResponseBadRequest, HttpResponseForbidden
from django.shortcuts import render
from django.core.exceptions import PermissionDenied
from django.http.response import HttpResponseNotAllowed
from .permissions import IsOwner, IsNotSuperuser
from .models import UserFeedback, UserFeedbackReply
from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
import json
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import UserFeedbackSerializer, UserFeedbackAdminSerializer, UserFeedbackReplyAdminSerializer
from django.shortcuts import get_object_or_404
from rest_framework import generics

class UserFeedbackViewSet(viewsets.ModelViewSet):
  serializer_class = UserFeedbackSerializer
  permission_classes = [IsNotSuperuser, IsOwner]

  def destroy(self, pk):
    return HttpResponseForbidden()

  def get_queryset(self):
    user = self.request.user
    return UserFeedback.objects.filter(user=user)

class UserFeedbackAdminViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = UserFeedbackAdminSerializer
  permission_classes = [IsAdminUser]
  queryset = UserFeedback.objects.all()

class UserFeedbackAdminReplyView(APIView):
  serializer_class = UserFeedbackReplyAdminSerializer
  permission_classes = [IsAdminUser]

  def post(self, request, feedback_pk):
    """
    Creates a reply to a feedback given to a normal user.
    """
    feedback = get_object_or_404(UserFeedback, pk=feedback_pk)
    serializer = UserFeedbackReplyAdminSerializer(data=self.request.data, context={
      "request": request,
      "feedback": feedback
    })
    if not serializer.is_valid():
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    reply = UserFeedbackReply.objects.filter(feedback=feedback_pk).exists()
    if reply:
      return HttpResponseBadRequest(json.dumps({
        "non_field_errors": ["Not allowed to reply more than once"]
      }), content_type='application/json')
    serializer.create(request.data)
    return Response(serializer.data)

  def patch(self, request, feedback_pk):
    """
    Updates a feedback given by an administrator.
    """
    feedback = get_object_or_404(UserFeedback, pk=feedback_pk)
    reply = get_object_or_404(UserFeedbackReply, feedback=feedback_pk)

    serializer = UserFeedbackReplyAdminSerializer(reply, data=self.request.data, context={
      "request": request,
      "feedback": feedback
    }, partial=True)

    if not serializer.is_valid():
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    serializer.update(reply, request.data)

    return Response(serializer.data)

  def delete(self, request, feedback_pk):
    reply = get_object_or_404(UserFeedbackReply, feedback=feedback_pk)
    reply.delete()
    return HttpResponse(status=204)