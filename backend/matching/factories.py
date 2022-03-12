import factory
from users.factories import UserFactory
from .models import MentoringPair


class MentoringPairFactory(factory.django.DjangoModelFactory):
    """
    Factory class to generate UserFeedback classes for testing.
    """
    class Meta:
        """Metadata for the user feedback generator."""
        model = MentoringPair

    mentor = factory.SubFactory(UserFactory)
    mentee = factory.SubFactory(UserFactory)
    status = MentoringPair.PairStatus.ACCEPTED
