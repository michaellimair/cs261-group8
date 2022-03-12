from django.test import TestCase
from .models import UserProfile
from .utils import get_higher_titles

class TestUserUtils(TestCase):
    """Test cases for user utilities"""
    def test_get_higher_titles(self):
        """Should obtain job titles that are higher or equal to given title"""
        self.assertListEqual(
            get_higher_titles(UserProfile.Title.VICE_PRESIDENT),
            [UserProfile.Title.VICE_PRESIDENT, UserProfile.Title.DIRECTOR, UserProfile.Title.MANAGING_DIRECTOR]
        )
