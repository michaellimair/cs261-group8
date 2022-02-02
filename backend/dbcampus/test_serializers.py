import factory
from django.test import TestCase
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework import serializers

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
      model = User
      django_get_or_create = ('username',)

    username = 'michael'

class TestRegisterSerializer(TestCase):
  def setUp(self):
    self.user = UserFactory()
    self.serializer = RegisterSerializer()

  def test_validate_password(self):
    _attrs = {
      "password": "dbcampus412",
      "verify_password": "dbcampus413"
    }
    self.assertRaises(serializers.ValidationError, self.serializer.validate, _attrs)

  def test_validate_username_duplicate(self):
    _attrs = {
      "password": "dbcampus412",
      "verify_password": "dbcampus412",
      "username": self.user.username,
    }
    self.assertRaises(serializers.ValidationError, self.serializer.validate, _attrs)

  def test_validate_username_normalize(self):
    _attrs = {
      "password": "dbcampus412",
      "verify_password": "dbcampus412",
      "username": "abcdefg".upper(),
    }
    attrs_processed = self.serializer.validate(_attrs)
    self.assertEqual(attrs_processed['username'], _attrs['username'].lower())

  def test_create(self):
    data = {
      "username": "testuser",
      "email": "email@test.com",
      "first_name": "Test",
      "last_name": "User",
      "password": "abcdbcampus145"
    }

    self.serializer.create(data)

    self.assertTrue(User.objects.filter(username=data['username'].lower()).exists())
