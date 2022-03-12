from snapshottest.django import TestCase
from django.urls import reverse
from rest_framework.test import force_authenticate, APIRequestFactory
from users.factories import UserFactory
from .views import SkillViewSet

class TestSkillViewSet(TestCase):
    """Test cases for view set for the country app."""

    def setUp(self) -> None:
        self.user = UserFactory()
        self.request_factory = APIRequestFactory()

    def test_list_full(self):
        """Ensures that skills can be listed without search query."""
        url = reverse('skill-list')
        request = self.request_factory.get(url)
        force_authenticate(request, user=self.user)

        response = SkillViewSet.as_view({'get': 'list'})(request)

        self.assertEqual(response.status_code, 200)
        self.assertMatchSnapshot(response.data)

    def test_list_search(self):
        """Ensures that skills can be listed when a search query is provided."""
        url = reverse('skill-list')
        request = self.request_factory.get(url, {"q": "Nego"})
        force_authenticate(request, user=self.user)

        response = SkillViewSet.as_view({'get': 'list'})(request)

        self.assertEqual(response.status_code, 200)
        self.assertMatchSnapshot(response.data)
