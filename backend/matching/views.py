from django.shortcuts import get_object_or_404
from django.http import HttpResponse, HttpResponseBadRequest

from users.permission_constants import MENTOR_GROUP
from .models import MentoringPair
from .serializers import MentoringPairSerializer
from django.contrib.auth import get_user_model
from rest_framework import mixins, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from users.permissions import IsMentor
from users.permissions import IsMentee
from django.utils.translation import gettext_lazy as _
import json

# Create your views here.
class MenteeMatchView(mixins.ListModelMixin, mixins.CreateModelMixin,viewsets.GenericViewSet):
    permission_classes = [IsMentee]
    serializer_class = MentoringPairSerializer

    def get_queryset(self):
        return MentoringPair.objects.filter(mentee=self.request.user)
    
    def create(self, request):
        """Initiates a match request to a mentor"""
        # If mentee already has a pending match, disallow
        if self.get_queryset().exclude(status=MentoringPair.PairStatus.REJECTED).exists():
            error = json.dumps({
                "non_field_errors": [str(_("You already have a pending match."))]
            })
            return HttpResponseBadRequest(
                content=error, content_type='application/json')

        serializer = MentoringPairSerializer(data={
            "mentor_id": request.data.get('mentor_id'),
            "mentee_id": request.user.id
        })
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class MentorMatchView(mixins.ListModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsMentor]
    serializer_class = MentoringPairSerializer

    def get_queryset(self):
        return MentoringPair.objects.filter(mentor=self.request.user)
    
    def partial_update(self, request, pk=None):
        """Update the status of a match (accept or reject)"""
        mentoring_pair = get_object_or_404(self.get_queryset(), id=pk)

        if mentoring_pair.status != MentoringPair.PairStatus.PENDING:
            error = json.dumps({
                "non_field_errors": [str(_("You are only allowed to update the status of a pending match."))]
            })
            return HttpResponseBadRequest(
                content=error, content_type='application/json')

        serializer = MentoringPairSerializer(mentoring_pair, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(update_fields=["status"])

        return Response(serializer.data)
