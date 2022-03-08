from typing import Any
import pycountry
from django.http import Http404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .utils import countries_to_json, country_to_json

# Create your views here.
class CountryViewSet(viewsets.ViewSet):
    """View sets for listing and searching countries"""
    permission_classes = [IsAuthenticated]

    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.countries = pycountry.countries

    def list(self, request):
        """Retrieves a list of countries, optionally given a search query"""
        search_query = request.query_params.get('q')
        if search_query:
            return Response(countries_to_json(self.countries.search_fuzzy(search_query)))

        return Response(countries_to_json(self.countries))

    # pylint: disable=invalid-name
    def retrieve(self, _, pk):
        """Retrieves a list of countries given its country code"""
        country = self.countries.get(alpha_2=pk)
        if not country:
            raise Http404()
        return Response(country_to_json(country))
