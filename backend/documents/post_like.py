from mongoengine import (
    Document,
    DateTimeField,
    UUIDField,
    ReferenceField,
)
import mongoengine
from models import User
from documents.post import Post


class PostLike(Document):
    """
    User id who likes the post
    """
    user_id = UUIDField(required=True)

    """
    Liked the post at
    """
    liked_at = DateTimeField(required=True)

    """
    A reference to the post
    """
    post = ReferenceField(Post, reverse_delete_rule=mongoengine.CASCADE)

    def get_poster(self):
        """
        Get the user who liked the post
        """
        return User.find_by_id(self.user_id)
