from rest_framework import viewsets, generics
from .serializers import *
from users.permissions import IsMentee, IsMentor

#  Haven't linked to pair yet, test mentor and mentee for permission first


class CommentMenteeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Mentee can only read comment
    """
    serializer_class = CommentMenteeSerializer
    permission_classes = [IsMentee]
    queryset = Comment.objects.all()


class CommentMentorView(generics.ListCreateAPIView):
    """
    Mentor can create comment
    """
    serializer_class = CommentMentorSerializer
    permission_classes = [IsMentor]
    queryset = Comment.objects.all()


class MilestoneMenteeView(generics.ListCreateAPIView, generics.UpdateAPIView):
    """
    Mentee can create and update if completed milestone
    """
    serializer_class = MilestoneMenteeSerializer
    permission_classes = [IsMentee]
    queryset = Milestone.objects.all()


class MilestoneMentorViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Mentor can only read milestone
    """
    serializer_class = MilestoneMentorSerializer
    permission_classes = [IsMentor]
    queryset = Milestone.objects.all()


class PlanOfActionMenteeView(generics.ListCreateAPIView, generics.UpdateAPIView):
    """
    Mentee can create and update plan of action
    """
    serializer_class = PlanOfActionMenteeSerializer
    permission_classes = [IsMentee]
    queryset = PlanOfAction.objects.all()


class PlanOfActionMentorView(generics.RetrieveUpdateAPIView):
    """
    Mentee can create and update plan of action
    """
    serializer_class = PlanOfActionMenteeSerializer
    permission_classes = [IsMentee]
    queryset = PlanOfAction.objects.all()
