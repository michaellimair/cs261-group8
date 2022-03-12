from rest_framework import viewsets, mixins
from users.permissions import IsMentee, IsMentor
from matching.permissions import IsMenteePaired
from .models import Meeting
from .serializers import MeetingSerializer

class MeetingMenteeViewSet(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    permission_classes = [IsMentee, IsMenteePaired]

    def get_queryset(self):
        user = self.request.user
        return Meeting.objects.filter(mentoring_pair__mentee=user)

class MeetingMentorViewSet(mixins.UpdateModelMixin,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        viewsets.GenericViewSet):
    serializer_class = MeetingSerializer
    permission_classes = [IsMentor]

    def get_queryset(self):
        user = self.request.user
        mentee_id = self.request.query_params.get('mentee_id')

        if mentee_id:
            return Meeting.objects.filter(mentoring_pair__mentor=user, mentoring_pair__mentee_id=mentee_id)

        return Meeting.objects.filter(mentoring_pair__mentor=user)
