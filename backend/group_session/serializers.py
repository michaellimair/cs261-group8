import datetime
from rest_framework import serializers
from skill.utils import validate_skill
from users.serializers import UserSerializer
from event.utils import has_clashing_events
from event.serializers import EventSerializer

from .models import (
    GroupSession,
    GroupSessionRequest,
    GroupSessionRequestedSkill,
    GroupSessionType
)

class GroupSessionSerializer(serializers.ModelSerializer):
    hosts = UserSerializer(read_only=True, many=True, source="event__hosts")
    max_attendees = serializers.IntegerField(
        min_value=0
    )
    event = EventSerializer()
    type = serializers.ChoiceField(choices=GroupSessionType.choices)
    related_skills = serializers.ListField(
        child=serializers.CharField(validators=[validate_skill])
    )

    class Meta:
        """Metadata for group session serializer."""
        model = GroupSession
        fields = ('id', 'event', 'created', 'modified', 'hosts', 'max_attendees', 'related_skills', 'type')

    def validate_event(self, value):
        mentor = self.context.get("request").user
        if has_clashing_events(
            mentor,
            value['start_time'],
            value['end_time'],
            self.instance.event.id if self.instance else None
        ):
            raise serializers.ValidationError("Event time clashes with one of your other events.")
        value['hosts'] = [mentor]
        return value

    def create(self, validated_data):
        event = EventSerializer().create(validated_data['event'])
        data = validated_data.copy()
        data['event'] = event
        return super().create(data)

    def update(self, instance, validated_data):
        if validated_data.get("event"):
            event = EventSerializer().update(self.instance.event, validated_data.get("event"))
            validated_data['event'] = event
        return super().update(instance, validated_data)

class GroupSessionDetailSerializer(serializers.ModelSerializer):
    attendees = UserSerializer(read_only=True, many=True)
    
    class Meta:
        """Metadata for group session serializer including details."""
        model = GroupSession
        fields = ('id', 'title', 'description', 'created', 'modified', 'hosts', 'max_attendees', 'related_skills', 'attendees')

class GroupSessionRequestedSkillSerializer(serializers.ModelSerializer):
    class Meta:
        """Metadata for requested skill of a group session"""
        model = GroupSessionRequestedSkill
        fields = ('skill', )

class GroupSessionRequestSerializer(serializers.ModelSerializer):
    requested_skills = GroupSessionRequestedSkillSerializer(many=True)

    class Meta:
        """Metadata for group session request."""
        model = GroupSessionRequest
        fields = ('id', 'requested_skills')

    def validate(self, attrs):
        user = self.context.get("request").user

        if GroupSessionRequest.objects.filter(created__date=datetime.datetime.utcnow(), user=user):
            raise serializers.ValidationError({
                "non_field_errors": "A user may only raise a group session request once per day."
            })

        attrs['user'] = user
        return super().validate(attrs)

    def create(self, validated_data):
        session_request = GroupSessionRequest.objects.create(
            user=validated_data['user']
        )
        requested_skills_obj = []
        for requested_skill in validated_data['requested_skills']:
            requested_skills_obj.append(
                GroupSessionRequestedSkill(
                    skill=requested_skill['skill'],
                    request=session_request,
                )
            )
        GroupSessionRequestedSkill.objects.bulk_create(requested_skills_obj)
        return session_request

class GroupSessionSuggestionSerializer(serializers.Serializer):
    skill = serializers.CharField(validators=[validate_skill], read_only=True)
    count = serializers.IntegerField(read_only=True)

    class Meta:
        fields = ('skill', 'count')
