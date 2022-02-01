from django.contrib import admin
from .models import UserProfile

class UserProfileAdmin(admin.ModelAdmin):
  list_display = ('user.first_name', 'user.last_name', 'user.username', 'user.email')

# Register your models here.
admin.site.register(UserProfile, UserProfileAdmin)
