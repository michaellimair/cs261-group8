import random
import string
import factory
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from business_area.factories import BusinessAreaFactory

from .models import UserProfile


def _generate_username() -> str:
    """
      Generates a randomized username with a length of 10
    """
    username_length = 10
    return ''.join(random.choices(
        string.ascii_uppercase + string.digits, k=username_length))

class UserProfileFactory(factory.django.DjangoModelFactory):
    """Factory class to create UserProfile for testing."""
    class Meta:
        """Metadata of UserProfile factory."""
        model = UserProfile

    title = UserProfile.Title.ASSOCIATE
    completed = True
    years_experience = 10
    business_area = factory.SubFactory(BusinessAreaFactory)
    pronoun = "he"


class UserFactory(factory.django.DjangoModelFactory):
    """
    Factory class to create User classes for testing.
    """
    class Meta:
        """
        Metadata indicating that the factory class uses the User model.
        """
        model = get_user_model()

    username = factory.LazyAttribute(lambda _: _generate_username())
    password = factory.PostGenerationMethodCall('set_password', 'testpass124')
    email = factory.LazyAttribute(lambda o: f"{o.username}@test.com")
    last_name = 'User'
    is_superuser = False
    is_staff = False


class AdminFactory(UserFactory):
    """
    Factory class to create user objects which are administrators
    """
    is_staff = True
    is_superuser = True


class GroupFactory(factory.django.DjangoModelFactory):
    """
    Factory class to create Group classes for testing.
    """
    class Meta:
        """
        Metadata indicating that the factory class uses the Group model.
        """
        model = Group
