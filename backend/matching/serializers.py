from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from matching.models import MentoringPair
from users.serializers import UserSerializer

class MentoringPairSerializer(serializers.ModelSerializer):
    """
    Serializer for the MentoringPair model.
    """
    mentor = UserSerializer(
        read_only = True
    )
    mentor_id = serializers.PrimaryKeyRelatedField(
        queryset=get_user_model().objects.all(),
        source='mentor')

    mentee = UserSerializer(
        read_only = True
    )
    mentee_id = serializers.PrimaryKeyRelatedField(
        queryset=get_user_model().objects.all(),
        source='mentor')
    class Meta:
        """
        Metadata for mentoring pair serializer.
        """
        model = MentoringPair
        exclude = ()
        
    def create(self, validated_data):
        request = self.context.get("request")
        return super().create(validated_data)
    