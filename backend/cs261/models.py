from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from annoying.fields import AutoOneToOneField

class BusinessArea(models.Model):
  name = models.CharField(max_length=50)
  label = models.CharField(max_length=100)

class UserProfile(models.Model):
  class Title(models.TextChoices):
    ANALYST = 'ANLST', _('title.anlst')
    ASSOCIATE = 'ASSOC', _('title.assoc')
    ASSISTANT_VICE_PRESIDENT = 'AVP', _('title.avp')
    VICE_PRESIDENT = 'VP', _('title.vp')
    DIRECTOR = 'DIR', _('title.dir')
    MANAGING_DIRECTOR = 'MD', _('title.md')
  user = AutoOneToOneField(User, related_name="profile", on_delete=models.CASCADE)
  pronoun = models.CharField(
    max_length=50,
    null=True,
  )
  completed = models.BooleanField(
    default=False,
  )
  business_area = models.ForeignKey(BusinessArea, on_delete=models.CASCADE, null=True,)
  years_experience = models.SmallIntegerField(
    null=True
  )
  title = models.CharField(
    max_length=5,
    choices=Title.choices,
    null=True,
  )
