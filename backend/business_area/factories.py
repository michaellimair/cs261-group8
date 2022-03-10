import factory
from .models import BusinessArea

class BusinessAreaFactory(factory.django.DjangoModelFactory):
    """
    Factory class to generate UserFeedback classes for testing.
    """
    class Meta:
        """Metadata for the user feedback generator."""
        model = BusinessArea

    name = "tech"
    label = "Technology"
