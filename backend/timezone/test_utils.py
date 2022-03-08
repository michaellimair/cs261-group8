from django.core.exceptions import ValidationError
from django.test import TestCase
from .utils import is_valid_timezone

class TestTimezoneUtils(TestCase):
    """Test cases for utilities inside the country app."""
    def test_is_valid_timezone(self):
        """Ensures the is_valid_timezone function works properly"""
        with self.assertRaises(ValidationError) as _:
            is_valid_timezone("XX")
