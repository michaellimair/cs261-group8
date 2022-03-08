from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from thefuzz import process

from .utils import get_skills

all_skills = get_skills()

# Create your views here.
class SkillViewSet(viewsets.ViewSet):
    """View sets for listing and searching skills"""
    permission_classes = [IsAuthenticated]

    def list(self, request):
        """Retrieves a list of skills, optionally given a search query"""
        # TODO: Use speedup version of fuzz
        search_query = request.query_params.get('q')
        if search_query:
            search_result = process.extract(search_query, all_skills, limit=2)
            return Response([val for (val, _) in search_result])
        return Response(all_skills)
