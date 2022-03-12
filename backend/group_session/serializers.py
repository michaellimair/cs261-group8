from rest_framework import serializers

from backend.users.serializers import UserSerializer
from .models import GroupSession, GroupSessionRequest

class GroupSessionSerializer(serializers.ModelSerializer):
    class Meta:
        """Metadata for group session serializer."""
        model = GroupSession
        fields = ('id', 'title', 'description', 'created', 'modified', 'hosts', 'max_attendees', 'related_skills')

class GroupSessionDetailSerializer(serializers.ModelSerializer):
    attendees = UserSerializer(read_only=True, many=True)
    
    class Meta:
        """Metadata for group session serializer including details."""
        model = GroupSession
        fields = ('id', 'title', 'description', 'created', 'modified', 'hosts', 'max_attendees', 'related_skills', 'attendees')

class GroupSessionRequestSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        """Metadata for group session request."""
        model = GroupSessionRequest
        fields = ('id', 'user', 'skills', 'type')
