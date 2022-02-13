# Derived from https://stackoverflow.com/questions/22250352/programmatically-create-a-django-group-with-permissions
import logging

from django.core.management.base import BaseCommand

from users.permission_constants import project_permission_group
from django.contrib.auth.models import Group, Permission, User
from django.contrib.contenttypes.models import ContentType

class Command(BaseCommand):
  help = 'Creates default groups (mentors and mentees) for the user model.'

  def handle(self, *args, **options):
    for group_name, group_permissions in project_permission_group.items():
        new_group, created = Group.objects.get_or_create(name=group_name)

        content_type = ContentType.objects.get_for_model(User)

        for permission in group_permissions:
          permission_code, permission_name = permission
          if not Permission.objects.filter(codename=permission_code).exists():
            logging.debug("Creating permission with codename {}".format(permission_code))
            permission = Permission.objects.create(
              codename=permission_code,
              name=permission_name,
              content_type=content_type
            )
            new_group.permissions.add(permission)

    print("Created default group and permissions.")
