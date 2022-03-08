from typing import Dict, List
import datetime
import pytz
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

def _to_timezone_data(timezones: List[str]) -> List[Dict]:
    results = []
    for zone in timezones:
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
    permission_classes = [IsAuthenticated]

    def list(self, _):
        """Retrieves a list of available timezones"""
        return Response(_to_timezone_data(pytz.all_timezones))
