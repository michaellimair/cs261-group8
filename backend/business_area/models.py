from django.db import models

class BusinessArea(models.Model):
  name = models.CharField(max_length=50)
  label = models.CharField(max_length=100)

