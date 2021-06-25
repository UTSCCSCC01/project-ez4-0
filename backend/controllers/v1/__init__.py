"""
This are the controllers of the application, corresponding
to the 'C' in the 'MVC' design architecture. This is the
first version therefore under the folder v1. In the future
when we publish new APIs we will use v2, v3, ...
"""
from flask import Blueprint
from .user_controller import UserController, UsersController
from .auth_controller import AuthController
from .post_controller import PostController, PostsController


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
