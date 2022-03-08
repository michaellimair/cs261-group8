from typing import Dict, List
import pycountry

def is_valid_country(code: str) -> bool:
    """Checks whether a country code

    Args:
        code (str): Two-digit country code

    Returns:
        bool: Boolean indicating whether or not a country is valid
    """
    return pycountry.countries.get(alpha_2=code) is not None

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
