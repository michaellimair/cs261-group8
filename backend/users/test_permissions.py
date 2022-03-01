from django.test import TestCase
from rest_framework.test import force_authenticate, APIRequestFactory
from .factories import UserFactory, GroupFactory
from .permission_constants import MENTEE_GROUP, MENTOR_GROUP
from .permissions import IsOwner, IsNotSuperuser, IsMentee, IsMentor


# pylint: disable=too-few-public-methods
class PermissionedObject():
    """
    Sample class for object which is permissioned to a specific user.
    """
    def __init__(self, user):
        self.user = user


class PermissionTestMixIn(TestCase):
    """
    Mixin which provides preset variables to all the test cases which uses it.
    """
    def setUp(self):
        self.mentee_group = GroupFactory(name=MENTEE_GROUP)
        self.mentor_group = GroupFactory(name=MENTOR_GROUP)
        self.request_factory = APIRequestFactory()
        self.request = self.request_factory.get('fakepath')
        self.superuser = UserFactory(is_superuser=True)
        self.mentor = UserFactory(is_superuser=False)
        self.mentor.groups.add(self.mentor_group)
        self.mentee = UserFactory(is_superuser=False)
        self.mentee.groups.add(self.mentee_group)


class TestIsOwner(PermissionTestMixIn):
    """
    Test class for the IsOwner permission class.
    """
    def setUp(self) -> None:
        super().setUp()
        self.permission = IsOwner()
        self.owner = self.mentor
        self.object = PermissionedObject(self.owner)

    def test_has_permission_false(self):
        """
        Users who are not owners of an object will not be granted permission for the object.
        """
        force_authenticate(self.request, user=self.superuser)
        self.request.user = self.superuser

        self.assertFalse(
            self.permission.has_object_permission(
                self.request, None, self.object))

    def test_has_permission_true(self):
        """
        Owners of objects will be granted permission to the object.
        """
        force_authenticate(self.request, user=self.owner)
        self.request.user = self.owner

        self.assertTrue(
            self.permission.has_object_permission(
                self.request, None, self.object))


class TestIsNotSuperuser(PermissionTestMixIn):
    """
    Test class for the IsNotSuperuser permission class.
    """
    def setUp(self) -> None:
        super().setUp()
        self.permission = IsNotSuperuser()

    def test_has_permission_false(self):
        """
        Superusers will not be granted permission.
        """
        force_authenticate(self.request, user=self.superuser)
        self.request.user = self.superuser

        self.assertFalse(self.permission.has_permission(self.request, None))

    def test_has_permission_true(self):
        """
        Non-superusers will be granted permission.
        """
        force_authenticate(self.request, user=self.mentor)
        self.request.user = self.mentor

        self.assertTrue(self.permission.has_permission(self.request, None))


class TestIsMentor(PermissionTestMixIn):
    """
    Test class for the IsMentor permission class.
    """
    def setUp(self) -> None:
        super().setUp()
        self.permission = IsMentor()

    def test_has_permission_false(self):
        """
        Non-mentors will be denied permission.
        """
        force_authenticate(self.request, user=self.mentee)
        self.request.user = self.mentee

        self.assertFalse(self.permission.has_permission(self.request, None))

    def test_has_permission_true(self):
        """
        Mentors will be granted permission.
        """
        force_authenticate(self.request, user=self.mentor)
        self.request.user = self.mentor

        self.assertTrue(self.permission.has_permission(self.request, None))


class TestIsMentee(PermissionTestMixIn):
    """
    Test class for the IsMentee permission class.
    """
    def setUp(self) -> None:
        super().setUp()
        self.permission = IsMentee()

    def test_has_permission_false(self):
        """
        Users who are not mentees will be denied permission.
        """
        force_authenticate(self.request, user=self.mentor)
        self.request.user = self.mentor

        self.assertFalse(self.permission.has_permission(self.request, None))

    def test_has_permission_true(self):
        """
        Mentees will be granted permission.
        """
        force_authenticate(self.request, user=self.mentee)
        self.request.user = self.mentee

        self.assertTrue(self.permission.has_permission(self.request, None))
