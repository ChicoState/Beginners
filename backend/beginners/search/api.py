# api.py in backend/search/api.py

from ninja import NinjaAPI
from .models import Post
from .schemas import PostSchema, CreatePostSchema, DeletePostResponseSchema

api = NinjaAPI()

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