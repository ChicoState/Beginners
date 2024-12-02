from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'content', 'video_url']

    def validate(self, data):
        if 'title' not in data or 'content' not in data:
            raise serializers.ValidationError("Title and content are required.")
        return data
