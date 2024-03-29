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
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.schemas import get_schema_view
from rest_framework_nested import routers
from language.views import LanguageViewSet
from timezone.views import TimezoneViewSet
from skill.views import SkillViewSet

from feedback.views import (
    UserFeedbackViewSet,
    UserFeedbackAdminViewSet,
    UserFeedbackAdminReplyView,
)
from users.views import (
    RegisterView,
    MyDataView,
    LoginView,
    GroupView,
    UserProfileViewSet,
)
from business_area.views import BusinessAreaView
from matching.views import (
    MenteeMatchView,
    MenteeMyMentorView,
    MentorMatchView,
    MenteeMatchSuggestionView,
)
from event.views import EventViewSet
from country.views import CountryViewSet
from plan_of_action.views import (
    PlanOfActionMentorViewSet,
    PlanOfActionMenteeViewSet,
    MilestoneMenteeViewSet,
    MilestoneMentorViewSet,
    CommentMenteeViewSet,
    CommentMentorViewSet,
)
from meeting.views import (
    MeetingMenteeViewSet,
    MeetingMentorViewSet,
    MeetingRecordMenteeViewSet
)
from rating.views import (
    MenteeRatingViewSet
)
from group_session.views import (
    GroupSessionMenteeSignupViewSet,
    GroupSessionMenteeViewSet,
    GroupSessionMentorViewSet,
    GroupSessionRequestMenteeViewSet,
    GroupSessionSuggestionsMentorViewSet,
)

user_patterns = [
    path(
        r'<int:user_pk>/profile/',
        UserProfileViewSet.as_view({
            'get': 'retrieve',
            'patch': 'update',
        }),
        name="my_profile"),
]

router = routers.DefaultRouter()
router.register(r'feedbacks', UserFeedbackViewSet, basename='my_feedbacks')
router.register(r'business-areas', BusinessAreaView, basename='business_area')
router.register(r'profiles', UserProfileViewSet, basename='profile')
router.register(r'countries', CountryViewSet, basename='country')
router.register(r'languages', LanguageViewSet, basename='language')
router.register(r'timezones', TimezoneViewSet, basename='timezone')
router.register(r'events', EventViewSet, basename='event')
router.register(r'skills', SkillViewSet, basename='skill')

router.register(r'mentee/meetings', MeetingMenteeViewSet, basename='mentee_meeting')
meeting_mentee_router = routers.NestedSimpleRouter(router, r'mentee/meetings', lookup='meeting')
meeting_mentee_router.register(r'records', MeetingRecordMenteeViewSet, basename='meeting-mentee-records')

router.register(r'mentee/matches', MenteeMatchView, basename='mentee_matches')
router.register(r'mentee/match-suggestions',
    MenteeMatchSuggestionView,
    basename='mentee_match_suggestions')
router.register(r'mentee/my-mentor', MenteeMyMentorView, basename='mentee_my_mentor')
router.register(r'mentee/my-mentor/rating', MenteeRatingViewSet, basename='mentee_my_mentor_rating')
router.register(r'mentee/group-sessions', GroupSessionMenteeViewSet, basename='mentee_group_sessions')
router.register(r'mentee/group-sessions/request-session', GroupSessionRequestMenteeViewSet, basename='mentee_group_session_request')
router.register(r'mentee/group-sessions/<int:pk>/signup', GroupSessionMenteeSignupViewSet, basename='mentor_group_session_signup')
router.register(r'mentee/plans-of-action', PlanOfActionMenteeViewSet, basename='mentee_plans_of_action')

router.register(r'mentor/matches', MentorMatchView, basename='mentor_matches')
router.register(r'mentor/plans-of-action', PlanOfActionMentorViewSet, basename='mentor_plans_of_action')
router.register(r'mentor/meetings', MeetingMentorViewSet, basename='mentor_meeting')
router.register(r'mentor/group-sessions/suggestions', GroupSessionSuggestionsMentorViewSet, basename='mentor_group_session_suggestions')
router.register(r'mentor/group-sessions', GroupSessionMentorViewSet, basename='mentor_group_sessions')

plan_of_action_mentee_router = routers.NestedSimpleRouter(router, r'mentee/plans-of-action', lookup='plan_of_action')
plan_of_action_mentee_router.register(r'milestones', MilestoneMenteeViewSet, basename='plan_of_action-mentee-milestones')
plan_of_action_mentee_router.register(r'comments', CommentMenteeViewSet, basename='plan_of_action-mentee-milestones')

plan_of_action_mentor_router = routers.NestedSimpleRouter(router, r'mentor/plans-of-action', lookup='plan_of_action')
plan_of_action_mentor_router.register(r'milestones', MilestoneMentorViewSet, basename='plan_of_action-mentor-milestones')
plan_of_action_mentor_router.register(r'comments', CommentMentorViewSet, basename='plan_of_action-mentee-comments')

admin_router = routers.DefaultRouter()
admin_router.register(r'feedbacks', UserFeedbackAdminViewSet)

admin_feedback_router = routers.NestedSimpleRouter(admin_router, r'feedbacks', lookup='feedback')

admin_patterns = [
    re_path(r'', include(admin_router.urls)),
    path(
        'feedbacks/<int:feedback_pk>/reply',
        UserFeedbackAdminReplyView.as_view(),
        name="admin_feedback_reply")
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include([
        path('', include(router.urls)),
        path(r'', include(plan_of_action_mentee_router.urls)),
        path(r'', include(plan_of_action_mentor_router.urls)),
        path(r'', include(meeting_mentee_router.urls)),
        path(r'groups/', GroupView.as_view(), name='group'),
        path(r'auth/', MyDataView.as_view(), name='me'),
        path(r'auth/login/', LoginView.as_view(), name='knox_login'),
        path(r'auth/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
        path(r'auth/logout-all/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
        path(r'auth/register/', RegisterView.as_view(), name='auth_register'),
        re_path(r'^users/', include(user_patterns)),
        path('openapi', get_schema_view(
            title="Mentoring API Documentation",
            description="API documentation for the Mentoring project.",
            version="1.0.0"
        ), name='openapi-schema'),
        re_path(r'^admin/', include(admin_patterns)),
    ]))
]
