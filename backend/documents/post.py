from mongoengine import (
    Document,
    StringField,
    ListField,
    DateTimeField,
    UUIDField,
)
from models import User


class Post(Document):
    """
    Title of the post
    """
    title = StringField(required=True)

    """
    Content of the post
    """
    content = StringField(required=True)

    """
    A list of resource URLs
    """
    resources = ListField(StringField())

    """
    A base64 string of the image, for demo purpose only
    """
    image = StringField()

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

    def get_poster(self):
        """
        Get the user who posted the post
        """
        return User.find_by_id(self.user_id)
