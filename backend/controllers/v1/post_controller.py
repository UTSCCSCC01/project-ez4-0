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
    GetPostLikesSchema,
    GetPostCommentsSchema,
    CreatePostLikeSchema,
    CreatePostCommentSchema,
    PostCommentSchema,
    PostLikeSchema,
    UndoLikeSchema,
    DeleteCommentSchema,
)
from .base_controller import BaseController
from models import User
from documents.post import Post
from documents.post_like import PostLike
from documents.post_comment import PostComment
from documents.helper import get_comments_by_posts, get_likes_by_posts
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
        
        posts = Post.objects(**query).order_by("-posted_at")
        limit = kwargs.get("limit")
        if limit:
            return {
                "posts": posts[:limit]
            }
        return {
            "posts": posts
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


@doc(tags=["Post Comment"])
class PostCommentsController(BaseController):
    @doc(description="Post a comment for the given post")
    @use_kwargs(CreatePostCommentSchema)
    @marshal_with(PostCommentSchema)
    def post(self, post_id, user_id, content, **kwargs):
        if not ObjectId.is_valid(post_id):
            return {"description": f"Invalid id {post_id}"}, 400
        post = Post.objects(id=post_id).first()
        if not post:
            return {"description": f"Post with id {post_id} not found"}, 404
        user =  User.find_by_id(user_id)
        if not user:
            return {"description": f"User with id {user_id} not found"}, 404
        comment = PostComment(
            content=content,
            resources=kwargs.get("resources", []),
            user_id=user_id,
            posted_at=datetime.now(),
            post=post
        )
        return comment.save()

    @doc(description="Get a list of comments for the given post")
    @marshal_with(GetPostCommentsSchema)
    def get(self, post_id):
        if not ObjectId.is_valid(post_id):
            return {"description": f"Invalid id {post_id}"}, 400
        post = Post.objects(id=post_id).first()
        if not post:
            return {"description": f"Post with id {post_id} not found"}, 404
        return {"comments": get_comments_by_posts(post)}


@doc(tags=["Post Comment"])
class PostCommentController(BaseController):
    @doc(description="Delete the comment")
    @marshal_with(DeleteCommentSchema)
    def delete(self, post_id, comment_id, **_):
        # Find post
        if not ObjectId.is_valid(post_id):
            return {"description": f"Invalid id {post_id}"}, 400
        post = Post.objects(id=post_id).first()
        if not post:
            return {"description": f"Post with id {post_id} not found"}, 404
        # Find comment
        if not ObjectId.is_valid(comment_id):
            return {"description": f"Invalid id {comment_id}"}, 400
        comment = PostComment.objects(id=comment_id).first()
        if not comment:
            return {"description": f"Comment with id {comment_id} not found"}, 404
        comment.delete()
        return {"success": True}
    

@doc(tags=["Post Like"])
class PostLikesController(BaseController):
    @doc(description="Like the given post")
    @use_kwargs(CreatePostLikeSchema)
    @marshal_with(PostLikeSchema)
    def post(self, post_id, user_id, **_):
        if not ObjectId.is_valid(post_id):
            return {"description": f"Invalid id {post_id}"}, 400
        post = Post.objects(id=post_id).first()
        if not post:
            return {"description": f"Post with id {post_id} not found"}, 404
        user =  User.find_by_id(user_id)
        if not user:
            return {"description": f"User with id {user_id} not found"}, 404
        like = PostLike(
            user_id=user_id,
            liked_at=datetime.now(),
            post=post
        )
        return like.save()

    @doc(description="Get a list of likes for the given post")
    @marshal_with(GetPostLikesSchema)
    def get(self, post_id):
        if not ObjectId.is_valid(post_id):
            return {"description": f"Invalid id {post_id}"}, 400
        post = Post.objects(id=post_id).first()
        if not post:
            return {"description": f"Post with id {post_id} not found"}, 404
        return {"likes": get_likes_by_posts(post)}


@doc(tags=["Post Like"])
class PostLikeController(BaseController):
    @doc(description="Undo like")
    @marshal_with(UndoLikeSchema)
    def delete(self, post_id, like_id, **_):
        # Find post
        if not ObjectId.is_valid(post_id):
            return {"description": f"Invalid id {post_id}"}, 400
        post = Post.objects(id=post_id).first()
        if not post:
            return {"description": f"Post with id {post_id} not found"}, 404
        # Find like
        if not ObjectId.is_valid(like_id):
            return {"description": f"Invalid id {like_id}"}, 400
        like = PostLike.objects(id=like_id).first()
        if not like:
            return {"description": f"Like with id {like_id} not found"}, 404
        like.delete()
        return {"success": True}
