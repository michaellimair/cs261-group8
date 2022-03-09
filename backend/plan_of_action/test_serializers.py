from django.test import TestCase
from .models import PlanOfAction
from .serializers import CommentMentorSerializer, MilestoneMenteeSerializer, PlanOfActionMentorSerializer,\
    PlanOfActionMenteeSerializer


class TestPlanOfActionMentee(TestCase):
    """
    Test for mentee to create plan of action
    """

    def test_create(self):
        """
        Test creation of plan of action
        """
        data = {
            "description": "test"
        }
        serializer = PlanOfActionMenteeSerializer()
        result = serializer.create(data)

        self.assertEqual(result.description, data['description'])
        # approved should be false
        self.assertFalse(result.approved)


class TestPlanOfActionMentor(TestCase):
    """
    Test if mentor can approve plan of action
    """

    def test_update(self):
        """
        Test if mentor can approve plan of action
        """
        init = PlanOfAction.objects.create(
            description="init",
            approved=False
        )
        data = {
            "approved": True
        }

        serializer = PlanOfActionMentorSerializer(instance=init)
        serializer.update(init, data)

        self.assertTrue(init.approved)
        self.assertEqual(init.description, "init")


class TestCommentMentor(TestCase):
    """
    Testing for comment
    """
    def test_create(self):
        """
        test mentor create comment
        """
        init = PlanOfAction.objects.create(
            description="init",
            approved=False
        )

        data = {
            "plan_of_action_id": init.id,
            "content": "Test data"
        }

        serializer = CommentMentorSerializer()
        result = serializer.create(data)

        self.assertEqual(result.content, data['content'])


class TestMilestoneMentee(TestCase):
    """
    Testing for mentee milestone creation and update completion
    """

    def setUp(self):
        """
        create plan of action get id
        """
        init = PlanOfAction.objects.create(
            description="init",
            approved=False
        )
        self.pid = init.id

    def test_create(self):
        """
        Creation for milestone
        """
        data = {
            "plan_of_action_id": self.pid,
            "description": "test milestone",
            "type": "personal"
        }

        serializer = MilestoneMenteeSerializer()
        result = serializer.create(data)

        self.assertEqual(result.description, data['description'])
        self.assertEqual(result.type, data['type'])
        # completion should be false
        self.assertFalse(result.completed)

    def test_update(self):
        """
        Test if mentee can mark milestone to complete
        """

        init_data = {
            "plan_of_action_id": self.pid,
            "description": "test milestone",
            "type": "personal"
        }

        serializer = MilestoneMenteeSerializer()
        result = serializer.create(init_data)
        data = {
            "completed": True
        }
        serializer.update(result, data)
        self.assertTrue(result.completed)
