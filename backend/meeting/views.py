from django.shortcuts import get_object_or_404
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from users.permissions import IsMentee, IsMentor
from matching.permissions import IsMenteePaired
from .models import Meeting, MeetingRecord
from .serializers import MeetingSerializer, MeetingRecordSerializer

class MeetingMenteeViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet
):
    serializer_class = MeetingSerializer
    permission_classes = [IsMentee, IsMenteePaired]

    def get_queryset(self):
        user = self.request.user
        return Meeting.objects.filter(mentoring_pair__mentee=user)

class MeetingMentorViewSet(
    mixins.UpdateModelMixin,
    # Once a meeting is created, only the mentor has access to modify them
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet):
    serializer_class = MeetingSerializer
    permission_classes = [IsMentor]

    def get_queryset(self):
        user = self.request.user
        mentee_id = self.request.query_params.get('mentee_id')

        if mentee_id:
            return Meeting.objects.filter(mentoring_pair__mentor=user, mentoring_pair__mentee_id=mentee_id)

        return Meeting.objects.filter(mentoring_pair__mentor=user)


class MeetingRecordMenteeViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet
):
    permission_classes = [IsMentee, IsMenteePaired]
    serializer_class = MeetingRecordSerializer

    def get_queryset(self):
        return MeetingRecord.objects.filter(
            meeting__mentoring_pair__mentee=self.request.user,
            meeting=self.kwargs['meeting_pk'])
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['meeting'] = get_object_or_404(Meeting, pk=self.kwargs['meeting_pk'])
