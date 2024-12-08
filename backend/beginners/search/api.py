# api.py in backend/search/api.py

import os
from ninja import NinjaAPI
from django.db.models import Q
from django.contrib.auth.models import User
from .models import Post, ExpertProfile, ExpertPost
from .schemas import (
    PostSchema, CreatePostSchema, DeletePostResponseSchema,
    LearningStepsSchema, LearningStepsResponseSchema,
    ExpertProfileSchema, ExpertPostSchema, CreateExpertProfileSchema,
    CreateExpertPostSchema, ExpertSearchResponseSchema
)
import anthropic
import traceback
import re

api = NinjaAPI()
client = anthropic.Client(
    api_key=os.getenv('ANTHROPIC_API_KEY')
)

# Fetch all posts
@api.get("/posts", response=list[PostSchema])
def get_posts(request):
    posts = Post.objects.all()
    return posts

# Create a new post
@api.post("/posts", response=PostSchema)
def create_post(request, post: CreatePostSchema):
    print(f"Received data: {post}")  # Log the incoming data
    try:
        new_post = Post.objects.create(
            title=post.title,
            content=post.content
        )
        return PostSchema.from_orm(new_post)
    except Exception as e:
        print(f"Error creating post: {e}")  # Log any error
        raise e

# Delete a post
@api.delete("/posts/{post_id}", response=DeletePostResponseSchema)
def delete_post(request, post_id: int):
    try:
        post = Post.objects.get(id=post_id)
        post.delete()
        return DeletePostResponseSchema(id=post_id, status="success", message="Post deleted successfully!")
    except Post.DoesNotExist:
        return DeletePostResponseSchema(id=post_id, status="error", message="Post not found.")

@api.post("/learning-steps", response=LearningStepsResponseSchema)
def get_learning_steps(request, query: LearningStepsSchema):
    """Get beginner learning steps for a topic using Anthropic's API."""
    try:
        print(f"Calling Anthropic API for topic: {query.topic}")
        
        message = client.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=300,
            system="You are a helpful teaching assistant. Provide exactly 5 concise, practical steps for beginners to learn new topics. Format as a numbered list.",
            messages=[{
                "role": "user",
                "content": f"Give me 5 beginner-friendly steps to start learning {query.topic}. Keep each step short and actionable."
            }]
        )
        
        # Extract steps using regex pattern for numbered lists
        content = message.content[0].text if isinstance(message.content, list) else message.content
        steps = []
        
        # Try to find numbered steps (1. 2. 3. etc)
        numbered_steps = re.findall(r'\d+\.\s*([^\n]+)', content)
        if numbered_steps:
            steps = numbered_steps
        else:
            # Fallback to looking for bullet points
            bullet_steps = [
                line.strip().replace('• ', '').replace('* ', '')
                for line in content.split('\n')
                if line.strip().startswith(('•', '*'))
            ]
            if bullet_steps:
                steps = bullet_steps
            else:
                # Last resort: split by newlines and clean up
                steps = [
                    line.strip()
                    for line in content.split('\n')
                    if line.strip() and not line.strip().lower().startswith(('here', 'these'))
                ][:5]

        # Ensure we have exactly 5 steps
        steps = steps[:5]
        while len(steps) < 5:
            steps.append(f"Step {len(steps) + 1}: Continue practicing and learning more advanced concepts")

        return LearningStepsResponseSchema(
            success=True,
            steps=steps,
            topic=query.topic
        )

    except Exception as e:
        print(f"Error calling Anthropic API: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        return LearningStepsResponseSchema(
            success=False,
            steps=[],
            topic=query.topic,
            error=f"Failed to get learning steps: {str(e)}"
        )

# Expert Profile Endpoints
@api.post("/experts", response=ExpertProfileSchema)
def create_expert_profile(request, profile: CreateExpertProfileSchema):
    """Create a new expert profile."""
    try:
        expert = ExpertProfile.objects.create(
            user=request.user,  # Requires authentication
            name=profile.name,
            title=profile.title,
            expertise_areas=profile.expertise_areas,
            bio=profile.bio,
            contact_info=profile.contact_info,
            profile_image=profile.profile_image
        )
        return ExpertProfileSchema.from_orm(expert)
    except Exception as e:
        print(f"Error creating expert profile: {e}")
        raise e

