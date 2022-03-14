from typing import Dict, List
import datetime
from django.http import Http404
import pytz
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

timezone_country = {}
for countrycode in pytz.country_timezones:
    timezones = pytz.country_timezones[countrycode]
    for timezone in timezones:
        timezone_country[timezone] = countrycode

_results = []

def _tz_to_json(zone):
    country = timezone_country.get(zone)
    prefix = datetime.datetime.now(pytz.timezone(zone)).strftime('%Z')
    offset = datetime.datetime.now(pytz.timezone(zone)).strftime('%z')
    return {
        "country_code": country,
        "code": zone,
        "prefix": prefix,
        "offset": offset,
        "name": f"{zone} ({prefix}{offset})"
    }

for zone in pytz.all_timezones:
    country = timezone_country.get(zone)
    prefix = datetime.datetime.now(pytz.timezone(zone)).strftime('%Z')
    offset = datetime.datetime.now(pytz.timezone(zone)).strftime('%z')
    _results.append(_tz_to_json(zone))

_cached_json = sorted(_results, key=lambda x : x['name'])

# Create your views here.
class TimezoneViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, _):
        zone = self.request.query_params.get("name")
        if zone:
            return Response(_tz_to_json(zone))
        """Retrieves a list of available timezones"""
        return Response(_cached_json)
