from pydantic import BaseModel

# This schema is used for creating a new post. It will not include `id`.
class CreatePostSchema(BaseModel):
    title: str
    content: str

    class Config:
        from_attributes = True

# This schema is used for retrieving a post. It will include `id`.
class PostSchema(BaseModel):
    id: int
    title: str
    content: str

    class Config:
        from_attributes = True  # Change 'orm_mode' to 'from_attributes' for Pydantic

# Schema for success response after deleting a post.

class DeletePostResponseSchema(BaseModel):
    id: int
    status: str  # You can use 'status' or any other field you prefer
    message: str  # Message to indicate success or failure

    class Config:
        from_attributes = True