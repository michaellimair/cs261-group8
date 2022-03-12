import json
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import force_authenticate, APIRequestFactory
from users.factories import UserFactory, UserProfileFactory, GroupFactory
from users.permissions import MENTEE_GROUP, MENTOR_GROUP
from .factories import MentoringPairFactory
from .views import MenteeMatchView, MentorMatchView, MenteeMatchSuggestionView

class TestMenteeMatchView(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.mentee_group = GroupFactory(name=MENTEE_GROUP)
        self.mentor_group = GroupFactory(name=MENTOR_GROUP)

        self.mentor = UserFactory(username="mentor")
        UserProfileFactory(user=self.mentor)
        self.mentor.groups.add(self.mentor_group)

        self.mentee = UserFactory(username="mentee")
        UserProfileFactory(user=self.mentee)
        self.mentee.groups.add(self.mentee_group)

        self.other_mentee = UserFactory(username="other_mentee")
        UserProfileFactory(user=self.other_mentee)
        self.other_mentee.groups.add(self.mentee_group)

        self.mentoring_pair = MentoringPairFactory(
            mentor=self.mentor,
            mentee=self.mentee
        )
        self.request_factory = APIRequestFactory()

    def test_create_duplicate(self):
        url = reverse('country-list')
        request = self.request_factory.post(url, data={
            "mentor_id": self.mentor.id
        })
        force_authenticate(request, user=self.mentee)

        response = MenteeMatchView.as_view({ 'post': "create" })(request)
        self.assertEqual(response.status_code, 400)

    def test_create_success(self):
        url = reverse('country-list')
        request = self.request_factory.post(url, data={
            "mentor_id": self.mentor.id
        })
        force_authenticate(request, user=self.other_mentee)

        response = MenteeMatchView.as_view({ 'post': "create" })(request)
        self.assertEqual(response.status_code, 200)
