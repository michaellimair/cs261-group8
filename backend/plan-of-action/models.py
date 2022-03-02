from django.db import models
from django.utils.translation import gettext_lazy as _
from django_extensions.db.models import TimeStampedModel


class PlanOfAction(TimeStampedModel):
    """
    Model of plan of action
    """
    #  left fk to pair here
    description = models.TextField()


class Milestone(TimeStampedModel):
    """
    Model for milestone connect to plan of action
    """
    description = models.TextField()
    plan_of_action = models.ForeignKey(PlanOfAction, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)


class Comment(TimeStampedModel):
    """
    Model for comment add on plan of action
    """
    content = models.TextField()
    plan_of_action = models.ForeignKey(PlanOfAction, on_delete=models.CASCADE)
