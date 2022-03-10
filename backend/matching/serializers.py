from rest_framework import serializers
from rest_framework.validators import UniqueValidator
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
    mentee = UserSerializer(
        read_only = True
    )
    class Meta:
        """
        Metadata for mentoring pair serializer.
        """
        model = MentoringPair
        fields = (
            'menteeID',
            'mentorID'
        )
        
    def create(self, validated_data):
        request = self.context.get("request")
        return super().create(validated_data)
    