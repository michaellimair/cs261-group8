from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from rest_framework.test import force_authenticate, APIRequestFactory
from .views import MyDataView


class TestLoginView(TestCase):
    """
    Test cases related to login functionality.
    """
    def setUp(self):
        self.username = 'testuser'
        self.password = 'testpass124'
        self.user = get_user_model().objects.create(username=self.username)
        self.user.set_password(self.password)
        self.user.save()
        self.client = Client()

    def test_post(self):
        """
        Test logging in with the correct username and password.
        """
        body = {
            "username": self.username,
            "password": self.password
        }

        response = self.client.post('/api/v1/auth/login', body)

        self.assertEqual(response.status_code, 200)


class TestMyDataView(TestCase):
    """
    Test cases related to viewing the information of a logged in user.
    """
    def setUp(self):
        self.username = 'testuser'
        self.password = 'testpass124'
        self.user = get_user_model().objects.create(username=self.username)
        self.user.set_password(self.password)
        self.user.save()
        self.request_factory = APIRequestFactory()

    def test_get(self):
        """
        User can see their own profile as expected.
        """
        request = self.request_factory.get('/api/me')

        request.user = self.user

        force_authenticate(request, user=self.user)

        response = MyDataView.as_view()(request)

        self.assertEqual(response.status_code, 200)
