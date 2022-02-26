from django.test import TestCase
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer
from .factories import UserFactory


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