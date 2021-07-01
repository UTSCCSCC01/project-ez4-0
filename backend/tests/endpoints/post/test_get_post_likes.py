"""
Test: GET /api/v1/posts/:id/likes
"""
from tests.utils import (
    clear_db,
    clear_mongo_db,
    create_user,
    create_post,
    create_like
)


POST_ENDPOINT = "/api/v1/posts"


@clear_db
@clear_mongo_db
def test_get_post_likes(app):
    """
    Get single post likes successfully, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    user_b = create_user(app, "example@utsc.com", "x9999")
    post = create_post(app, "Example post", user.id)
    create_like(app, user.id, post)
    create_like(app, user_b.id, post)
    response = client.get(
        f"{POST_ENDPOINT}/{post.id}/likes",
    )
    assert response.status_code == 200
    assert len(response.json["likes"]) == 2
