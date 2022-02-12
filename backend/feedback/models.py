from django.db import models
from django.contrib.auth.models import User
from django_extensions.db.models import TimeStampedModel
from django.utils.translation import gettext_lazy as _
from safedelete.models import SafeDeleteModel, SOFT_DELETE_CASCADE
from annoying.fields import AutoOneToOneField

class UserFeedback(SafeDeleteModel, TimeStampedModel):
  _safedelete_policy = SOFT_DELETE_CASCADE
  class FeedbackType(models.TextChoices):
    BUG = 'bug', _('bug_fixes')
    IMPROVEMENT = 'improvement', _('improvements')
    QUESTION = 'question', _('question')

  type = models.CharField(
    max_length=20,
    choices=FeedbackType.choices,
    default=FeedbackType.BUG,
    null=False
  )
  user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
  content = models.TextField()

class UserFeedbackReply(TimeStampedModel):
  admin = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
  feedback = models.OneToOneField(UserFeedback, related_name='reply', on_delete=models.CASCADE, null=True)
  content = models.TextField()
