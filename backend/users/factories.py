import factory
from .models import User
from django.contrib.auth.models import Group
import random
import string


def _generate_username() -> str:
    """
      Generates a randomized username with a length of 10
    """
    len = 10
    return ''.join(random.choices(
        string.ascii_uppercase + string.digits, k=len))


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.LazyAttribute(lambda _: _generate_username())
    password = factory.PostGenerationMethodCall('set_password', 'testpass124')
    email = factory.LazyAttribute(lambda o: f"{o.username}@test.com")
    last_name = 'User'
    is_superuser = False
    is_staff = False


class AdminFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.LazyAttribute(lambda _: _generate_username())
    email = factory.LazyAttribute(lambda o: f"{o.username}@test.com")
    password = factory.PostGenerationMethodCall(
        'set_password', 'testsuperadmin124')
    first_name = 'Test'
    last_name = 'Superadmin'
    is_staff = True
    is_superuser = True


class GroupFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Group
