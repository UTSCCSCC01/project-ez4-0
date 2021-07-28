"""
This controller handles the following APIs:
- GET /api/v1/users/:id
- POST /api/v1/users
- PATCH /api/v1/users/:id
- DELETE /api/v1/users/:id
"""
from flask_apispec import doc, marshal_with, use_kwargs
from schemas import (
    UserSchema,
    CreateUserSchema,
    UpdateUserSchema,
    DeleteUserResponseSchema
)
from .base_controller import BaseController
from models import User


@doc(tags=["User"])
class UserController(BaseController):
    @doc(description="Get a single user by ID")
    @marshal_with(UserSchema, code=200)
    def get(self, user_id, **_):
        user = User.query.filter_by(id=user_id).first()
        if user:
            return user
        return {"description": "User not found"}, 404
    
    @doc(description="Delete a user by ID")
    @marshal_with(DeleteUserResponseSchema, code=200)
    def delete(self, user_id, **_):
        user = User.query.filter_by(id=user_id).first()
        if user:
            user.delete()
            return {"success": True}
        return {"description": "User not found"}, 404

    @doc(description="Update user information")
    @use_kwargs(UpdateUserSchema)
    @marshal_with(UserSchema)
    def patch(self, user_id, **kwargs):
        user = User.query.filter_by(id=user_id).first()
        if user:
            email = kwargs.get("email", None)
            first_name = kwargs.get("first_name", None)
            last_name = kwargs.get("last_name", None)
            gender = kwargs.get("gender", None)
            phone_number = kwargs.get("phone_number", None)
            birthdate = kwargs.get("birthdate", None)
            address = kwargs.get("address", None)
            # Update user email
            if email:
                if User.email_exists(email):
                    return {"description": f"User with email {email} already exists"}, 400
                user.email = email
            # Update user first name / last name
            if first_name:
                user.first_name = first_name
            if last_name:
                user.last_name = last_name
            if gender:
                user.gender = gender
            if phone_number:
                user.phone_number = phone_number
            if birthdate:
                user.birthdate = birthdate
            if address:
                user.address = address
            user.save()
            return user
        return {"description": "User not found"}, 404


@doc(tags=["User"])
class UsersController(BaseController):
    @doc(description="Create a new user")
    @use_kwargs(CreateUserSchema)
    @marshal_with(UserSchema)
    def post(self, email, password, first_name, last_name, **_):
        if User.email_exists(email):
            return {"description": f"User with email {email} already exists"}, 400
        user = User.create(email, password, first_name, last_name)
        return user
