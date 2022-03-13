from datetime import datetime, timedelta
from django.db import models
from django.contrib.auth import get_user_model
from django_extensions.db.models import TimeStampedModel, TitleDescriptionModel
from django.contrib.postgres.fields import ArrayField
from skill.utils import validate_skill
from event.models import Event

class GroupSessionType(models.TextChoices):
    WORKSHOP = 'workshop'
    TUTORING_SESSION = 'tutoring_session'

class GroupSession(TimeStampedModel, TitleDescriptionModel):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    max_attendees = models.IntegerField()
    type = models.CharField(max_length=64, choices=GroupSessionType.choices)
    related_skills = ArrayField(
        models.CharField(max_length=512, validators=[validate_skill]),
        default=list
    )

    def delete(self, *args, **kwargs):
        self.event.delete()
        return super().delete(*args, **kwargs)

class GroupSessionRequest(TimeStampedModel):
    # One user can only request a group session once
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, unique_for_date="created")

    @property
    def skills(self):
        return self.requested_skills_set.all()

class GroupSessionRequestedSkill(models.Model):
    request = models.ForeignKey(GroupSessionRequest, on_delete=models.CASCADE, related_name="requested_skills")
    skill = models.CharField(max_length=512, validators=[validate_skill])
