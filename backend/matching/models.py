from django.db import models
from django.contrib.auth import get_user_model
from django_extensions.db.models import TimeStampedModel

# Create your models here.
class MentoringPair(TimeStampedModel):
    """
    Model for a pairing between mentor and mentee.
    """
    mentor = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='mentor_pairs'
    )
    mentee = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='mentee_pairs'
    )
    class PairStatus(models.TextChoices):
        """
        Different types of pairing status.
        """
        ACCEPTED = 'accepted'
        PENDING = 'pending'
        REJECTED = 'rejected'
        EXPIRED = 'expired' # Used if mentor/mentee pair is no longer valid
    status = models.CharField(max_length=20, choices=PairStatus.choices, default=PairStatus.PENDING)

    class Meta:
        unique_together = ('mentor', 'mentee',)
