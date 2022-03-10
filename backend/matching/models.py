from django.db import models
from users.models import UserProfile

# Create your models here.
class MentoringPair(models.Model):
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
    created = models.DateTimeField(auto_now_add=True)
