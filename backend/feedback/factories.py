from users.factories import AdminFactory, UserFactory
import factory
from .models import UserFeedback, UserFeedbackReply

class UserFeedbackFactory(factory.django.DjangoModelFactory):
  class Meta:
    model = UserFeedback

  user = factory.SubFactory(UserFactory)
  content="Feedback Content"
  type=UserFeedback.FeedbackType.BUG

class UserFeedbackReplyFactory(factory.django.DjangoModelFactory):
  class Meta:
    model = UserFeedbackReply

  admin = factory.SubFactory(AdminFactory)
  feedback = factory.SubFactory(UserFeedbackFactory)
  content = "Feedback Reply"
