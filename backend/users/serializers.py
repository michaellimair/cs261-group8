from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.password_validation import validate_password
from django.utils.translation import gettext_lazy as _
from business_area.models import BusinessArea
from business_area.serializers import BusinessAreaSerializer
from .models import UserProfile

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

class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for UserProfile objects."""
    business_area = BusinessAreaSerializer()
    business_area_id = serializers.PrimaryKeyRelatedField(
        queryset=BusinessArea.objects.all(),
        source='business_area')

    class Meta:
        """
        Metadata for the UserProfile serializer.
        """
        model = UserProfile
        exclude = ('id', 'user')
        read_only_fields = ('completed',)


    def update(self, instance, validated_data):
        """Update user profile"""
        super().update(instance, validated_data)

        # Automatically populate completed field if all data is updated properly
        is_complete: bool = (instance.pronoun
            and instance.years_experience
            and instance.title
            and instance.skills
            and len(instance.skills) > 0
            and instance.country
            and instance.timezone
            and instance.business_area)

        # TODO: Refactor if statement
        if is_complete:
            instance.completed = True

        instance.save()

        return instance


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    """
    profile = UserProfileSerializer(
        read_only=True
    )
    groups = GroupSerializer(many=True)
    full_name = serializers.SerializerMethodField('get_full_name')

    # pylint: disable=no-self-use
    def get_full_name(self, obj: get_user_model()) -> str:
        """_summary_

        Args:
            obj (User): User object

        Returns:
            str: Full name of the user
        """
        return obj.get_full_name()

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
