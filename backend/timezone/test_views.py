from snapshottest.django import TestCase
from django.urls import reverse
from .views import TimezoneViewSet
from rest_framework.test import force_authenticate, APIRequestFactory
from users.factories import UserFactory

class TestTimezoneViewSet(TestCase):
    """Test cases for view set for the timezone app."""

    def setUp(self) -> None:
        self.user = UserFactory()
        self.request_factory = APIRequestFactory()

    def test_list(self):
        """Ensures that timezones can be listed."""
        url = reverse('timezone-list')
        request = self.request_factory.get(url)
        force_authenticate(request, user=self.user)

        response = TimezoneViewSet.as_view({'get': 'list'})(request)

        self.assertEqual(response.status_code, 200)
        self.assertMatchSnapshot(response.data)
