from django.test import TestCase, Client, RequestFactory
from django.contrib.auth.models import User
from .views import MyDataView

class TestLoginView(TestCase):
  def setUp(self):
    self.username = 'testuser'
    self.password = 'testpass124'
    self.user = User.objects.create(username=self.username)
    self.user.set_password(self.password)
    self.user.save()
    self.client = Client()

  def test_post(self):
    body = {
      "username": self.username,
      "password": self.password
    }

    response = self.client.post('/api/auth/login', body)

    self.assertEqual(response.status_code, 200)
    
class TestMyDataView(TestCase):
  def setUp(self):
    self.username = 'testuser'
    self.password = 'testpass124'
    self.user = User.objects.create(username=self.username)
    self.user.set_password(self.password)
    self.user.save()
    self.request_factory = RequestFactory()

  def test_post(self):
    request = self.request_factory.get('/api/me')

    request.user = self.user

    response = MyDataView.as_view()(request)

    self.assertEqual(response.status_code, 200)    
