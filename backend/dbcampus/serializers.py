from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.password_validation import validate_password
from .models import UserProfile, BusinessArea

class BusinessAreaSerializer(serializers.ModelSerializer):
  class Meta:
    model = BusinessArea
    fields = ('id', 'name', 'label')

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserProfile
    fields = ('pronoun', 'title', 'completed')

class UserSerializer(serializers.ModelSerializer):
  profile = UserProfileSerializer(
    read_only=True
  )

  class Meta:
    model = User
    exclude=['password', 'is_superuser']

class RegisterSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(
    required=True,
    validators=[UniqueValidator(queryset=User.objects.all())]
  )
  password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
  verify_password = serializers.CharField(write_only=True, required=True)

  class Meta:
    model = User
    fields = ('username', 'password', 'verify_password', 'email', 'first_name', 'last_name')
    extra_kwargs = {
      'first_name': { 'required': True },
      'last_name': { 'required': True }
    }

  def validate(self, attrs):
    if (attrs['password'] != attrs['verify_password']):
      raise serializers.ValidationError({ 'password': 'Passwords do not match.' })

    try:
      User.objects.get(username = attrs['username'].lower()).exists()
      raise serializers.ValidationError({ 'username': 'Username has already been taken.' })
    except ObjectDoesNotExist:
      pass

    attrs['username'] = attrs['username'].lower()
    
    return attrs

  def create(self, data):
    user = User.objects.create(
      username = data['username'],
      email = data['email'],
      first_name = data['first_name'],
      last_name = data['last_name']
    )

    user.set_password(data['password'])
    user.save()

    return user
