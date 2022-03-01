from django.db import models


class BusinessArea(models.Model):
    """Model for business area tied to a specific employee.
    Each employee can only be in one business area at a time."""
    name = models.CharField(max_length=50)
    label = models.CharField(max_length=100)
