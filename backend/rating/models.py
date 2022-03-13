from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models import Avg

class MentorRating(models.Model):
    mentor = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, related_name="rating")
    rating = models.DecimalField(validators=[MinValueValidator(1), MaxValueValidator(5)], null=True, decimal_places=2, max_digits=3)
    rating_count = models.IntegerField(validators=[MinValueValidator(0)], default=0)

class MentorRatingEntry(models.Model):
    mentor_rating = models.ForeignKey(MentorRating, on_delete=models.CASCADE, related_name="entries")
    mentee = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    rating_value = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    description = models.TextField(null=True)

@receiver(post_save, sender=MentorRatingEntry)
def calculate_mentor_rating(sender, instance, **kwargs):
    query_set = MentorRatingEntry.objects.filter(mentor_rating=instance.mentor_rating)
    rating_count = query_set.count()
    rating = query_set.all().aggregate(Avg('rating_value'))

    mentor_rating: MentorRating = instance.mentor_rating
    mentor_rating.rating_count = rating_count
    mentor_rating.rating = rating['rating_value__avg']

    mentor_rating.save()
