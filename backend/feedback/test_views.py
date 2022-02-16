import json
from django.test import TestCase, Client
from .models import UserFeedback, UserFeedbackReply
from .views import UserFeedbackAdminReplyView, UserFeedbackViewSet
from django.contrib.auth.models import User
from rest_framework.test import force_authenticate, APIRequestFactory
from django.urls import reverse
from .factories import UserFeedbackFactory, UserFeedbackReplyFactory
from users.factories import AdminFactory, UserFactory
from django.utils.translation import gettext_lazy as _

class TestUserFeedbackViewSet(TestCase):
  def setUp(self) -> None:
    self.user = UserFactory()
    self.other_user = UserFactory()
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

class TestUserFeedbackAdminReplyView(TestCase):
  def setUp(self) -> None:
    self.admin = AdminFactory()
    self.other_admin = AdminFactory()
    self.feedback = UserFeedbackFactory()
    self.feedback_reply = UserFeedbackReplyFactory(feedback=self.feedback, admin=self.admin)
    self.feedback_noreply = UserFeedbackFactory()
    self.request_factory = APIRequestFactory()
    self.view = UserFeedbackAdminReplyView.as_view()

  def _authenticate(self, request):
    request.user = self.admin
    force_authenticate(request, user=self.admin)

  def test_post_nofeedback(self):
    """
    Attempting to reply to a nonexistent feedback should result in a 404 status code.
    """
    url = reverse('admin_feedback_reply', kwargs={'feedback_pk': 333})
    request = self.request_factory.post(url)
    self._authenticate(request)
    response = self.view(request, feedback_pk=333)
    self.assertEqual(response.status_code, 404)

  def test_post_invalid(self):
    """
    Invalid feedback (feedback without content field) will not pass through.
    """
    url = reverse('admin_feedback_reply', kwargs={'feedback_pk': self.feedback_noreply.id})
    request = self.request_factory.post(url)
    self._authenticate(request)
    response = self.view(request, feedback_pk=self.feedback_noreply.id)
    self.assertEqual(response.status_code, 400)
    self.assertEqual(response.data["content"][0].title(), "This Field Is Required.")

  def test_post_hasfeedback(self):
    """
    Attempting to reply to a feedback that already has a reply should result in a bad request error.
    """
    url = reverse('admin_feedback_reply', kwargs={'feedback_pk': self.feedback.id})
    request = self.request_factory.post(url, {"content": "anything"})
    self._authenticate(request)
    response = self.view(request, feedback_pk=self.feedback.id)
    self.assertEqual(response.status_code, 400)
    # For some reason, APIRequestFactory is returning the HttpResponseBadRequest class instead of a normal response object
    # Use this as workaround 
    self.assertEqual(json.loads(response.content)['non_field_errors'][0], _("reply_once_only"))

  def test_post_success(self):
    """
    Attempting to reply to a feedback that already has a reply should result in a bad request error.
    """
    url = reverse('admin_feedback_reply', kwargs={'feedback_pk': self.feedback_noreply.id})
    request = self.request_factory.post(url, {"content": "anything"})
    self._authenticate(request)
    response = self.view(request, feedback_pk=self.feedback_noreply.id)
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data, {
      "content": "anything",
    })

  def test_patch_nofeedback(self):
    """
    Attempting to reply to a nonexistent feedback should result in a 404 status code.
    """
    url = reverse('admin_feedback_reply', kwargs={'feedback_pk': 333})
    request = self.request_factory.patch(url)
    self._authenticate(request)
    response = self.view(request, feedback_pk=333)
    self.assertEqual(response.status_code, 404)

  def test_patch_noreply(self):
    """
    Attempting to reply to a nonexistent feedback should result in a 404 status code.
    """
    url = reverse('admin_feedback_reply', kwargs={'feedback_pk': self.feedback_noreply.id})
    request = self.request_factory.patch(url)
    self._authenticate(request)
    response = self.view(request, feedback_pk=self.feedback_noreply.id)
    self.assertEqual(response.status_code, 404)

  def test_patch_success(self):
    """
    Should perform feedback reply content update successfully.
    """
    url = reverse('admin_feedback_reply', kwargs={'feedback_pk': self.feedback.id})
    request = self.request_factory.patch(url, {"content": "updated"})
    self._authenticate(request)
    response = self.view(request, feedback_pk=self.feedback.id)
    self.assertEqual(response.status_code, 200)
    self.assertEqual(UserFeedbackReply.objects.get(pk=self.feedback_reply.id).content, "updated")

  def test_delete_nofeedback(self):
    """
    Attempts to delete a reply for an invalid feedback should return 404.
    """
    url = reverse('admin_feedback_reply', kwargs={'feedback_pk': 333})
    request = self.request_factory.delete(url)
    self._authenticate(request)
    response = self.view(request, feedback_pk=333)
    self.assertEqual(response.status_code, 404)

  def test_delete_nofeedback(self):
    """
    Attempts to delete a reply for a feedback without a reply should return 404.
    """
    url = reverse('admin_feedback_reply', kwargs={'feedback_pk': self.feedback_noreply.id})
    request = self.request_factory.delete(url)
    self._authenticate(request)
    response = self.view(request, feedback_pk=333)
    self.assertEqual(response.status_code, 404)

  def test_delete_success(self):
    """
    Feedback should be deleted successfully.
    """
    url = reverse('admin_feedback_reply', kwargs={'feedback_pk': self.feedback_reply.id})
    request = self.request_factory.delete(url)
    self._authenticate(request)
    response = self.view(request, feedback_pk=self.feedback.id)
    self.assertEqual(response.status_code, 204)
    self.assertFalse(UserFeedbackReply.objects.filter(pk=self.feedback_reply.id).exists())
