from django.test import TestCase
from .models import Todo

class TodoTestCase(TestCase):
  def setUp(self):
    self.todo = Todo.objects.create(title="Todo1", subtitle="TodoSubtitle", description="TodoDescription", completed=False)

  def test_str(self):
    """Todo objects have a proper string representation"""
    self.assertEqual(str(self.todo), "Todo1")

  def test_describe(self):
    """Todo objects are described properly"""
    self.assertEqual(self.todo.describe(), "Todo1: TodoSubtitle")
