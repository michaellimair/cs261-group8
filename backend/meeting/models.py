from django.db import models
from django_extensions.db.models import TimeStampedModel
from django.contrib.postgres.fields import ArrayField

from matching.models import MentoringPair
from plan_of_action.models import PlanOfAction

# Create your models here.
class Meeting(TimeStampedModel):
    mentoring_pair = models.ForeignKey(MentoringPair, on_delete=models.CASCADE, related_name='meetings')
    title = models.TextField()
    agenda = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    plans_of_action = models.ManyToManyField(
        'plan_of_action.PlanOfAction',
        related_name='discussed_in'
    )
    class MeetingStatus(models.TextChoices):
        REQUESTED = 'requested'
        ALTERNATIVE_PROPOSED = 'alternative_proposed'
        ACCEPTED = 'accepted'

    proposed_alternative_start = models.DateTimeField()
    proposed_alternative_end = models.DateTimeField()
    status = models.CharField(max_length=30, choices=MeetingStatus.choices, default=MeetingStatus.REQUESTED)

class MeetingRecord(TimeStampedModel):
    meeting = models.OneToOneField(Meeting, on_delete=models.CASCADE, related_name="record")
    description = models.TextField()
    attachments = ArrayField(
        models.FileField(upload_to="meeting_files/"),
        default=list()
    )
    approved = models.BooleanField(default=False)
