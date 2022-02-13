from rest_framework import serializers
from .models import BusinessArea

class BusinessAreaSerializer(serializers.ModelSerializer):
  class Meta:
    model = BusinessArea
    fields = ('id', 'name', 'label')
