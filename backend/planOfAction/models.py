from django.db import models
from django.utils.translation import gettext_lazy as _
from django_extensions.db.models import TimeStampedModel


class PlanOfAction(TimeStampedModel):
    """
    Model of plan of action
    """
    #  left fk to pair here
    description = models.TextField()


class MileStone(TimeStampedModel):
    """
    Model for milestone connect to plan of action
    """
    description = models.TextField()
    dateRecorded = models.DateTimeField()
    planOfAction = models.ForeignKey(PlanOfAction, on_delete=models.CASCADE, null=True)
    completed = models.BooleanField(default=False)


class Comment(TimeStampedModel):
    """
    Model for comment add on milestone(?)
    """
    content = models.TextField()
    milestone = models.ForeignKey(MileStone, on_delete=models.CASCADE, null=True)
