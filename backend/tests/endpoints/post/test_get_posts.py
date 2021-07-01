"""
Test: POST /api/v1/posts
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
def test_get_posts(app):
    """
    Get posts successfully, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    create_post(app, "Example post I", user.id)
    create_post(app, "Example post II", user.id)
    response = client.get(
        POST_ENDPOINT,
    )
    assert response.status_code == 200
    assert len(response.json["posts"]) == 2
