from rest_framework import serializers

from matching.models import MentoringPair
from django.core.validators import MinValueValidator, MaxValueValidator

from .models import MentorRating, MentorRatingEntry

class MentorRatingSerializer(serializers.ModelSerializer):
    class Meta:
        """Metadata for mentor rating"""
        model = MentorRating
        fields = ('rating', 'rating_count')

class MentorRatingEntrySerializer(serializers.ModelSerializer):
    rating_value = serializers.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    class Meta:
        """Metadata for mentor rating entry"""
        model = MentorRatingEntry
        fields = ('id', 'rating_value', 'description')

    def create(self, validated_data):
        user = self.context.get("request").user
        mentoring_pair = MentoringPair.objects.filter(mentee=user, status=MentoringPair.PairStatus.ACCEPTED).first()
        mentor_rating = MentorRating.objects.filter(mentor=mentoring_pair.mentor).first()
        data = validated_data.copy()
        data['mentor_rating'] = mentor_rating
        data['mentee'] = user

        existing_entry = MentorRatingEntry.objects.filter(mentor_rating=mentor_rating, mentee=user).first()

        if existing_entry:
            return super().update(existing_entry, validated_data)

        return super().create(data)
