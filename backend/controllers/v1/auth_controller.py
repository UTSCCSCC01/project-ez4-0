"""
This controller handles the following APIs:
- POST /api/v1/auth
"""
from flask_apispec import doc, marshal_with, use_kwargs
from schemas import (
    AuthSchema,
    AuthResponseSchema,
)
from .base_controller import BaseController
from models import User


@doc(tags=["Auth"])
class AuthController(BaseController):
    @doc(description="Authenticate a user by provider email and password")
    @marshal_with(AuthResponseSchema)
    @use_kwargs(AuthSchema)
    def post(self, email, password):
        user = User.query.filter_by(email=email).first()
        if not user:
            return {"description": f"User with email {email} does not exist"}, 404
        if user.verify_password(password):
            return {"success": True, "user_id": user.id}
        else:
            return {"description": "Authentication failed"}, 401
