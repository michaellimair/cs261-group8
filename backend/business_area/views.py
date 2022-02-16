from django.shortcuts import render
from rest_framework import viewsets
from .serializers import BusinessAreaSerializer
from .models import BusinessArea

# Create your views here.


class BusinessAreaView(viewsets.ReadOnlyModelViewSet):
    queryset = BusinessArea.objects.all()
    serializer_class = BusinessAreaSerializer
