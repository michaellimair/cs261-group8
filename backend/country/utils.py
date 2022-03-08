from typing import Dict, List
import pycountry
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def is_valid_country(code: str) -> None:
    """Checks whether a country code and raises an exception if the country code is not valid.

    Args:
        code (str): Two-digit country code
    """
    if pycountry.countries.get(alpha_2=code) is None:
        raise ValidationError(
            _('%(code) is not a valid country'),
            params={'code': code},
        )

def country_to_json(country: pycountry.ExistingCountries) -> Dict:
    """Converts a country to a JSON-serializable format"""
    return {
            "alpha_2": country.alpha_2,
            "alpha_3": country.alpha_3,
            "name": country.name,
            "flag": country.flag,
            "numeric": country.numeric
        }

def countries_to_json(countries: List[pycountry.ExistingCountries]) -> List[Dict]:
    """Converts a list of countries to a JSON-serializable format"""
    results = []
    for country in countries:
        results.append(country_to_json(country))
    return results
