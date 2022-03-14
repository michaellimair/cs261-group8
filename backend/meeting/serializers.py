from rest_framework import serializers

from event.utils import has_clashing_events
from event.serializers import EventSerializer
from matching.models import MentoringPair

from plan_of_action.models import PlanOfAction
from plan_of_action.serializers import PlanOfActionSerializer

from .models import Meeting, MeetingRecord, MeetingStatus

class MeetingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingRecord
        fields = ('meeting_id', 'description', 'attachments', 'approved')

class MeetingSerializer(serializers.ModelSerializer):
    record = MeetingRecordSerializer(read_only=True)
    event = EventSerializer()
    plans_of_action = PlanOfActionSerializer(many=True, read_only=True)
    plan_of_action_ids = serializers.PrimaryKeyRelatedField(
        queryset=PlanOfAction.objects.all(),
        many=True,
        source='plans_of_action')

    class Meta:
        model = Meeting
        fields = ('id', 'event', 'plans_of_action', 'plan_of_action_ids', 'status', 'record')

    def _get_mentoring_pair(self) -> MentoringPair:
        request = self.context.get("request")
        if self.instance:
            return self.instance.mentoring_pair
        return MentoringPair.objects.filter(mentee=request.user).first()

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

    def validate_plan_of_action_ids(self, value):
        mentoring_pair = self._get_mentoring_pair()
        for plan_of_action in value:
            # Should only be able to select one's own plan of action
            if plan_of_action.mentoring_pair != mentoring_pair:
                raise serializers.ValidationError("Invalid plan of action.")
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

    def update(self, instance, validated_data):
        if instance.status == MeetingStatus.ACCEPTED:
            raise serializers.ValidationError({
                "status": ["Accepted meetings cannot be updated."]
            })
        return super().update(instance, validated_data)
