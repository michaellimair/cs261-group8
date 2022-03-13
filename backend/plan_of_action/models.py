from django.db import models
from django.utils.translation import gettext_lazy as _
from django_extensions.db.models import TimeStampedModel

from matching.models import MentoringPair

class PlanOfAction(TimeStampedModel):
    """
    Model of plan of action
    """
    title = models.TextField()
    description = models.TextField()
    mentoring_pair = models.ForeignKey(
        MentoringPair,
        on_delete=models.CASCADE,
    )
    class PlanOfActionType(models.TextChoices):
        """
        Personal or Professional milestone should be chosen.
        """
        PERSONAL = 'personal', _('personal')
        PROFESSIONAL = 'professional', _('professional')

    type = models.CharField(
        max_length=20,
        choices=PlanOfActionType.choices,
        null=False
    )
    approved = models.BooleanField(default=False)


class Milestone(TimeStampedModel):
    """
    Model for milestone connect to plan of action
    """
    title = models.TextField()
    description = models.TextField()
    plan_of_action = models.ForeignKey(PlanOfAction, on_delete=models.CASCADE, related_name='milestones')
    completed = models.BooleanField(default=False)


class Comment(TimeStampedModel):
    """
    Model for comment add on plan of action
    """
    content = models.TextField()
    plan_of_action = models.ForeignKey(PlanOfAction, on_delete=models.CASCADE, related_name='comments')
