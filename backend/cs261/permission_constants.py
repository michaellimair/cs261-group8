# Derived from https://www.botreetechnologies.com/blog/django-user-groups-and-permission/

# Permissions name and code
mentor_only_permission = ('_project_can_mentor_only_permission', 'Can perform actions as mentor')
mentee_only_permission = ('_project_can_mentee_only_permission', 'Can perform actions as mentee')

# Permission list associated with groups
mentor_group_permissions = [mentor_only_permission]
mentee_group_permissions = [mentee_only_permission]

# Group names
MENTOR_GROUP = '_project_mentor_group'
MENTEE_GROUP = '_project_mentee_group'

# Group and permission list mappings
project_permission_group = {MENTOR_GROUP: mentor_group_permissions,
                            MENTEE_GROUP: mentee_group_permissions,}
