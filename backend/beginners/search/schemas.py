from ninja import Schema
from datetime import datetime
from typing import List, Optional

# This schema is used for creating a new post. It will not include `id`.
class CreatePostSchema(Schema):
    title: str
    content: str

# This schema is used for retrieving a post. It will include `id`.
class PostSchema(Schema):
    id: int
    title: str
    content: str
    created_at: datetime

# Schema for success response after deleting a post.

class DeletePostResponseSchema(Schema):
    id: int
    status: str  # You can use 'status' or any other field you prefer
    message: str  # Message to indicate success or failure

class LearningStepsSchema(Schema):
    """Schema for learning steps request."""
    topic: str
    level: str = "beginner"
    format: str = "detailed"

class LearningStepsResponseSchema(Schema):
    """Schema for learning steps response."""
    success: bool
    steps: List[str]
    error: Optional[str] = None

class ExpertProfileSchema(Schema):
    id: int
    name: str
    title: str
    expertise_areas: str
    bio: str
    contact_info: str
    profile_image: str
    verified: bool

class CreateExpertProfileSchema(Schema):
    name: str
    title: str
    expertise_areas: str
    bio: str
    contact_info: str
    profile_image: str
    verified: bool = False

class ExpertPostSchema(Schema):
    id: int
    title: str
    content: str
    topics: str
    likes: int
    views: int
    created_at: str
    expert_name: str

    @staticmethod
    def resolve_expert_name(obj):
        return obj.expert.name

    @staticmethod
    def resolve_created_at(obj):
        return obj.created_at.isoformat()

class CreateExpertPostSchema(Schema):
    title: str
    content: str
    topics: str

class ExpertSearchResponseSchema(Schema):
    success: bool
    experts: List[ExpertProfileSchema]
    posts: List[ExpertPostSchema]
    error: Optional[str] = None