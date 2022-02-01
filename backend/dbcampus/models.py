from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

class UserProfile(models.Model):
  class Title(models.TextChoices):
    ANALYST = 'ANLST', _('title.anlst')
    ASSOCIATE = 'ASSOC', _('title.assoc')
    ASSISTANT_VICE_PRESIDENT = 'AVP', _('title.avp')
    VICE_PRESIDENT = 'VP', _('title.vp')
    DIRECTOR = 'DIR', _('title.dir')
    MANAGING_DIRECTOR = 'MD', _('title.md')
  user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
  pronoun = models.CharField(
    max_length=50,
  )
  title = models.CharField(
    max_length=5,
    choices=Title.choices,
    blank=False,
  )
