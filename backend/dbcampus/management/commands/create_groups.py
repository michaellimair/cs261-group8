# Derived from https://stackoverflow.com/questions/22250352/programmatically-create-a-django-group-with-permissions
import logging

from django.core.management.base import BaseCommand

from dbcampus.permission_constants import project_permission_group
from django.contrib.auth.models import Group, Permission, User

class Command(BaseCommand):
  help = 'Creates default groups (mentors and mentees) for the user model.'

  def handle(self, *args, **options):
    for group_name, group_permissions in project_permission_group.items():
        new_group, created = Group.objects.get_or_create(name=group_name)
        for model in [User]:
            for permission in group_permissions:
              permission_code, permission_name = permission
              try:
                  model_add_perm = Permission.objects.get(name=permission_code)
              except Permission.DoesNotExist:
                  logging.warning("Permission '{}' is not found.".format(permission_code))
                  continue
              new_group.permissions.add(model_add_perm)

    print("Created default group and permissions.")
