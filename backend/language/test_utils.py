import pycountry
from django.core.exceptions import ValidationError
from django.test import TestCase
from .utils import is_valid_language, language_to_json, languages_to_json

class TestLanguageUtils(TestCase):
    """Test cases for utilities inside the language app."""
    def test_is_valid_language(self):
        """Ensures the is_valid_country function works properly"""
        with self.assertRaises(ValidationError) as _:
            is_valid_language("XX")

    def test_language_to_json(self):
        """Ensures that languages are serialized to JSON properly"""
        language = pycountry.languages.get(alpha_2="en")
        self.assertDictEqual(language_to_json(language), {
            "name": "English",
            "code": "en",
        })

    def test_countries_to_json(self):
        """Ensures that languages can be serialized successfully"""
        language = pycountry.countries.get(alpha_2="ID")
        self.assertListEqual(languages_to_json([language]), [{
            "name": "Indonesia",
            "code": "ID",
        }])
