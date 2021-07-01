from documents.post_comment import PostComment
from documents.post_like import PostLike
from documents.post import Post


def get_comments_by_posts(post):
    """
    Get a list of comments related to the post
    """
    return PostComment.objects(post=post)


def get_likes_by_posts(post):
    """
    Get a list of likes related to the post
    """
    return PostLike.objects(post=post)
