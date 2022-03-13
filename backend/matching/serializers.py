from rest_framework import serializers
from django.contrib.auth import get_user_model
from rating.serializers import MentorRatingSerializer
from users.serializers import UserSerializer
from users.permissions import MENTEE_GROUP, MENTOR_GROUP

from .models import MentoringPair

class MentoringPairSerializer(serializers.ModelSerializer):
    """
    Serializer for the MentoringPair model.
    """
    mentor = UserSerializer(
        read_only = True
    )
    mentor_id = serializers.PrimaryKeyRelatedField(
        queryset=get_user_model().objects.filter(groups__name=MENTOR_GROUP),
        source='mentor')

    mentee = UserSerializer(
        read_only = True
    )
    mentee_id = serializers.PrimaryKeyRelatedField(
        queryset=get_user_model().objects.filter(groups__name=MENTEE_GROUP),
        source='mentee')
    class Meta:
        """
        Metadata for mentoring pair serializer.
        """
        model = MentoringPair
        exclude = ()

class MentorSerializer(serializers.ModelSerializer):
    """Serializer for a mentee's mentor"""
    mentor = UserSerializer(read_only=True)
    mentor_id = serializers.PrimaryKeyRelatedField(
        queryset=get_user_model().objects.filter(groups__name=MENTOR_GROUP),
        source='mentor')
    mentor_rating = MentorRatingSerializer(source='mentor.rating')

    class Meta:
        """
        Metadata for mentoring pair serializer.
        """
        model = MentoringPair
        fields = ('mentor', 'mentor_rating', 'mentor_id')