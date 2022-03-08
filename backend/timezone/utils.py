import pytz
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def is_valid_timezone(zone: str) -> None:
    """Checks whether a timezone and raises an exception if the timezone is not valid.

    Args:
        zone (str): String representing timezone
    """
    if zone not in pytz.all_timezones_set:
        raise ValidationError(
            _('%(zone) is not a valid timezone.'),
            params={'zone': zone},
        )
