from django.db.models import Q
from rest_framework import viewsets
from .models import Event
from .serializers import EventDetailSerializer

class EventViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = EventDetailSerializer
    def get_queryset(self):
        user = self.request.user
        return Event.objects.filter(
            Q(hosts__id__contains=user.id) |
            Q(attendees__id__contains=user.id)
        )
