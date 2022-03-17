import pycountry
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

LANGS_WITH_CODE = list(filter(lambda x: hasattr(x, 'alpha_2'), pycountry.languages))

ALL_LANGS = set(lang.alpha_2 for lang in LANGS_WITH_CODE)

def language_to_json(language):
    """Convert pycountry language data to JSON format."""
    return {
        "code": language.alpha_2,
        "name": language.name,
    }

def languages_to_json(languages):
    """Convert a list of pycountry language data to JSON format."""
    results = []
    for language in languages:
        results.append(language_to_json(language))
    return sorted(results, key=lambda x: x["name"])

def is_valid_language(lang: str) -> None:
    """Checks whether a language is valid and raises an exception if it is not.

    Args:
        lang (str): String representing language
    """
    if lang not in ALL_LANGS:
        raise ValidationError(
            _('%(lang) is not a valid language.'),
            params={'lang': lang},
        )
