from django.test import TestCase, Client
from .models import UserFeedback
from .views import UserFeedbackViewSet
from django.contrib.auth.models import User
from rest_framework.test import force_authenticate, APIRequestFactory
from django.urls import reverse

class TestUserFeedbackViewSet(TestCase):
  def setUp(self) -> None:
    self.username = 'testuser'
    self.password = 'testpass124'
    self.user = User.objects.create(username=self.username)
    self.user.set_password(self.password)
    self.user.save()

    self.other_username = 'testuser2'
    self.other_user = User.objects.create(username=self.other_username)
    self.other_user.set_password(self.password)
    self.other_user.save()
    self.request_factory = APIRequestFactory()

    self.feedback_content = "FeedbackContent"
    self.feedback_type = UserFeedback.FeedbackType.BUG
    self.feedback = UserFeedback.objects.create(
      user=self.user,
      content=self.feedback_content,
      type=self.feedback_type
    )
    return super().setUp()

  def test_destroy(self):
    """
    Deletion of feedback by a user should not be allowed.
    """
    feedback_id = self.feedback.id

    url = reverse('my_feedbacks-detail', kwargs={'pk': feedback_id})
    request = self.request_factory.delete(url)
    request.user = self.user
    force_authenticate(request, user=self.user)

    feedback_detail = UserFeedbackViewSet.as_view({'delete': 'destroy'})
    response = feedback_detail(request)

    self.assertEqual(response.status_code, 403)

  def test_list_otherUser(self):
    """
    Users will only by able to see their own feedbacks.
    """
    url = reverse('my_feedbacks-list')
    request = self.request_factory.get(url)
    request.user = self.other_user
    force_authenticate(request, user=self.other_user)
    feedback_list = UserFeedbackViewSet.as_view({'get': 'list'})

    response = feedback_list(request)

    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data, [])

  def test_detail_owner(self):
    """
    Users will only by access the details of a feedback created by them.
    """
    url = reverse('my_feedbacks-detail', kwargs={'pk': self.feedback.id})
    request = self.request_factory.get(url)
    request.user = self.user
    force_authenticate(request, user=self.user)
    feedback_list = UserFeedbackViewSet.as_view({'get': 'retrieve'})

    response = feedback_list(request, pk=self.feedback.id)

    self.assertEqual(response.status_code, 200)

  def test_detail_otherUser(self):
    """
    Other users will get a Not Found error when trying to access the detail of a feedback created by another user.
    """
    url = reverse('my_feedbacks-detail', kwargs={'pk': self.feedback.id})
    request = self.request_factory.get(url)
    request.user = self.other_user
    force_authenticate(request, user=self.other_user)
    feedback_list = UserFeedbackViewSet.as_view({'get': 'retrieve'})

    response = feedback_list(request, pk=self.feedback.id)

    self.assertEqual(response.status_code, 404)
