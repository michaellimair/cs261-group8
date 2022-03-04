from rest_framework import serializers
from users.serializers import UserSerializer
from .models import UserFeedback, UserFeedbackReply


class UserFeedbackReplySerializer(serializers.ModelSerializer):
    """Serializer for user feedback replies."""
    admin = UserSerializer(
        read_only=True
    )

    class Meta:
        """Metadata for user feedback reply serializer."""
        model = UserFeedbackReply
        fields = ('id', 'content', 'admin', 'created', 'modified')


class UserFeedbackReplyAdminSerializer(serializers.ModelSerializer):
    """Serializer for user feedback replies which are shown for administrators."""
    admin = UserSerializer(
        read_only=True
    )

    class Meta:
        """Metadata for admin user feedback reply serializer."""
        model = UserFeedbackReply
        fields = ('id', 'admin', 'content', 'created', 'modified')
        extra_kwargs = {
            'content': {'required': True}
        }

    def create(self, validated_data):
        """Create a reply for a user feedback based on
        the data provided in the serializer context."""
        request = self.context.get("request")
        feedback = self.context.get("feedback")
        admin = request.user
        reply = UserFeedbackReply.objects.create(
            content=validated_data['content'],
            admin=admin,
            feedback=feedback
        )

        return reply

    def update(self, instance, validated_data):
        request = self.context.get("request")
        instance.admin = request.user
        if "content" in validated_data:
            instance.content = validated_data['content']

        instance.save()

        return instance


class UserFeedbackSerializer(serializers.ModelSerializer):
    """Serializer for user feedbacks."""
    reply = UserFeedbackReplySerializer(
        read_only=True
    )

    class Meta:
        """Metadata for user feedback serializer."""
        model = UserFeedback
        fields = ('id', 'title', 'content', 'reply', 'type', 'created', 'modified')
        extra_kwargs = {
            'content': {'required': True},
            'type': {'required': True},
        }

    def create(self, validated_data):
        """Create a feedback based on provided data and data from the serializer context."""
        request = self.context.get("request")
        user = request.user
        feedback = UserFeedback.objects.create(
            content=validated_data['content'],
            type=validated_data['type'],
            title=validated_data['title'],
            user=user
        )

        return feedback


class UserFeedbackAdminSerializer(serializers.ModelSerializer):
    """Serializers for user feedbacks which are shown for administrators."""
    user = UserSerializer(
        read_only=True
    )
    reply = UserFeedbackReplySerializer(
        read_only=True
    )

    class Meta:
        """Metadata for admin user feedback serializer."""
        model = UserFeedback
        fields = (
            'id',
            'title',
            'content',
            'reply',
            'type',
            'user',
            'created',
            'modified')
        extra_kwargs = {
            'content': {'required': True},
            'type': {'required': True},
        }
