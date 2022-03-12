from django.test import TestCase
from django.contrib.auth import get_user_model

from business_area.factories import BusinessAreaFactory
from .serializers import RegisterSerializer, UserProfileSerializer, UserSerializer
from .factories import UserFactory, UserProfileFactory

class TestUserProfileSerializer(TestCase):
    """Test methods for the UserSerializer serializer class."""
    def setUp(self) -> None:
        """Setup user serializer tests"""
        self.user = UserFactory(username = 'testuser1', email = "testuser1@test.com")
        self.business_area = BusinessAreaFactory()
        self.profile = UserProfileFactory(
            user=self.user,
            completed=False,
            years_experience=None,
            pronoun=None,
            business_area=None)
        self.serializer = UserProfileSerializer(self.profile)

    def test_update(self) -> None:
        """Completed field will be automatically populated"""
        data = {
            "years_experience": 20,
            "pronoun": "she",
            "business_area": self.business_area,
        }

        self.serializer.update(self.profile, validated_data=data)

        self.assertEqual(self.profile.business_area, self.business_area)
        self.assertTrue(self.profile.completed)

class TestUserSerializer(TestCase):
    """Test methods for the UserSerializer serializer class."""
    def setUp(self) -> None:
        """Setup user serializer tests"""
        self.user = UserFactory(username = 'testuser1', email = "testuser1@test.com")
        self.serializer = UserSerializer(data=self.user)

    def test_get_full_name(self) -> None:
        """Ensure user full name is displayed as intended
        """
        self.assertEqual(self.serializer.get_full_name(self.user), self.user.get_full_name())

class TestRegisterSerializer(TestCase):
    """
    Test case for the registration serializer.
    """
    def setUp(self):
        self.user = UserFactory(username = 'testuser1', email = "testuser1@test.com")
        self.serializer = RegisterSerializer()
        self.serializer_data = {}

    def test_validate_password(self):
        """
        Ensure passwords are validated.
        """
        self.serializer_data = {
            "first_name": "Test",
            "last_name": "User",
            "password": "cs261412",
            "verify_password": "cs261413",
            "email": "unique@test.com",
            "username": "uniqueuser"
        }
        self.serializer = RegisterSerializer(data=self.serializer_data)
        self.assertFalse(self.serializer.is_valid())

    def test_validate_username_duplicate(self):
        """
        Ensure duplicate usernames are not allowed.
        """
        self.serializer_data = {
            "first_name": "Test",
            "last_name": "User",
            "password": "cs261412",
            "verify_password": "cs261412",
            "username": self.user.username,
            "email": "unique@test.com"
        }
        self.serializer = RegisterSerializer(data=self.serializer_data)
        self.assertFalse(self.serializer.is_valid())

    def test_validate_email_duplicate(self):
        """
        Ensure duplicate emails are not allowed.
        """
        self.serializer_data = {
            "first_name": "Test",
            "last_name": "User",
            "password": "cs261412",
            "verify_password": "cs261412",
            "username": "uniqueuser",
            "email": self.user.email.upper()
        }
        self.serializer = RegisterSerializer(data=self.serializer_data)
        self.assertFalse(self.serializer.is_valid())

    def test_validate_username_email_normalize(self):
        """
        Ensure emails and usernames are saved as its lowercase representation.
        """
        self.serializer_data = {
            "first_name": "Test",
            "last_name": "User",
            "password": "cs261412",
            "verify_password": "cs261412",
            "username": "ABCDEFG",
            "email": "TESTUSER2@TEST.COM"
        }
        self.serializer = RegisterSerializer(data=self.serializer_data)
        self.assertTrue(self.serializer.is_valid())
        self.assertEqual(self.serializer.data.get("username"), "abcdefg")
        self.assertEqual(
            self.serializer.data.get("email"),
            "testuser2@test.com")

    def test_create(self):
        """
        Ensure user can register successfully.
        """
        data = {
            "username": "testuser",
            "email": "email@test.com",
            "first_name": "Test",
            "last_name": "User",
            "password": "abccs261145",
            "verify_password": "abccs261145",
        }

        self.serializer.create(data)

        self.assertTrue(
            get_user_model().objects.filter(
                username=data['username'].lower()).exists())
