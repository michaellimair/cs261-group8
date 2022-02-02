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
from django.contrib import admin
from knox import views as knox_views
from django.urls import path, include
from dbcampus.views import RegisterView, MyDataView, LoginView
from rest_framework import routers
from rest_framework.schemas import get_schema_view

router = routers.DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/me', MyDataView.as_view(), name='me'),
    path('api/login', LoginView.as_view(), name='knox_login'),
    path('api/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/logout-all', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    path('api/register', RegisterView.as_view(), name='auth_register'),
    path('openapi', get_schema_view(
        title="DBCampus API Documentation",
        description="API documentation for the DBCampus project.",
        version="1.0.0"
    ), name='openapi-schema'),
]
