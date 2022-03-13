from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from .permission_constants import MENTOR_GROUP

@receiver(post_save, sender=get_user_model())
def add_rating_model(sender, instance, **kwargs):
    print(instance.groups)
    if MENTOR_GROUP in instance.groups:
        print("hello")