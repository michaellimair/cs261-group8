from django.db.models import Q
from rest_framework import viewsets
from rest_framework.response import Response
from users.permissions import IsMentee
from matching.permissions import IsMenteePaired
from .models import Meeting
from .serializers import MeetingSerializer

from event.utils import has_clashing_events

class MeetingMenteeViewSet(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    permission_classes = [IsMentee, IsMenteePaired]

    def get_queryset(self):
        user = self.request.user
        return Meeting.objects.filter(Q(mentoring_pair__mentee=user) | Q(mentoring_pair__mentor=user))
