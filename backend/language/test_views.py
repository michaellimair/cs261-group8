from snapshottest.django import TestCase
from django.urls import reverse
from rest_framework.test import force_authenticate, APIRequestFactory
from users.factories import UserFactory
from .views import LanguageViewSet

class TestLanguageViewSet(TestCase):
    """Test cases for view set for the language app."""

    def setUp(self) -> None:
        self.user = UserFactory()
        self.request_factory = APIRequestFactory()

    def test_list(self):
        """Ensures that languages can be listed."""
        url = reverse('language-list')
        request = self.request_factory.get(url)
        force_authenticate(request, user=self.user)

        response = LanguageViewSet.as_view({'get': 'list'})(request)

        self.assertEqual(response.status_code, 200)
        self.assertMatchSnapshot(response.data)
