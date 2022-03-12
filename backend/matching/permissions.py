from rest_framework import permissions
from .models import MentoringPair

class IsMenteePaired(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_permission(self, request, view):
        mentee = request.user
        return MentoringPair.objects.filter(mentee=mentee, status=MentoringPair.PairStatus.ACCEPTED).exists()
