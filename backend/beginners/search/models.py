from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self):
        return self.title

class ExpertProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    expertise_areas = models.TextField()  # Store as comma-separated values
    bio = models.TextField()
    contact_info = models.CharField(max_length=255)
    profile_image = models.URLField(blank=True, null=True)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.title}"

    def expertise_list(self):
        return [area.strip() for area in self.expertise_areas.split(',')]

class ExpertPost(models.Model):
    expert = models.ForeignKey(ExpertProfile, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=255)
    content = models.TextField()
    topics = models.TextField()  # Store as comma-separated values
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likes = models.IntegerField(default=0)
    views = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.expert.name} - {self.title}"

    def topic_list(self):
        return [topic.strip() for topic in self.topics.split(',')]