from typing import Any
import pycountry
from django.http import Http404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .utils import LANGS_WITH_CODE, languages_to_json

# Create your views here.
class LanguageViewSet(viewsets.ViewSet):
    """View sets for listing and searching countries"""
    permission_classes = [IsAuthenticated]

    def list(self):
        """Retrieves a list of countries, optionally given a search query"""
        return Response(languages_to_json(LANGS_WITH_CODE))
