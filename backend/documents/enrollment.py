from mongoengine import (
    Document,
    ListField,
    UUIDField,
)
from models import User, Course, Video
from app import db


class Enrollment(Document):
    """
    Course id
    """
    course_id = UUIDField(required=True)

    """
    User id
    """
    user_id = UUIDField(required=True)

    """
    A list of finished videos
    """
    finished = ListField(UUIDField(), default=[])

    def get_user(self):
        """
        Get the user who related to the enrollment
        """
        return User.find_by_id(self.user_id)
    
    def get_course(self):
        """
        Get the course related to the enrollment
        """
        return Course.find_by_id(self.course_id)
    
    def get_videos(self):
        """
        Get a list of finished videos related to the enrollment
        """
        return db.session.query(Video).filter_by(Video.id.in_(self.finished)).all()
