from datetime import datetime, timedelta
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from users.permissions import IsMentee, IsMentor
from matching.permissions import IsMenteePaired

from .models import GroupSessionRequest
from .serializers import GroupSessionRequestSerializer, GroupSessionSuggestionSerializer
from .utils import get_suggestion_count

class GroupSessionRequestMenteeViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = GroupSessionRequestSerializer
    permission_classes = [IsMentee, IsMenteePaired]

class GroupSessionSuggestionsMentorViewSet(viewsets.GenericViewSet):
    serializer_class = GroupSessionSuggestionSerializer
    permission_classes = [IsMentor]

    def get_queryset(self):
        return super().get_queryset()

    def list(self, request):
        print("list suggestions")

        suggestions = get_suggestion_count(request.user.profile.skills)

        print(suggestions)

        return Response()
        # return Response(self.get_serializer(suggestions, many=True).data)
