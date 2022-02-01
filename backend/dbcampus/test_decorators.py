import unittest
from .decorators import allowed_users
from django.contrib.auth.models import User

class test_decorators(unittest.TestCase):
  def test_allowed_users_notauthorized(self):
    user = User.objects.create_user('testuser1', 'testuser1@domain.com', 'testpassword', first_name='Test 1', last_name='User')

