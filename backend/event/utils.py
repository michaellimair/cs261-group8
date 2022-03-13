from django.contrib.auth.models import User
from datetime import datetime
from .models import Event
from django.db.models import Q, F

def has_clashing_events(user: User, start_time: datetime, end_time: datetime) -> bool:
    # Do not allow any overlap between events
    return Event.objects.filter(
        Q(hosts__id__contains=user.id) |
        Q(attendees__id__contains=user.id)
    ).filter(
        Q(start_time__gt=F('end_time'), start_time__lt=end_time) |
        Q(start_time__gt=F('end_time'), end_time__gt=start_time) |
        Q(start_time__lt=end_time, end_time__gt=start_time)
    ).exists()
