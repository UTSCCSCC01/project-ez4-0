"""
This are the controllers of the application, corresponding
to the 'C' in the 'MVC' design architecture. This is the
first version therefore under the folder v1. In the future
when we publish new APIs we will use v2, v3, ...
"""
from flask import Blueprint
from .user_controller import UserController, UsersController


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
