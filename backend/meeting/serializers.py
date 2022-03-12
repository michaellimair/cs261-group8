from rest_framework import serializers
from .models import Meeting, MeetingRecord

class MeetingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingRecord
        fields = ('description', 'attachments', 'approved')

class MeetingSerializer(serializers.ModelSerializer):
    record = MeetingRecordSerializer(read_only=True)

    class Meta:
        model = Meeting
        fields = ('id', 'title', 'agenda', 'start_time', 'end_time', 'plans_of_action', 'status', 'proposed_alternative_start', 'proposed_alternative_end')
