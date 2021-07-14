from .base import BaseModel
from app import db
from sqlalchemy.dialects.postgresql import UUID
from .video import Video
import uuid


class Course(BaseModel):
    """
    Course type in the database.
    """
    __table_name__ = "courses"

    id = db.Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False
    )

    name = db.Column(
        db.String,
        nullable=False,
    )

    description = db.Column(
        db.String
    )

    videos = db.relationship(
        Video,
        backref='course',
        lazy=True
    )
