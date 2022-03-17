from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .utils import LANGS_WITH_CODE, languages_to_json

# Create your views here.
class LanguageViewSet(viewsets.ViewSet):
    """View sets for listing the supported user languages"""
    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)
        self.languages = LANGS_WITH_CODE

    permission_classes = [IsAuthenticated]

    def list(self, _):
        """Retrieves a list of languages"""
        return Response(languages_to_json(self.languages))
