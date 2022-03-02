from rest_framework import serializers
from .models import PlanOfAction, MileStone, Comment


class CommentMenteeSerializer(serializers.ModelSerializer):
    """
    serializer for comment to mantee's view, read only
    """
    class Meta:
        """
        Meta data for comment
        """
        model = Comment
        fields = ('id', 'content', 'milestone', 'created', 'modified')


class CommentMentorSerializer(serializers.ModelSerializer):
    """
    serializer for comment to mentor's view, can create
    """
    class Meta:
        """
        Meta data for comment
        """
        model = Comment
        fields = ('id', 'content', 'milestone', 'created', 'modified')
        extra_kwargs = {
            'content': {'required': True}
        }

    def create(self, validated_data):
        """
        create comment for milestone based on
        the data provided in the serializer context
        """
        requests = self.context.get("request")
        milestone = validated_data['milestone']
        comment = Comment.objects.create(
            milestone=milestone,
            content=validated_data['content']
        )

        return comment


class MilestoneMentorSerializer(serializers.ModelSerializer):
    """
    Serializer for milestone, mentor read only
    """
    comment = CommentMenteeSerializer(
        read_only=True
    )

    class Meta:
        """
        Meta data for milestone
        """
        model = MileStone
        fields = ('id', 'description', 'dateRecorded', 'planOfAction', 'completed', 'created', 'modified')
        extra_kwargs = {
            'description': {'required': True},
            'completed': {'required': True}
        }

class MilestoneMenteeSerializer(serializers.ModelSerializer):
    """
    Serializer for milestone, mentee can create, and update if it is complete
    """
    comment = CommentMenteeSerializer(
        read_only=True
    )

    class Meta:
        """
        Meta data for milestone
        """
        model = MileStone
        fields = ('id', 'description', 'dateRecorded', 'planOfAction', 'completed', 'created', 'modified')
        extra_kwargs = {
            'description': {'required': True},
            'completed': {'required': True}
        }

    def create(self, validated_data):
        """
        create milestone base on data provided
        """

        request = self.context.get("request")
        milestone = MileStone.objects.create(
            description=validated_data['description'],
            ## may need to add default current time here?
            dateRecorded=validated_data['dateRecorded'],
            completed=False
        )

        return milestone

    def update(self, instance, validated_data):
        """
        update weather milestone is completed
        """
        request = self.context.get("request")
        if "completed" in validated_data:
            instance.completed = validated_data['completed']

        instance.save()

        return instance



