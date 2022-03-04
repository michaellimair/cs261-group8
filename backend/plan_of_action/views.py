from rest_framework.generics import *
from .serializers import *
from users.permissions import IsMentee, IsMentor

#  Haven't linked to pair yet, test mentor and mentee for permission first
# retrieve is limit to visit


class CommentMenteeView(ListAPIView):
    """
    Mentee can only read comment
    """
    serializer_class = CommentMenteeSerializer
    permission_classes = [IsMentee]

class CommentMentorView(ListCreateAPIView):
    """
    Mentor can create comment
    """
    serializer_class = CommentMentorSerializer
    permission_classes = [IsMentor]
    queryset = Comment.objects.all()


class MilestoneMenteeView(ListCreateAPIView, CreateAPIView):
    """
    Mentee can create and update if completed milestone
    """
    serializer_class = MilestoneMenteeSerializer
    permission_classes = [IsMentee]
    queryset = Milestone.objects.all()


class MilestoneMentorView(ListAPIView):
    """
    Mentor can only read milestone
    """
    serializer_class = MilestoneMentorSerializer
    permission_classes = [IsMentor]
    queryset = Milestone.objects.all()


class PlanOfActionMenteeView(ListCreateAPIView, UpdateAPIView):
    """
    Mentee can create and update plan of action
    """
    serializer_class = PlanOfActionMenteeSerializer
    permission_classes = [IsMentee]
    queryset = PlanOfAction.objects.all()


class PlanOfActionMentorView(ListAPIView, UpdateAPIView):
    """
    Mentor can update plan of action
    """
    serializer_class = PlanOfActionMenteeSerializer
    permission_classes = [IsMentee]
    queryset = PlanOfAction.objects.all()
