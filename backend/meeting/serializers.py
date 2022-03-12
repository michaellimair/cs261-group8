from rest_framework import serializers

from event.utils import has_clashing_events
from event.serializers import EventSerializer
from matching.models import MentoringPair

from .models import Meeting, MeetingRecord, MeetingStatus

class MeetingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingRecord
        fields = ('meeting_id', 'description', 'attachments', 'approved')

class MeetingSerializer(serializers.ModelSerializer):
    record = MeetingRecordSerializer(read_only=True)
    event = EventSerializer()

    class Meta:
        model = Meeting
        fields = ('id', 'event', 'plans_of_action', 'status', 'record')

    def _get_mentoring_pair(self) -> MentoringPair:
        request = self.context.get("request")
        mentee = request.user
        return MentoringPair.objects.filter(mentee=mentee).first()

    def validate_event(self, value):
        mentoring_pair = self._get_mentoring_pair()
        start_time = value['start_time']
        end_time = value['end_time']
        if has_clashing_events(mentoring_pair.mentee, start_time, end_time):
            raise serializers.ValidationError("Event time clashes with one of your other events.")
        if has_clashing_events(mentoring_pair.mentor, start_time, end_time):
            raise serializers.ValidationError("Event time clashes with another event of mentor.")
        value['hosts'] = [mentoring_pair.mentor]
        value['attendees'] = [mentoring_pair.mentee]
        return value

    def create(self, validated_data):
        # Only mentee can create meeting, so we can safely assume
        # that mentoring_pair can be deduced from request.user
        mentoring_pair = self._get_mentoring_pair()

        event = EventSerializer().create(validated_data=validated_data['event'])

        meeting_data = {
            "event": event,
            "mentoring_pair": mentoring_pair,
            "status": MeetingStatus.REQUESTED,
            "plans_of_action": validated_data.get('plans_of_action')
        }

        return super().create(meeting_data)
