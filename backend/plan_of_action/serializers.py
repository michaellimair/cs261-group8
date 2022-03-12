from rest_framework import serializers
from .models import PlanOfAction, Milestone, Comment

class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        """Metadata for comment"""
        model = Milestone
        fields = ('id', 'title', 'description', 'completed', 'created', 'modified')

    def create(self, validated_data):
        plan_of_action = PlanOfAction.objects.get(pk=self.context["view"].kwargs["plan_of_action_pk"])
        validated_data["plan_of_action"] = plan_of_action
        return Milestone.objects.create(**validated_data)

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        """Metadata for comment"""
        model = Comment
        fields = ('id', 'content', 'created', 'modified')


    def create(self, validated_data):
        plan_of_action = PlanOfAction.objects.get(pk=self.context["view"].kwargs["plan_of_action_pk"])
        validated_data["plan_of_action"] = plan_of_action
        return Comment.objects.create(**validated_data)

class PlanOfActionSerializer(serializers.ModelSerializer):
    milestones = MilestoneSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        """Metadata for plan of action"""
        model = PlanOfAction
        fields = ('id', 'type', 'title', 'description', 'approved', 'created', 'modified', 'milestones', 'comments')

    def create(self, validated_data):
        """Create a plan of action based on provided data and data from the serializer context."""
        return PlanOfAction.objects.create(
            title=validated_data['title'],
            description=validated_data['description'],
            mentoring_pair=self.context.get("mentoring_pair")
        )
