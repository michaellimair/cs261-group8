from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserProfile
    fields = ('id', 'pronoun', 'title')

class UserSerializer(serializers.ModelSerializer):
  profile = serializers.SlugRelatedField(
    slug_field='id'
  )

  class Meta:
    model = User
    fields = ('id', 'first_name', 'last_name', 'username', 'email', 'groups', 'profile')
