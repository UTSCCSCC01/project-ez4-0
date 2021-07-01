"""
Test: POST /api/v1/posts/:id/likes
"""
from tests.utils import (
    clear_db,
    clear_mongo_db,
    create_user,
    create_post,
)


POST_ENDPOINT = "/api/v1/posts"


@clear_db
@clear_mongo_db
def test_create_like(app):
    """
    Like a post successfully, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    post = create_post(app, "Example Post", user.id)
    response = client.post(
        f"{POST_ENDPOINT}/{post.id}/likes",
        data={
            "user_id": user.id
        }
    )
    assert response.status_code == 200
