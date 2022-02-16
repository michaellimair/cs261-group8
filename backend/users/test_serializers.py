import factory
from django.test import TestCase
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework import serializers


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ('username',)

    username = 'testuser1'
    email = "testuser1@test.com"


class TestRegisterSerializer(TestCase):
    def setUp(self):
        self.user = UserFactory()
        self.serializer = RegisterSerializer()
        self.serializer_data = {}

    def test_validate_password(self):
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
            User.objects.filter(
                username=data['username'].lower()).exists())
