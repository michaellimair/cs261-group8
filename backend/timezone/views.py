from typing import Dict, List
import datetime
import pytz
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

def _to_timezone_data(timezones: List[str]) -> List[Dict]:
    """Convert list of timezones to JSON-serializable metadata"""
    results = []
    for zone in sorted(timezones):
        prefix = datetime.datetime.now(pytz.timezone(zone)).strftime('%Z')
        offset = datetime.datetime.now(pytz.timezone(zone)).strftime('%z')
        results.append({
            "code": zone,
            "prefix": prefix,
            "offset": offset,
            "name": f"{zone} ({prefix}{offset})"
        })
    return results

# Create your views here.
class TimezoneViewSet(viewsets.ViewSet):
    """View sets for listing and searching countries"""
    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)
        self.timezones = pytz.all_timezones

    permission_classes = [IsAuthenticated]

    def list(self, _):
        """Retrieves a list of available timezones"""
        return Response(_to_timezone_data(self.timezones))
