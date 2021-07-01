"""
This are the controllers of the application, corresponding
to the 'C' in the 'MVC' design architecture. This is the
first version therefore under the folder v1. In the future
when we publish new APIs we will use v2, v3, ...
"""
from flask import Blueprint
from .user_controller import UserController, UsersController
from .auth_controller import AuthController
from .post_controller import (
    PostController,
    PostsController,
    PostLikesController,
    PostLikeController,
    PostCommentsController,
    PostCommentController,
)
from .job_post_controller import JobPostsController, JobPostController


user_bp_name = "user"
user_bp = Blueprint(user_bp_name, __name__, url_prefix="/api/v1")
def set_user_routes(api, docs):
    """
    Setup routes for the User API
    """
    api.add_resource(UserController, "/users/<uuid:user_id>")
    docs.register(UserController, blueprint=user_bp_name)

    api.add_resource(UsersController, "/users")
    docs.register(UsersController, blueprint=user_bp_name)


auth_bp_name = "auth"
auth_bp = Blueprint(auth_bp_name, __name__, url_prefix="/api/v1")
def set_auth_routes(api, docs):
    """
    Setup routes for the Auth API
    """
    api.add_resource(AuthController, "/auth")
    docs.register(AuthController, blueprint=auth_bp_name)


post_bp_name = "post"
post_bp = Blueprint(post_bp_name, __name__, url_prefix="/api/v1")
def set_post_routes(api, docs):
    """
    Setup routes for the Post API
    """
    api.add_resource(PostsController, "/posts")
    docs.register(PostsController, blueprint=post_bp_name)

    api.add_resource(PostController, "/posts/<post_id>")
    docs.register(PostController, blueprint=post_bp_name)

    api.add_resource(PostCommentsController, "/posts/<post_id>/comments")
    docs.register(PostCommentsController, blueprint=post_bp_name)

    api.add_resource(PostLikesController, "/posts/<post_id>/likes")
    docs.register(PostLikesController, blueprint=post_bp_name)

    api.add_resource(PostCommentController, "/posts/<post_id>/comments/<comment_id>")
    docs.register(PostCommentController, blueprint=post_bp_name)

    api.add_resource(PostLikeController, "/posts/<post_id>/likes/<like_id>")
    docs.register(PostLikeController, blueprint=post_bp_name)


job_post_bp_name = "job_post"
job_post_bp = Blueprint(job_post_bp_name, __name__, url_prefix="/api/v1")
def set_job_post_routes(api, docs):
    """
    Setup routes for the Job post API
    """
    api.add_resource(JobPostsController, "/job_posts")
    docs.register(JobPostsController, blueprint=job_post_bp_name)

    api.add_resource(JobPostController, "/job_posts/<job_post_id>")
    docs.register(JobPostController, blueprint=job_post_bp_name)
