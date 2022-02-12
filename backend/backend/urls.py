"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from knox import views as knox_views
from django.urls import path, include, re_path
from feedback.views import UserFeedbackViewSet, UserFeedbackAdminViewSet
from cs261.views import RegisterView, MyDataView, LoginView, BusinessAreaView, GroupView
from rest_framework import routers
from rest_framework.schemas import get_schema_view
from django.contrib import admin

router = routers.DefaultRouter()
router.register(r'feedbacks', UserFeedbackViewSet, basename='my_feedbacks')

admin_router = routers.DefaultRouter()
admin_router.register(r'feedbacks', UserFeedbackAdminViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include([
        path('', include(router.urls)),
        path('groups', GroupView.as_view(), name='group'),
        path('business-areas', BusinessAreaView.as_view({'get': 'list'}), name='business_area'),
        path('auth', MyDataView.as_view(), name='me'),
        path('auth/login', LoginView.as_view(), name='knox_login'),
        path('auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
        path('auth/logout-all', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
        path('auth/register', RegisterView.as_view(), name='auth_register'),
        path('openapi', get_schema_view(
            title="Mentoring API Documentation",
            description="API documentation for the Mentoring project.",
            version="1.0.0"
        ), name='openapi-schema'),
        re_path(r'^admin/', include(admin_router.urls))
    ]))
]
