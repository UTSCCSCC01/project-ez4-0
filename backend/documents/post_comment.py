from mongoengine import (
    Document,
    StringField,
    ListField,
    DateTimeField,
    UUIDField,
    ReferenceField,
)
import mongoengine
from documents.post import Post
from models import User


class PostComment(Document):
    """
    Content of the comment
    """
    content = StringField(required=True)

    """
    A list of resource URLs
    """
    resources = ListField(StringField())

    """
    Poster id
    """
    user_id = UUIDField(required=True)

    """
    Post date
    """
    posted_at = DateTimeField(required=True)

    """
    A reference to the post
    """
    post = ReferenceField(Post, reverse_delete_rule=mongoengine.CASCADE)

    def get_poster(self):
        """
        Get the user who posted the post
        """
        return User.find_by_id(self.user_id)
