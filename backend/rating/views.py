from django.shortcuts import get_object_or_404
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from users.permissions import IsMentee
from matching.permissions import IsMenteePaired

from .models import MentorRatingEntry
from .serializers import MentorRatingEntrySerializer

# Create your views here.
class MenteeRatingViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsMentee, IsMenteePaired]
    serializer_class = MentorRatingEntrySerializer

    def get_queryset(self):
        return MentorRatingEntry.objects.all()

    def list(self, _):
        instance = get_object_or_404(MentorRatingEntry.objects.filter(mentee=self.request.user))
        return Response(self.get_serializer(instance).data)
