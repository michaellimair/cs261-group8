import json
from django.http import HttpResponse, HttpResponseBadRequest
from django.utils.translation import gettext_lazy as _
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import viewsets, status, mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from users.permissions import IsOwner, IsNotSuperuser
from .models import UserFeedback, UserFeedbackReply
from .serializers import (UserFeedbackSerializer,
                            UserFeedbackAdminSerializer,
                            UserFeedbackReplyAdminSerializer)


class UserFeedbackViewSet(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    """
    Create, read, and update views for user feedback. Only accessible by users.
    """
    serializer_class = UserFeedbackSerializer
    permission_classes = [IsNotSuperuser, IsOwner]

    def get_queryset(self):
        """
        Limit queryset to feedback created by a specific user.
        """
        user = self.request.user
        return UserFeedback.objects.filter(user=user).order_by('-modified')


class UserFeedbackAdminViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only view set which allows admins to read user feedback.
    """
    serializer_class = UserFeedbackAdminSerializer
    permission_classes = [IsAdminUser]
    queryset = UserFeedback.objects.all()


class UserFeedbackAdminReplyView(APIView):
    """
    Custom API view to allow administrators to reply to feedback,
    update their replies, and delete their reply.
    """
    serializer_class = UserFeedbackReplyAdminSerializer
    permission_classes = [IsAdminUser]

    def post(self, request, feedback_pk):
        """
        Creates a reply to a feedback given by a user of the platform (non-admin).
        """
        feedback = get_object_or_404(UserFeedback, pk=feedback_pk)
        serializer = UserFeedbackReplyAdminSerializer(data=self.request.data, context={
            "request": request,
            "feedback": feedback
        })
        serializer.is_valid(raise_exception=True)
        reply = UserFeedbackReply.objects.filter(feedback=feedback_pk).exists()
        if reply:
            error = json.dumps({
                "non_field_errors": [str(_("reply_once_only"))]
            })
            return HttpResponseBadRequest(
                content=error, content_type='application/json')
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
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

        serializer.update(reply, request.data)

        return Response(serializer.data)

    def delete(self, _, feedback_pk):
        """
        Delete administrator reply if a current reply exists.
        """
        reply = get_object_or_404(UserFeedbackReply, feedback=feedback_pk)
        reply.delete()
        return HttpResponse(status=204)
