from rest_framework import permissions
from .permission_constants import MENTEE_GROUP, MENTOR_GROUP

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class IsNotSuperuser(permissions.BasePermission):
    def has_permission(self, request, view):
        return not request.user.is_superuser

    def has_object_permission(self, request, view, obj):
        return super().has_object_permission(request, view, obj)

class IsMentor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name=MENTOR_GROUP).exists()

    def has_object_permission(self, request, view, obj):
        return super().has_object_permission(request, view, obj)

class IsMentee(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name=MENTEE_GROUP).exists()

    def has_object_permission(self, request, view, obj):
        return super().has_object_permission(request, view, obj)
