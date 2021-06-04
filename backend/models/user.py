from flask_sqlalchemy import SQLAlchemy
from app import db
from sqlalchemy.dialects.postgresql import UUID
from werkzeug.security import generate_password_hash, check_password_hash
import uuid


class User(db.Model):
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

    def verify_password(self, password):
        """
        Verify the given password with the hashed passowrd stored
        """
        return check_password_hash(self.hash_password, password)

    @classmethod
    def create(cls, username, password):
        """
        Create a new user given the username and raw(unhashed)
        password.
        """
        user = User(
            username=username,
            password=generate_password_hash(password)
        )
        db.session.add(user)
        db.session.commit()

    @classmethod
    def hash_password(cls, password):
        """
        Hash a given password
        """
        return generate_password_hash(password)

