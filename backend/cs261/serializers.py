from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import UserProfile, BusinessArea
from django.utils.translation import gettext_lazy as _

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
    exclude=['password', 'is_superuser', 'user_permissions']

class RegisterSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(
    required=True,
    validators=[UniqueValidator(queryset=User.objects.all(), message=_("email_taken"), lookup='iexact')]
  )
  username = serializers.CharField(
    required=True,
    validators=[UniqueValidator(queryset=User.objects.all(), message=_("username_taken"), lookup='iexact')],
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
      raise serializers.ValidationError({ 'verify_password': _('password_not_match') })

    attrs['email'] = attrs['email'].lower()
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
