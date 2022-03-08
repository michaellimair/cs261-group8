from snapshottest.django import TestCase
from django.urls import reverse
from rest_framework.test import force_authenticate, APIRequestFactory
from users.factories import UserFactory

from .views import CountryViewSet

class TestCountryViewSet(TestCase):
    """Test cases for view set for the country app."""

    def setUp(self) -> None:
        self.user = UserFactory()
        self.request_factory = APIRequestFactory()

    def test_list_full(self):
        """Ensures that countries can be listed without search query."""
        url = reverse('country-list')
        request = self.request_factory.get(url)
        force_authenticate(request, user=self.user)

        response = CountryViewSet.as_view({'get': 'list'})(request)

        self.assertEqual(response.status_code, 200)
        self.assertMatchSnapshot(response.data)

    def test_list_search(self):
        """Ensures that countries can be listed when a search query is provided."""
        url = reverse('country-list')
        request = self.request_factory.get(url, {"q": "Indo"})
        force_authenticate(request, user=self.user)

        response = CountryViewSet.as_view({'get': 'list'})(request)

        self.assertEqual(response.status_code, 200)
        self.assertMatchSnapshot(response.data)

    def test_retrieve_404(self):
        """Returns 404 is an invalid country code is given."""
        url = reverse('country-detail', kwargs={'pk': 'ZZ'})
        request = self.request_factory.get(url)
        force_authenticate(request, user=self.user)
        response = CountryViewSet.as_view({'get': 'retrieve'})(request, pk="ZZ")
        self.assertEqual(response.status_code, 404)

    def test_retrieve_success(self):
        """Gets the country successfully if the country code is valid."""
        url = reverse('country-detail', kwargs={'pk': 'ID'})
        request = self.request_factory.get(url)
        force_authenticate(request, user=self.user)
        response = CountryViewSet.as_view({'get': 'retrieve'})(request, pk="ID")
        self.assertEqual(response.status_code, 200)
        self.assertMatchSnapshot(response.data)
