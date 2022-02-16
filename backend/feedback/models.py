from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django_extensions.db.models import TimeStampedModel
from safedelete.models import SafeDeleteModel, SOFT_DELETE_CASCADE


class UserFeedback(SafeDeleteModel, TimeStampedModel):
    """
    Model for user feedbacks.
    """
    _safedelete_policy = SOFT_DELETE_CASCADE

    class FeedbackType(models.TextChoices):
        """
        Different types of feedback that a user is able to provide.
        """
        BUG = 'bug', _('bug_fixes')
        IMPROVEMENT = 'improvement', _('improvements')
        QUESTION = 'question', _('question')

    type = models.CharField(
        max_length=20,
        choices=FeedbackType.choices,
        default=FeedbackType.BUG,
        null=False
    )
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=False)
    content = models.TextField()


class UserFeedbackReply(TimeStampedModel):
    """
    Model for replies given by an administrator to a user feedback.
    """
    admin = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True)
    feedback = models.OneToOneField(
        UserFeedback,
        related_name='reply',
        on_delete=models.CASCADE,
        null=True)
    content = models.TextField()
