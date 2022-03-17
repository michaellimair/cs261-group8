from rest_framework import serializers

from users.serializers import UserSerializer
from .models import Event

class EventProtectedSerializer(serializers.ModelSerializer):
    class Meta:
        """Metadata for masked events, protect the details of events being attended by a user."""
        model = Event
        fields = ('id', 'start_time', 'end_time')

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        """Metadata for events."""
        model = Event
        fields = ('id', 'title', 'description', 'start_time', 'end_time', 'location')

class EventDetailSerializer(EventSerializer):
    hosts = UserSerializer(read_only=True, many=True)
    attendees = UserSerializer(read_only=True, many=True)

    class Meta(EventSerializer.Meta):
        """Metadata for group session request."""
        model = Event
        fields = EventSerializer.Meta.fields + ('hosts', 'attendees', )
