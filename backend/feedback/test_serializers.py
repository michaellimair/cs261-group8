from django.test import TestCase
from .models import UserFeedback, UserFeedbackReply
from django.contrib.auth.models import User
from rest_framework.test import force_authenticate, APIRequestFactory
import random
from .models import UserFeedback
from .serializers import UserFeedbackReplyAdminSerializer, UserFeedbackSerializer
from users.factories import UserFactory, AdminFactory
from .factories import UserFeedbackFactory

random.seed(0)

class TestUserFeedbackReplyAdminSerializer(TestCase):
  def setUp(self):
    self.user = UserFactory()
    self.admin = AdminFactory()
    self.other_admin = AdminFactory()
    self.feedback = UserFeedbackFactory(user=self.user)
    self.request = APIRequestFactory().post('fakepath')
    self.request.user = self.admin
    force_authenticate(self.request, user=self.admin)

  def test_create(self):
    data = {
      "content": "Feedback Reply Content",
    }

    serializer = UserFeedbackReplyAdminSerializer(context={
      "request": self.request,
      "feedback": self.feedback,
    })

    result = serializer.create(data)

    self.assertEqual(result.admin, self.admin)
    self.assertEqual(result.feedback, self.feedback)
    self.assertEqual(result.content, data['content'])

  def test_update(self):
    data = {
      "content": "Updated Content",
    }

    update_request = APIRequestFactory().post('fakepath')
    update_request.user = self.other_admin
    force_authenticate(update_request, user=self.other_admin)

    reply = UserFeedbackReply.objects.create(
      feedback=self.feedback,
      content="Initial Content",
      admin=self.admin
    )

    serializer = UserFeedbackReplyAdminSerializer(instance=reply, context={
      "request": update_request,
    })

    serializer.update(reply, data)

    self.assertEqual(reply.admin, self.other_admin)
    self.assertEqual(reply.content, data['content'])

class TestUserFeedbackSerializer(TestCase):
  def setUp(self):
    self.user = UserFactory()
    self.request = APIRequestFactory().post('fakepath')
    self.request.user = self.user
    force_authenticate(self.request, user=self.user)

  def test_create(self):
    data = {
      "content": "User Feedback Content",
      "type": UserFeedback.FeedbackType.IMPROVEMENT
    }

    serializer = UserFeedbackSerializer(context={
      "request": self.request,
    })

    result = serializer.create(data)

    self.assertEqual(result.user, self.user)
    self.assertEqual(result.content, data['content'])
    self.assertEqual(result.type, data['type'])
