from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.password_validation import validate_password
from django.utils.translation import gettext_lazy as _
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserProfile model.
    """
    class Meta:
        """
        Metadata for the UserProfile serializer.
        """
        model = UserProfile
        exclude = ('id', 'user')


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    """
    profile = UserProfileSerializer(
        read_only=True
    )

    class Meta:
        """
        Metadata for the User serializer.
        """
        model = get_user_model()
        exclude = [
            'password',
            'is_superuser',
            'user_permissions',
            'is_staff',
            'is_active']


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer used to handle registration.
    """
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=get_user_model().objects.all(),
                message=_("email_taken"),
                lookup='iexact')]
    )
    username = serializers.CharField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=get_user_model().objects.all(),
                message=_("username_taken"),
                lookup='iexact')],
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password])
    verify_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        """
        Metadata for the registration serializer, contains field validation configuration.
        """
        model = get_user_model()
        fields = (
            'username',
            'password',
            'verify_password',
            'email',
            'first_name',
            'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['verify_password']:
            raise serializers.ValidationError(
                {'verify_password': _('password_not_match')})

        attrs['email'] = attrs['email'].lower()
        attrs['username'] = attrs['username'].lower()

        return attrs

    def create(self, validated_data):
        user = get_user_model().objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class GroupSerializer(serializers.ModelSerializer):
    """
    Serializer for Group objects which indicate different user groups.
    """
    class Meta:
        """
        Metadata for serializing user groups.
        """
        model = Group
        fields = ('id', 'name')
