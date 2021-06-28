from mongoengine import (
    Document,
    StringField,
    ListField,
    DateTimeField,
    UUIDField,
    BooleanField
)
from models import User


class JobPost(Document):
    """
    Job title
    """
    title = StringField(required=True)

    """
    Job description
    """
    description = StringField(required=True)

    """
    A list of requirements described in String
    """
    requirements = ListField(StringField())

    """
    A list of resource URLs
    """
    resources = ListField(StringField())

    """
    A list of tags
    """
    tags = ListField(StringField())

    """
    Poster id
    """
    user_id = UUIDField(required=True)

    """
    Post date
    """
    posted_at = DateTimeField(required=True)

    """
    Whether this post is active or not, if it is False,
    this job post is view only
    """
    active = BooleanField(required=True)

    def get_poster(self):
        """
        Get the user who posted the job post
        """
        return User.find_by_id(self.user_id)
