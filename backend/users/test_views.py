from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import force_authenticate, APIRequestFactory

from business_area.factories import BusinessAreaFactory
from business_area.serializers import BusinessAreaSerializer
from .serializers import UserProfileSerializer
from .factories import UserFactory, UserProfileFactory
from .views import MyDataView, UserProfileViewSet


class TestUserProfileViewSet(TestCase):
    """Test case related to user profile."""
    def setUp(self) -> None:
        self.user = UserFactory()
        self.business_area = BusinessAreaFactory(name="pb", label="Private Bank (Wealth Management)")
        self.profile = UserProfileFactory(
            user=self.user,
            business_area=self.business_area)
        self.request_factory = APIRequestFactory()

    def test_retrieve(self):
        """User profile will be their own profile"""
        url = reverse('profile-detail', kwargs={'pk': self.user.id})
        request = self.request_factory.get(url)
        request.user = self.user
        force_authenticate(request, user=self.user)

        serializer = UserProfileSerializer(self.profile)
        business_area_serializer = BusinessAreaSerializer(self.business_area)

        response = UserProfileViewSet.as_view({'get': 'retrieve'})(request, user_pk=self.user.id)

        expected_data = serializer.data.copy()
        expected_data['business_area'] = business_area_serializer.data

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_data)

    def test_update(self):
        """Users will be able to update their own profile."""
        url = reverse('profile-detail', kwargs={'pk': self.user.id})

        years_experience = 20
        pronoun = "she"
        data = {
            "business_area": self.business_area.id,
            "years_experience": years_experience,
            "pronoun": pronoun
        }

        request = self.request_factory.patch(url, data)
        request.user = self.user

        force_authenticate(request, user=self.user)

        serializer = UserProfileSerializer(self.profile)
        business_area_serializer = BusinessAreaSerializer(self.business_area)

        expected_data = serializer.data.copy()
        expected_data['business_area'] = business_area_serializer.data
        expected_data['years_experience'] = years_experience
        expected_data['pronoun'] = pronoun

        response = UserProfileViewSet.as_view({'patch': 'update'})(request, user_pk=self.user.id)

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.data, expected_data)


class TestLoginView(TestCase):
    """
    Test cases related to login functionality.
    """
    def setUp(self):
        self.username = 'testuser'
        self.user = UserFactory(username=self.username)
        self.profile = UserProfileFactory(user=self.user)
        self.client = Client()

    def test_post(self):
        """
        Test logging in with the correct username and password.
        """
        body = {
            "username": self.username,
            "password": 'testpass124'
        }

        response = self.client.post(reverse('knox_login'), body)

        self.assertEqual(response.status_code, 200)


class TestMyDataView(TestCase):
    """
    Test cases related to viewing the information of a logged in user.
    """
    def setUp(self):
        self.user = UserFactory()
        self.profile = UserProfileFactory(user=self.user)
        self.request_factory = APIRequestFactory()

    def test_get(self):
        """
        User can see their own profile as expected.
        """
        request = self.request_factory.get(reverse('me'))

        request.user = self.user

        force_authenticate(request, user=self.user)

        response = MyDataView.as_view()(request)

        self.assertEqual(response.status_code, 200)
