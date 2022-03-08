from django.core.exceptions import ValidationError
from django.test import TestCase
from .utils import validate_skill

class TestCountryUtils(TestCase):
    """Test cases for utilities inside the skill app."""
    def test_validate_skill_invalid(self):
        """Ensures the validate_skill function throws error on invalid skill"""
        with self.assertRaises(ValidationError) as _:
            validate_skill("XX")

    def test_validate_skill_valid(self):
        """Ensures the validate_skill function does not throw any error if skill is valid"""
        try:
            validate_skill("Negotiation")
        except ValidationError:
            self.fail("ValidationError is raised when validating a valid skill!")
