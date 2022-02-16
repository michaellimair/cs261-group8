from .factories import UserFactory, GroupFactory
from .permission_constants import MENTEE_GROUP, MENTOR_GROUP
from django.contrib.auth.models import Group
from django.test import TestCase
from .permissions import IsOwner, IsNotSuperuser, IsMentee, IsMentor
from rest_framework.test import force_authenticate, APIRequestFactory


class PermissionedObject():
    def __init__(self, user):
        self.user = user


class PermissionTestMixIn(TestCase):
    def setUp(self):
        self.mentee_group = GroupFactory(name=MENTEE_GROUP)
        self.mentor_group = GroupFactory(name=MENTOR_GROUP)
        self.request_factory = APIRequestFactory()
        self.request = self.request_factory.get('fakepath')
        self.superuser = UserFactory(is_superuser=True)
        self.user = UserFactory(is_superuser=False)
        self.mentor = UserFactory(is_superuser=False)
        self.mentor.groups.add(self.mentor_group)
        self.mentee = UserFactory(is_superuser=False)
        self.mentee.groups.add(self.mentee_group)


class TestIsOwner(PermissionTestMixIn):
    def setUp(self) -> None:
        super().setUp()
        self.permission = IsOwner()
        self.object = PermissionedObject(self.user)

    def test_has_permission_false(self):
        force_authenticate(self.request, user=self.superuser)
        self.request.user = self.superuser

        self.assertFalse(
            self.permission.has_object_permission(
                self.request, None, self.object))

    def test_has_permission_true(self):
        force_authenticate(self.request, user=self.user)
        self.request.user = self.user

        self.assertTrue(
            self.permission.has_object_permission(
                self.request, None, self.object))


class TestIsNotSuperuser(PermissionTestMixIn):
    def setUp(self) -> None:
        super().setUp()
        self.permission = IsNotSuperuser()

    def test_has_permission_false(self):
        force_authenticate(self.request, user=self.superuser)
        self.request.user = self.superuser

        self.assertFalse(self.permission.has_permission(self.request, None))

    def test_has_permission_true(self):
        force_authenticate(self.request, user=self.user)
        self.request.user = self.user

        self.assertTrue(self.permission.has_permission(self.request, None))


class TestIsMentor(PermissionTestMixIn):
    def setUp(self) -> None:
        super().setUp()
        self.permission = IsMentor()

    def test_has_permission_false(self):
        force_authenticate(self.request, user=self.mentee)
        self.request.user = self.mentee

        self.assertFalse(self.permission.has_permission(self.request, None))

    def test_has_permission_true(self):
        force_authenticate(self.request, user=self.mentor)
        self.request.user = self.mentor

        self.assertTrue(self.permission.has_permission(self.request, None))


class TestIsMentee(PermissionTestMixIn):
    def setUp(self) -> None:
        super().setUp()
        self.permission = IsMentee()

    def test_has_permission_false(self):
        force_authenticate(self.request, user=self.mentor)
        self.request.user = self.mentor

        self.assertFalse(self.permission.has_permission(self.request, None))

    def test_has_permission_true(self):
        force_authenticate(self.request, user=self.mentee)
        self.request.user = self.mentee

        self.assertTrue(self.permission.has_permission(self.request, None))
