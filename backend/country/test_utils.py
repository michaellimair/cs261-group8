from django.test import TestCase
from .utils import is_valid_country, countries_to_json, country_to_json
import pycountry

class TestCountryUtils(TestCase):
    """Test cases for utilities inside the country app."""
    def test_is_valid_country(self):
        """Ensures the is_valid_country function works properly"""
        self.assertEqual(is_valid_country('ID'), True)

    def test_country_to_json(self):
        """Ensures that countries are serialized to JSON properly"""
        country = pycountry.countries.get(alpha_2="ID")
        self.assertDictEqual(country_to_json(country), {
            "alpha_2": "ID",
            "alpha_3": "IDN",
            "name": "Indonesia",
            "flag": "🇮🇩",
            "numeric": "360"
        })

    def test_countries_to_json(self):
        """Ensures that countries can be serialized successfully"""
        country = pycountry.countries.get(alpha_2="ID")
        self.assertDictEqual(countries_to_json([country]), [{
            "alpha_2": "ID",
            "alpha_3": "IDN",
            "name": "Indonesia",
            "flag": "🇮🇩",
            "numeric": "360"
        }])