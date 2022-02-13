from django.test import TestCase
import factory
from .models import UserFeedback, UserFeedbackReply
from django.contrib.auth.models import User
from rest_framework.test import force_authenticate, APIRequestFactory
import string
import random
from .models import UserFeedback
from .serializers import UserFeedbackReplyAdminSerializer, UserFeedbackSerializer

random.seed(0)

def _generate_username() -> str:
  """
    Generates a randomized username with a length of 10
  """
  len = 10
  return ''.join(random.choices(string.ascii_uppercase + string.digits, k = len))

class UserFactory(factory.django.DjangoModelFactory):
  class Meta:
    model = User

  username = factory.LazyAttribute(lambda _: _generate_username())
  password = factory.PostGenerationMethodCall('set_password', 'testpass124')
  email = factory.LazyAttribute(lambda o: f"{o.username}@test.com")
  last_name = 'User'
  is_superuser = False

class AdminFactory(factory.django.DjangoModelFactory):
  class Meta:
    model = User

  username = factory.LazyAttribute(lambda _: _generate_username())
  email = factory.LazyAttribute(lambda o: f"{o.username}@test.com")
  password = factory.PostGenerationMethodCall('set_password', 'testsuperadmin124')
  first_name = 'Test'
  last_name = 'Superadmin'
  is_superuser = True

class UserFeedbackFactory(factory.django.DjangoModelFactory):
  class Meta:
    model = UserFeedback

  user = factory.LazyAttribute(lambda _: UserFactory())
  content="Feedback Content"
  type=UserFeedback.FeedbackType.BUG

class TestUserFeedbackReplyAdminSerializer(TestCase):
  def setUp(self):
    self.admin = AdminFactory()
    self.other_admin = AdminFactory()
    self.feedback = UserFeedbackFactory()
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
