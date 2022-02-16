from rest_framework import serializers
from .models import BusinessArea


class BusinessAreaSerializer(serializers.ModelSerializer):
    """
    Serializer for the business area model.
    """
    class Meta:
        """
        Metadata for the business area serializer.
        """
        model = BusinessArea
        fields = ('id', 'name', 'label')
