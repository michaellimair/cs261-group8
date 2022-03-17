from datetime import timedelta
from typing import List
from django.utils import timezone
from django.db.models import Func, F, Count
from .models import GroupSessionRequest

def get_suggestion_count(skills: List[str]):
    return (GroupSessionRequest
            .objects
            .filter(created__gt=timezone.now() - timedelta(days=30))
            .prefetch_related('requested_skills')
            .filter(requested_skills__skill__in=skills)
            .values('requested_skills__skill')
            .annotate(count=Count('requested_skills__skill'), skill=F('requested_skills__skill'))
            .values('skill', 'count')
        )
