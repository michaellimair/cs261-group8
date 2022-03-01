import factory
from users.factories import AdminFactory, UserFactory
from .models import UserFeedback, UserFeedbackReply


class UserFeedbackFactory(factory.django.DjangoModelFactory):
    """
    Factory class to generate UserFeedback classes for testing.
    """
    class Meta:
        """Metadata for the user feedback generator."""
        model = UserFeedback

    user = factory.SubFactory(UserFactory)
    content = "Feedback Content"
    type = UserFeedback.FeedbackType.BUG


class UserFeedbackReplyFactory(factory.django.DjangoModelFactory):
    """
    Factory class to generate UserFeedbackReply classes for testing.
    """
    class Meta:
        """
        Metadata for the reply generator.
        """
        model = UserFeedbackReply

    admin = factory.SubFactory(AdminFactory)
    feedback = factory.SubFactory(UserFeedbackFactory)
    content = "Feedback Reply"
