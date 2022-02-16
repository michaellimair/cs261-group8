from rest_framework import permissions
from .permission_constants import MENTEE_GROUP, MENTOR_GROUP


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class IsNotSuperuser(permissions.BasePermission):
    def has_permission(self, request, view):
        return not request.user.is_superuser


class IsMentor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name=MENTOR_GROUP).exists()


class IsMentee(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name=MENTEE_GROUP).exists()
