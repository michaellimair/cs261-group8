from django.db import models
from django_extensions.db.models import TimeStampedModel, TitleDescriptionModel
from django.contrib.postgres.fields import ArrayField

from matching.models import MentoringPair
from plan_of_action.models import PlanOfAction
from event.models import Event

class MeetingStatus(models.TextChoices):
    REQUESTED = 'requested'
    ALTERNATIVE_PROPOSED = 'alternative_proposed'
    ACCEPTED = 'accepted'

# Create your models here.
class Meeting(models.Model):
    """Model representing a meeting session."""
    event = models.OneToOneField(Event, on_delete=models.CASCADE)
    mentoring_pair = models.ForeignKey(MentoringPair, on_delete=models.CASCADE, related_name='meetings')
    plans_of_action = models.ManyToManyField(
        PlanOfAction,
        related_name='discussed_in',
        blank=True
    )
    """
    Status of a meeting. If it is accepted, it is immutable.
    However, if it is requested, a mentor can either accept or propose an alternative time.
    Proposing an alternative time can be done by changing the time in event
    and changing status to ALTERNATIVE_PROPOSED.
    If mentee does not want this time, goes back to requested.
    """
    status = models.CharField(max_length=30, choices=MeetingStatus.choices, default=MeetingStatus.REQUESTED)

    def delete(self, *args, **kwargs):
        self.event.delete()
        return super().delete(*args, **kwargs)

class MeetingRecord(TimeStampedModel):
    """Model representing results of a meeting to be submitted to mentor for approval."""
    meeting = models.OneToOneField(Meeting, on_delete=models.CASCADE, related_name="record", unique=True)
    description = models.TextField()
    attachments = ArrayField(
        models.FileField(upload_to="meeting_files/"),
        default=list
    )
    approved = models.BooleanField(default=False)
