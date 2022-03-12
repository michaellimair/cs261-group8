from rest_framework import mixins, viewsets
from rest_framework.response import Response
from matching.models import MentoringPair
from matching.permissions import IsMenteePaired
from users.permissions import IsMentee, IsMentor
from .serializers import PlanOfActionSerializer, MilestoneSerializer, CommentSerializer
from .models import Comment, Milestone, PlanOfAction

class PlanOfActionMentorViewSet(mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    serializer_class = PlanOfActionSerializer
    permission_classes = [IsMentor]

    def get_queryset(self):
        """
        Limit queryset to feedback created by a specific user.
        """
        user = self.request.user
        mentee_id = self.request.query_params.get('mentee_id')
        return PlanOfAction.objects.filter(
            mentoring_pair__mentor=user,
            mentoring_pair__mentee_id=mentee_id
        ).order_by('modified')

class PlanOfActionMenteeViewSet(viewsets.ModelViewSet):
    serializer_class = PlanOfActionSerializer
    permission_classes = [IsMentee, IsMenteePaired]

    def get_queryset(self):
        """
        Limit queryset to feedback created by a specific user.
        """
        mentee = self.request.user
        return PlanOfAction.objects.filter(
            mentoring_pair__mentee=mentee,
        ).order_by('modified')

    def create(self, request):
        mentoring_pair = MentoringPair.objects.filter(mentee=request.user).first()
        serializer = self.serializer_class(data=request.data, context={
            "mentoring_pair": mentoring_pair,
        })
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

class MilestoneMenteeViewSet(viewsets.ModelViewSet):
    serializer_class = MilestoneSerializer
    permission_classes = [IsMentee, IsMenteePaired]

    def get_queryset(self):
        """
        Limit queryset to feedback created by a specific user.
        """
        mentee = self.request.user
        return Milestone.objects.filter(
            plan_of_action__mentoring_pair__mentee=mentee,
            plan_of_action=self.kwargs['plan_of_action_pk']
        ).order_by('modified')

class MilestoneMentorViewSet(viewsets.ReadOnlyModelViewSet):
    """Viewset for milestones of plan of action. Limits mentor to read-only permissions."""
    serializer_class = MilestoneSerializer
    permission_classes = [IsMentor]

    def get_queryset(self):
        """
        Limit queryset to feedback created by a specific user.
        """
        mentee = self.request.user
        return Comment.objects.filter(
            plan_of_action__mentoring_pair__mentee=mentee,
            plan_of_action=self.kwargs['plan_of_action_pk']
        ).order_by('modified')

class CommentMenteeViewSet(viewsets.ReadOnlyModelViewSet):
    """Viewset for comments of plan of action. Mentor can give comments to mentee."""
    serializer_class = CommentSerializer
    permission_classes = [IsMentee]

    def get_queryset(self):
        """
        Limit queryset to feedback created by a specific user.
        """
        mentor = self.request.user
        return Comment.objects.filter(
            plan_of_action__mentoring_pair__mentor=mentor,
            plan_of_action=self.kwargs['plan_of_action_pk']
        ).order_by('modified')

class CommentMentorViewSet(viewsets.ModelViewSet):
    """Viewset for comments of plan of action. Mentor can give comments to mentee."""
    serializer_class = CommentSerializer
    permission_classes = [IsMentor]

    def get_queryset(self):
        """
        Limit queryset to feedback created by a specific user.
        """
        mentor = self.request.user
        return Comment.objects.filter(
            plan_of_action__mentoring_pair__mentor=mentor,
            plan_of_action=self.kwargs['plan_of_action_pk']
        ).order_by('modified')
