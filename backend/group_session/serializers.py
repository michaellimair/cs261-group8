import datetime
from rest_framework import serializers
from skill.utils import validate_skill
from users.serializers import UserSerializer
from django.db import transaction

from .models import GroupSession, GroupSessionRequest, GroupSessionRequestedSkill

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
        requested_skills = GroupSessionRequestedSkill.objects.bulk_create(requested_skills_obj)
        return session_request

    # def create(self, validated_data):
    #     with transaction.atomic():
    #         session_request = super().create({
    #             "user": validated_data['user']    
    #         })
    #         skill_objs = []
    #         for skill in validated_data['skills']:
    #             skill_objs.append(
    #                 GroupSessionRequestedSkill(
    #                     request=session_request,
    #                     skill=skill
    #                 )
    #             )
    #         GroupSessionRequestedSkill.objects.bulk_create(skill_objs)
    #         return session_request

class GroupSessionSuggestionSerializer(serializers.Serializer):
    skill = serializers.CharField(validators=[validate_skill], read_only=True)
    count = serializers.IntegerField(read_only=True)

    class Meta:
        fields = ('skill', 'count')
