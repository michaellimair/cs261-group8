from rest_framework.generics import ListAPIView, ListCreateAPIView,\
    CreateAPIView, UpdateAPIView
from users.permissions import IsMentee, IsMentor
from .serializers import CommentMentorSerializer, CommentMenteeSerializer, \
    MilestoneMenteeSerializer, MilestoneMentorSerializer, PlanOfActionMenteeSerializer, \
    PlanOfActionMentorSerializer
from .models import Comment, Milestone, PlanOfAction

#  Haven't linked to pair yet, test mentor and mentee for permission first
# retrieve is limit to visit


class CommentMenteeView(ListAPIView):
    """
    Mentee can only read comment
    filter by plan of action
    """
    serializer_class = CommentMenteeSerializer
    permission_classes = [IsMentee]

    def get_queryset(self):
        p = self.request.query_params.get("plan_of_action")
        return Comment.objects.filter(plan_of_action=p)


class CommentMentorView(ListCreateAPIView):
    """
    Mentor can create comment
    """
    serializer_class = CommentMentorSerializer
    permission_classes = [IsMentor]
    queryset = Comment.objects.all()

    def get_queryset(self):
        p = self.request.query_params.get("plan_of_action")
        return Comment.objects.filter(plan_of_action=p)


class MilestoneMenteeView(ListCreateAPIView, CreateAPIView):
    """
    Mentee can create and update if completed milestone
    """
    serializer_class = MilestoneMenteeSerializer
    permission_classes = [IsMentee]

    def get_queryset(self):
        p = self.request.query_params.get("plan_of_action")
        return Milestone.objects.filter(plan_of_action=p)


class MilestoneMentorView(ListAPIView):
    """
    Mentor can only read milestone
    """
    serializer_class = MilestoneMentorSerializer
    permission_classes = [IsMentor]
    queryset = Milestone.objects.all()

    def get_queryset(self):
        p = self.request.query_params.get("plan_of_action")
        return Milestone.objects.filter(plan_of_action=p)


# these 2 should use pair to filter
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
    serializer_class = PlanOfActionMentorSerializer
    permission_classes = [IsMentee]
    queryset = PlanOfAction.objects.all()
