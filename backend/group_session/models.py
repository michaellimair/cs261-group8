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

class GroupSessionRequest(TimeStampedModel):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    skills = ArrayField(
        models.CharField(max_length=512, validators=[validate_skill]),
        default=list
    )
    type = models.CharField(max_length=64, choices=GroupSessionType.choices)
