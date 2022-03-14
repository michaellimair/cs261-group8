from django.shortcuts import get_object_or_404
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsMentee
from matching.permissions import IsMenteePaired

from matching.models import MentoringPair
from .models import MentorRatingEntry, MentorRating
from .serializers import MentorRatingEntrySerializer

# Create your views here.
class MenteeRatingViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsMentee, IsMenteePaired]
    serializer_class = MentorRatingEntrySerializer

    def get_queryset(self):
        return MentorRatingEntry.objects.filter(mentee=self.request.user)

    def list(self, _):
        instance = get_object_or_404(self.get_queryset())
        return Response(self.get_serializer(instance).data)
