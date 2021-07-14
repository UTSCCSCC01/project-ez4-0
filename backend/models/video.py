from .base import BaseModel
from app import db
from sqlalchemy.dialects.postgresql import UUID
import uuid


class Video(BaseModel):
    """
    Course type in the database.
    """
    __table_name__ = "videos"

    id = db.Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False
    )

    name = db.Column(
        db.String,
        nullable=False
    )

    description = db.Column(
        db.String
    )

    url = db.Column(
        db.String
    )

    course_id = db.Column(
        UUID(as_uuid=True),
        db.ForeignKey('course.id', ondelete="CASCADE"),
        nullable=False
    )
