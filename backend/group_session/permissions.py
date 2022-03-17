from rest_framework import permissions

class IsGroupSessionCreator(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        """Only creators of a group session is allowed to update it."""
        print(obj.event.hosts)
        return False
