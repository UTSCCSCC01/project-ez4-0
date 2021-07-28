from .base import BaseModel
from app import db
from sqlalchemy.dialects.postgresql import UUID
from werkzeug.security import generate_password_hash, check_password_hash
import uuid


class User(BaseModel):
    """
    User type in the database.
    """
    __table_name__ = "users"

    id = db.Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False
    )

    email = db.Column(
        db.String,
        primary_key=True,
        nullable=False,
        unique=True
    )

    password = db.Column(
        db.String,
        nullable=False,
    )

    first_name = db.Column(
        db.String
    )

    last_name = db.Column(
        db.String
    )

    avatar = db.Column(
        db.String
    )

    gender = db.Column(
        db.String
    )

    phone_number = db.Column(
        db.String
    )

    birthdate = db.Column(
        db.Date
    )

    address = db.Column(
        db.String
    )

    def verify_password(self, password):
        """
        Verify the given password with the hashed passowrd stored
        """
        return check_password_hash(self.password, password)

    @classmethod
    def create(cls, email, password, first_name, last_name, **kwargs):
        """
        Create a new user given the email and raw(unhashed) password.
        Any optional fields can be inserted to kwargs as well.
        """
        user = User(
            email=email,
            password=generate_password_hash(password),
            first_name=first_name,
            last_name=last_name,
            **kwargs
        )
        db.session.add(user)
        db.session.commit()
        return user

    @classmethod
    def hash_password(cls, password):
        """
        Hash a given password
        """
        return generate_password_hash(password)

    @classmethod
    def email_exists(cls, email):
        """
        Check if email exists already
        """
        return User.query.filter_by(email=email).first() is not None
