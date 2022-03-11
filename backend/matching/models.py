from django.db import models
from django.contrib.auth import get_user_model
from django_extensions.db.models import TimeStampedModel
from users.permission_constants import MENTEE_GROUP, MENTOR_GROUP

# Create your models here.
class MentoringPair(TimeStampedModel):
    """
    Model for a pairing between mentor and mentee.
    """
    mentor = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='mentor'
    )
    mentee = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='mentee'
    )
    class PairStatus(models.TextChoices):
        """
        Different types of pairing status.
        """
        ACCEPTED = 'accepted'
        PENDING = 'pending'
        REJECTED = 'rejected'
    status = models.CharField(max_length=20, choices=PairStatus.choices, default=PairStatus.PENDING)

    class Meta:
        unique_together = ('mentor', 'mentee',)
