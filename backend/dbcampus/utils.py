from django.contrib.auth.models import Group, Permission
from .permission_constants import *

PERMISSION_GROUP_SUFFIX = '_permission_group'
current_module_variables = vars()

def generate_groups_and_permission(model_name, instance_name, content_type):
    groups = current_module_variables[model_name + PERMISSION_GROUP_SUFFIX]
    for k, v in groups.items():
        try:
            group_name = instance_name+'-'+k
            group = Group.objects.create(name=group_name)
            for permission in v:
                permission_codename = instance_name+permission[0]
                permission_name = instance_name+permission[1]
                permission, created = Permission.objects.get_or_create(codename=permission_codename,
                                                                       name=permission_name,
                                                                       content_type=content_type)
                group.permissions.add(permission)
        except Exception as e:
            raise e
