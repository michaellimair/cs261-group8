from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from annoying.fields import AutoOneToOneField
from business_area.models import BusinessArea


class UserProfile(models.Model):
    """
    Model for profile of a user.
    """
    class Title(models.TextChoices):
        """
        Choices for the possible job title of an employee in the system.
        """
        ANALYST = 'anlst', _('title.anlst')
        ASSOCIATE = 'assoc', _('title.assoc')
        ASSISTANT_VICE_PRESIDENT = 'avp', _('title.avp')
        VICE_PRESIDENT = 'vp', _('title.vp')
        DIRECTOR = 'dir', _('title.dir')
        MANAGING_DIRECTOR = 'md', _('title.md')

    # AutoOneToOneField used such that the creation of a user
    # automatically triggers insertion of a UserProfile model.
    user = AutoOneToOneField(
        get_user_model(),
        related_name="profile",
        on_delete=models.CASCADE)
    pronoun = models.CharField(
        max_length=50,
        null=True,
    )
    completed = models.BooleanField(
        default=False,
    )
    business_area = models.ForeignKey(
        BusinessArea, on_delete=models.CASCADE, null=True,)
    years_experience = models.SmallIntegerField(
        null=True
    )
    title = models.CharField(
        max_length=5,
        choices=Title.choices,
        null=True,
    )
