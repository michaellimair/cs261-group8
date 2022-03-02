from django.db import models
from django.utils.translation import gettext_lazy as _
from django_extensions.db.models import TimeStampedModel


class plan_of_action(TimeStampedModel):
    """
    Model of plan of action
    """
    #  left fk to pair here
    description = models.TextField()


class milestone(TimeStampedModel):
    """
    Model for milestone connect to plan of action
    """
    description = models.TextField()
    plan_of_action = models.ForeignKey(plan_of_action, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)


class Comment(TimeStampedModel):
    """
    Model for comment add on plan of action
    """
    content = models.TextField()
    plan_of_action = models.ForeignKey(plan_of_action, on_delete=models.CASCADE)