@api.get("/experts/{expert_id}", response=ExpertProfileSchema)
def get_expert_profile(request, expert_id: int):
    """Get an expert's profile."""
    try:
        expert = ExpertProfile.objects.get(id=expert_id)
        return ExpertProfileSchema.from_orm(expert)
    except ExpertProfile.DoesNotExist:
        return {"error": "Expert not found"}

# Expert Post Endpoints
@api.post("/experts/{expert_id}/posts", response=ExpertPostSchema)
def create_expert_post(request, expert_id: int, post: CreateExpertPostSchema):
    """Create a new post by an expert."""
    try:
        expert = ExpertProfile.objects.get(id=expert_id)
        expert_post = ExpertPost.objects.create(
            expert=expert,
            title=post.title,
            content=post.content,
            topics=post.topics
        )
        return ExpertPostSchema.from_orm(expert_post)
    except ExpertProfile.DoesNotExist:
        return {"error": "Expert not found"}
    except Exception as e:
        print(f"Error creating expert post: {e}")
        raise e

@api.get("/experts/search/{topic}", response=ExpertSearchResponseSchema)
def search_experts(request, topic: str):
    """Search for experts and their posts based on a topic."""
    try:
        # Search in expertise areas
        experts = ExpertProfile.objects.filter(
            Q(expertise_areas__icontains=topic) |
            Q(bio__icontains=topic)
        )

        # Search in expert posts
        posts = ExpertPost.objects.filter(
            Q(topics__icontains=topic) |
            Q(title__icontains=topic) |
            Q(content__icontains=topic)
        ).select_related('expert')

        return {
            "success": True,
            "experts": list(experts),
            "posts": list(posts),
            "error": None
        }
    except Exception as e:
        print(f"Error in expert search: {e}")
        return {
            "success": False,
            "experts": [],
            "posts": [],
            "error": str(e)
        }

# Test Data Creation Endpoint (Development Only)
@api.post("/create-test-data", response=dict)
def create_test_data(request):
    """Create test data for development purposes."""
    try:
        # Create test user
        user, created = User.objects.get_or_create(
            username="testexpert",
            email="test@example.com"
        )
        if created:
            user.set_password("testpass123")
            user.save()

        # Create expert profile
        expert, created = ExpertProfile.objects.get_or_create(
            user=user,
            defaults={
                "name": "Dr. Jane Smith",
                "title": "Senior Python Developer & AI Specialist",
                "expertise_areas": "python,machine learning,artificial intelligence",
                "bio": "20+ years experience in Python development and AI research",
                "contact_info": "@pythonexpert",
                "profile_image": "https://example.com/expert.jpg",
                "verified": True
            }
        )

        # Create some expert posts
        posts_data = [
            {
                "title": "Getting Started with Python",
                "content": "Python is a versatile programming language perfect for beginners...",
                "topics": "python,programming,beginners"
            },
            {
                "title": "Advanced Machine Learning Tips",
                "content": "When working with complex ML models, it's important to...",
                "topics": "machine learning,python,advanced"
            },
            {
                "title": "AI Development Best Practices",
                "content": "Building AI systems requires careful consideration of...",
                "topics": "artificial intelligence,best practices,development"
            }
        ]

        created_posts = []
        for post_data in posts_data:
            post, created = ExpertPost.objects.get_or_create(
                expert=expert,
                title=post_data["title"],
                defaults={
                    "content": post_data["content"],
                    "topics": post_data["topics"],
                    "likes": 42,
                    "views": 100
                }
            )
            created_posts.append(post.title)

        return {
            "status": "success",
            "message": "Test data created successfully",
            "expert": f"{expert.name} ({expert.title})",
            "posts": created_posts
        }

    except Exception as e:
        print(f"Error creating test data: {e}")
        return {
            "status": "error",
            "message": f"Failed to create test data: {str(e)}"
        }