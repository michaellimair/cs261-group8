import json
from django.shortcuts import get_object_or_404
from django.http import HttpResponseBadRequest
from django.utils.translation import gettext_lazy as _
from django.db.models import Count, Q
from django.contrib.auth import get_user_model
from django_pandas.io import read_frame
from rest_framework import mixins, viewsets
from rest_framework.response import Response
from users.models import UserProfile
from users.permission_constants import MENTOR_GROUP
from users.serializers import UserSerializer
from users.permissions import IsMentor, IsMentee
from users.utils import get_higher_titles
from .utils import match_score_it
from .models import MentoringPair
from .serializers import MentoringPairSerializer

# Create your views here.


class MenteeMatchView(
        mixins.ListModelMixin,
        mixins.CreateModelMixin,
        viewsets.GenericViewSet):
    """View related to mentee matching"""
    permission_classes = [IsMentee]
    serializer_class = MentoringPairSerializer
    def get_queryset(self):
        return MentoringPair.objects.filter(mentee=self.request.user)

    # pylint: disable=arguments-differ
    def create(self, request):
        """Initiates a match request to a mentor"""
        # If mentee already has a pending match, disallow
        if self.get_queryset().exclude(status=MentoringPair.PairStatus.REJECTED).exists():
            error = json.dumps({
                "non_field_errors": [str(_("You already have a pending match."))]
            })
            return HttpResponseBadRequest(
                content=error, content_type='application/json')

        serializer = MentoringPairSerializer(data={
            "mentor_id": request.data.get('mentor_id'),
            "mentee_id": request.user.id
        })
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class MentorMatchView(
        mixins.ListModelMixin,
        mixins.UpdateModelMixin,
        viewsets.GenericViewSet):
    """View related to mentor matching"""
    permission_classes = [IsMentor]
    serializer_class = MentoringPairSerializer

    def get_queryset(self):
        return MentoringPair.objects.filter(mentor=self.request.user)

    # pylint: disable=arguments-differ
    def partial_update(self, request, pk):
        """Update the status of a match (accept or reject)"""
        mentoring_pair = get_object_or_404(self.get_queryset(), id=pk)

        if mentoring_pair.status != MentoringPair.PairStatus.PENDING:
            error = json.dumps({"non_field_errors": [str(
                _("You are only allowed to update the status of a pending match."))]})
            return HttpResponseBadRequest(
                content=error, content_type='application/json')

        serializer = MentoringPairSerializer(
            mentoring_pair, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(update_fields=["status"])

        return Response(serializer.data)



class MenteeMatchSuggestionView(
        mixins.ListModelMixin,
        viewsets.GenericViewSet):
    """View related to providing match suggestions for mentee"""
    permission_classes = [IsMentee]

    # pylint: disable=arguments-differ
    def list(self, request):
        mentee = request.user
        mentee_profile = UserProfile.objects.filter(user=mentee).first()
        mentors_queryset = get_user_model().objects.filter(
            groups__name=MENTOR_GROUP,
            profile__years_experience__gt=mentee_profile.years_experience,
            profile__languages__overlap=mentee_profile.languages,
            profile__title__in=get_higher_titles(
                mentee_profile.title)).exclude(
            profile__business_area=mentee_profile.business_area
        ).prefetch_related('mentor_pairs').annotate(
                mentees_count=Count(
                    'mentor_pairs',
                    filter=Q(
                        mentor_pairs__status=MentoringPair.PairStatus.ACCEPTED)))

        filtered_mentors_df = read_frame(
            mentors_queryset,
            fieldnames=[
                'id',
                'profile__skills',
                'profile__languages',
                'mentees_count'])

        filtered_mentors_df = match_score_it(
            mentee_profile.skills,
            mentee_profile.languages,
            mentors=filtered_mentors_df)

        filtered_mentors_df.set_index('id', inplace=True)

        filtered_mentors_df.sort_values(by=['score', 'mentees_count'],
                       ascending=[False, True], inplace=True)

        serializer = UserSerializer(mentors_queryset, many=True)

        results = []

        data_by_id = {}

        for data in serializer.data:
            data_by_id[data.get('id')] = data

        for (mentor_id, row) in filtered_mentors_df.iterrows():
            # TODO: Add ranking for a given mentor in the ordering
            # For now, just order descending by score and
            updated_data = {
                "id": mentor_id,
                "score": row.score,
                "mentees_count": row.mentees_count,
                "mentor": data_by_id.get(mentor_id)
            }
            results.append(updated_data)

        sorted_results = sorted(
            results,
            key=lambda x: x['score'],
            reverse=True)

        return Response(sorted_results)
