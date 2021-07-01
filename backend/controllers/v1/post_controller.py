"""
This controller handles the following APIs:
- GET /api/v1/users/:id
- POST /api/v1/users
- PATCH /api/v1/users/:id
- DELETE /api/v1/users/:id
"""
from flask_apispec import doc, marshal_with, use_kwargs
from schemas import (
    PostSchema,
    CreatePostSchema,
    GetPostsSchema,
    DeletePostSchema,
    QueryPostsSchema,
)
from .base_controller import BaseController
from models import User
from documents import Post
from datetime import datetime
from bson import ObjectId


@doc(tags=["Post"])
class PostsController(BaseController):
    @doc(description="Create a post")
    @use_kwargs(CreatePostSchema)
    @marshal_with(PostSchema)
    def post(self, title, content, user_id, **kwargs):
        user =  User.find_by_id(user_id)
        if not user:
            return {"description": f"User with id {user_id} not found"}, 404
        post = Post(
            title=title,
            content=content,
            user_id=user_id,
            posted_at=datetime.now(),
            resources=kwargs.get("resources", []),
            tags=kwargs.get("tags", []),
        )
        return post.save()

    @doc(description="Get posts", location=("query",))
    @use_kwargs(QueryPostsSchema)
    @marshal_with(GetPostsSchema)
    def get(self, **kwargs):
        query = {}
        # Query by tags
        tags = kwargs.get("tags")
        if tags:
            query["tags__in"] = tags.split(",")
        # Query by posts onwer
        posted_by = kwargs.get("posted_by")
        if posted_by:
            query["user_id"] = posted_by
        # Query by keyword
        keyword = kwargs.get("keyword")
        if keyword:
            query["title__contains"] = keyword
        return {
            "posts": Post.objects(**query)
        }


@doc(tags=["Post"])
class PostController(BaseController):
    @doc(description="Get a post by its ID")
    @marshal_with(PostSchema)
    def get(self, post_id):
        if not ObjectId.is_valid(post_id):
            return {"description": f"Invalid id {post_id}"}, 400
        post = Post.objects(id=post_id).first()
        if not post:
            return {"description": f"Post with id {post_id} not found"}, 404
        return post
    
    @doc(description="Delete a post by its ID")
    @marshal_with(DeletePostSchema)
    def delete(self, post_id):
        if not ObjectId.is_valid(post_id):
            return {"description": f"Invalid id {post_id}"}, 400
        post = Post.objects(id=post_id).first()
        if not post:
            return {"description": f"Post with id {post_id} not found"}, 404
        post.delete()
        return {"success": True}
