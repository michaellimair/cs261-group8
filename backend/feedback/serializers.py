from rest_framework import serializers
from .models import UserFeedback, UserFeedbackReply
from users.serializers import UserSerializer

class UserFeedbackReplySerializer(serializers.ModelSerializer):
  admin = UserSerializer(
    read_only=True
  )

  class Meta:
    model = UserFeedbackReply
    fields=('id', 'content', 'admin', 'created', 'modified')

class UserFeedbackReplyAdminSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserFeedbackReply
    fields=('id', 'content', 'created', 'modified')
    extra_kwargs = {
      'content': { 'required': True }
    }

  def create(self, data):
    request = self.context.get("request")
    feedback = self.context.get("feedback")
    admin = request.user
    reply = UserFeedbackReply.objects.create(
      content=data['content'],
      admin=admin,
      feedback=feedback
    )

    return reply

  def update(self, instance, data):
    request = self.context.get("request")
    instance.admin = request.user
    instance.content = data['content']

    instance.save()

    return instance

class UserFeedbackSerializer(serializers.ModelSerializer):
  reply = UserFeedbackReplySerializer(
    read_only=True
  )

  class Meta:
    model = UserFeedback
    fields = ('id', 'content', 'reply', 'type', 'created', 'modified')
    extra_kwargs = {
      'content': { 'required': True },
      'type': { 'required': True },
    }

  def create(self, data):
    request = self.context.get("request")
    user = request.user
    feedback = UserFeedback.objects.create(
      content=data['content'],
      type=data['type'],
      user=user
    )

    return feedback

class UserFeedbackAdminSerializer(serializers.ModelSerializer):
  user = UserSerializer(
    read_only=True
  )
  reply = UserFeedbackReplySerializer(
    read_only=True
  )

  class Meta:
    model = UserFeedback
    fields = ('id', 'content', 'reply', 'type', 'user' , 'created', 'modified')
    extra_kwargs = {
      'content': { 'required': True },
      'type': { 'required': True },
    }
