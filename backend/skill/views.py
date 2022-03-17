from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from thefuzz import process

from .utils import get_skills

# Create your views here.
class SkillViewSet(viewsets.ViewSet):
    """View set for listing and searching skills"""
    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)
        self.skills = get_skills()

    permission_classes = [IsAuthenticated]

    def list(self, request):
        """Retrieves a list of skills, optionally given a search query"""
        # TODO: Use speedup version of fuzz
        search_query = request.query_params.get('q')
        if search_query:
            search_result = process.extract(search_query, self.skills, limit=10)
            return Response([val for (val, _) in search_result])
        return Response(self.skills)
