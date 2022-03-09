from rest_framework import serializers
from .models import PlanOfAction, Milestone, Comment


class CommentMenteeSerializer(serializers.ModelSerializer):
    """
    serializer for comment to mentee's view, read only
    input plan of action id that this comment related
    """
    class Meta:
        """
        Meta data for comment
        """
        model = Comment
        fields = ('id', 'plan_of_action_id', 'content', 'created', 'modified')


class CommentMentorSerializer(serializers.ModelSerializer):
    """
    serializer for comment to mentor's view, can create
    input plan of action id that this comment related
    """
    class Meta:
        """
        Meta data for comment
        """
        model = Comment
        fields = ('id', 'plan_of_action_id', 'content', 'created', 'modified')
        extra_kwargs = {
            'plan_of_action_id': {'required': True},
            'content': {'required': True}
        }

    def create(self, validated_data):
        """
        create comment for milestone based on
        the data provided in the serializer context
        and plan of action as fk
        """
        # requests = self.context.get("request")
        comment = Comment.objects.create(
            plan_of_action=validated_data['plan_of_action_id'],
            content=validated_data['content']
        )

        return comment


class MilestoneMentorSerializer(serializers.ModelSerializer):
    """
    Serializer for milestone, mentor read only to content, can approve
    input plan of action id that this milestone related
    """

    class Meta:
        """
        Meta data for milestone
        """
        model = Milestone
        fields = ('id', 'plan_of_action_id', 'description', 'type', 'completed', 'created', 'modified')
        extra_kwargs = {
            'plan_of_action_id': {'required': True},
            'description': {'required': True},
            'type': {'required': True},
            'completed': {'required': True},
            # 'approved': {'required': True}
        }


class MilestoneMenteeSerializer(serializers.ModelSerializer):
    """
    Serializer for milestone, mentee can create, and update if it is complete
    input plan of action id that this milestone related
    """

    class Meta:
        """
        Meta data for milestone
        """
        model = Milestone
        fields = ('id', 'plan_of_action_id', 'description', 'type', 'completed', 'created', 'modified')
        extra_kwargs = {
            'plan_of_action_id': {'required': True},
            'description': {'required': True},
            'type': {'required': True},
            'completed': {'required': True},
            # 'approved': {'required': True}
        }

    def create(self, validated_data):
        """
        create milestone base on data provided
        """

        # request = self.context.get("request")
        milestone = Milestone.objects.create(
            plan_of_action_id=validated_data['plan_of_action_id'],
            description=validated_data['description'],
            type=validated_data['type'],
            #  should I don't ask them to provide completion
            #  in the first time since it always been false?
            #  already set it to false at model
            completed=False,
            # approved=False
        )

        return milestone

    def update(self, instance, validated_data):
        """
        update weather milestone is completed
        """
        # instance.plan_of_action_id = validated_data['plan_of_action_id']
        if "completed" in validated_data:
            instance.completed = validated_data['completed']
        instance.save()

        return instance


class PlanOfActionMentorSerializer(serializers.ModelSerializer):
    """
    Serializer for plan of action mentor view, with comment and milestone
    read only for content, can approve
    """

    comment = CommentMenteeSerializer(
        read_only=True
    )

    milestone = MilestoneMentorSerializer(
        read_only=True
    )

    class Meta:
        """
        Metadata for plan of action
        """
        model = PlanOfAction
        fields = (
            'id',
            'description',
            'comment',
            'milestone',
            'approved',
            'created',
            'modified'
        )
        extra_kwargs = {
            'description': {'required': True},
            'approved': {'required': True}
        }

    def update(self, instance, validated_data):
        """
        mentor can approve the plan of action
        """
        if "approved" in validated_data:
            instance.approved = validated_data['approved']

        instance.save()
        return instance


class PlanOfActionMenteeSerializer(serializers.ModelSerializer):
    """
    Serializer for plan of action mentor view, with comment and milestone, can create and update
    """

    comment = CommentMenteeSerializer(
        read_only=True
    )

    milestone = MilestoneMentorSerializer(
        read_only=True
    )

    class Meta:
        """
        Metadata for plan of action
        """
        model = PlanOfAction
        fields = (
            'id',
            'description',
            'comment',
            'milestone',
            'approved',
            'created',
            'modified'
        )
        extra_kwargs = {
            'description': {'required': True},
            'approved': {'required': True}
        }

    def create(self, validated_data):
        """
        create plan of action from validated data
        """
        # request = self.context.get("request")
        plan_of_action = PlanOfAction.objects.create(
            description=validated_data['description'],
            approved=False
        )

        return plan_of_action
