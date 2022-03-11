from django.db import models
from users.models import UserProfile
from django_extensions.db.models import TimeStampedModel

# Create your models here.
class MentoringPair(TimeStampedModel):
    """
    Model for a pairing between mentor and mentee.
    """
    mentor = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE
    )
    mentee = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE
    )
    class PairStatus(models.TextChoices):
        """
        Different types of pairing status.
        """
        ACCEPTED = 'accepted'
        REJECTED = 'rejected'
