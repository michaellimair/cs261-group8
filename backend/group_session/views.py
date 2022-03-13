from rest_framework import viewsets, mixins
from rest_framework.response import Response
from users.permissions import IsMentee, IsMentor
from matching.permissions import IsMenteePaired

from .models import GroupSession
from .serializers import (
    GroupSessionRequestSerializer,
    GroupSessionSuggestionSerializer,
    GroupSessionSerializer,
    GroupSessionDetailSerializer,
)
from .utils import get_suggestion_count
from .permissions import IsGroupSessionCreator

class GroupSessionRequestMenteeViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = GroupSessionRequestSerializer
    permission_classes = [IsMentee, IsMenteePaired]

class GroupSessionSuggestionsMentorViewSet(viewsets.GenericViewSet):
    serializer_class = GroupSessionSuggestionSerializer
    permission_classes = [IsMentor, IsGroupSessionCreator]

    def get_queryset(self):
        return super().get_queryset()

    def list(self, request):
        suggestions = get_suggestion_count(request.user.profile.skills)

        return Response(self.get_serializer(suggestions, many=True).data)

class GroupSessionMentorViewSet(
                mixins.CreateModelMixin,
                mixins.ListModelMixin,
                mixins.RetrieveModelMixin,
                mixins.UpdateModelMixin,
                mixins.DestroyModelMixin,
                viewsets.GenericViewSet):
    """Group sessions specific to a mentor"""
    permission_classes = [IsMentor]
    serializer_class = GroupSessionSerializer
    serializer_action_classes = {
        'retrieve': GroupSessionDetailSerializer
    }
    ordering = ('-event.start_time')

    def get_queryset(self):
        return GroupSession.objects.filter(event__hosts__id__contains=self.request.user.id)

    def get_serializer_class(self):
        return self.serializer_action_classes.get(self.action) or super().get_serializer_class()
