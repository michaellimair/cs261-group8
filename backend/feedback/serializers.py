from rest_framework import serializers
from .models import UserFeedback, UserFeedbackReply

class UserFeedbackReplySerializer(serializers.ModelSerializer):
  class Meta:
    model = UserFeedbackReply
    fields=('id', 'content', 'admin')

class UserFeedbackSerializer(serializers.ModelSerializer):
  reply = UserFeedbackReplySerializer(
    read_only=True
  )

  class Meta:
    model = UserFeedback
    fields = ('id', 'content', 'reply', 'type')
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
