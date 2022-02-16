from rest_framework import viewsets
from .serializers import BusinessAreaSerializer
from .models import BusinessArea

# Create your views here.


class BusinessAreaView(viewsets.ReadOnlyModelViewSet):
    """
    Allows read-only access to the list of available business areas.
    """
    queryset = BusinessArea.objects.all()
    serializer_class = BusinessAreaSerializer
