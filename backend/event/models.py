from django.db import models
from django.db.models import Q
from django.forms import ValidationError
from django_extensions.db.models import TimeStampedModel
from django.contrib.auth import get_user_model

class Event(TimeStampedModel):
    title = models.TextField()
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    hosts = models.ManyToManyField(get_user_model(), related_name="hosted_events")
    attendees = models.ManyToManyField(get_user_model(), related_name="attendeed_events")
    location = models.TextField()

    def _validate_start_end_times(self):
        if self.end_time < self.start_time:
            raise ValidationError("End time cannot be before start time.")

    def save(self, *args, **kwargs):
        self._validate_start_end_times()
        return super().save(*args, **kwargs)
