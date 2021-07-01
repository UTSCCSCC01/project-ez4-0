"""
Test: POST /api/v1/posts
"""
from tests.utils import clear_db, clear_mongo_db, create_user


POST_ENDPOINT = "/api/v1/posts"


@clear_db
@clear_mongo_db
def test_create_post(app):
    """
    Create post successfully, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    response = client.post(
        POST_ENDPOINT,
        data={
            "title": "Example post",
            "content": "",
            "user_id": user.id
        }
    )
    assert response.status_code == 200


@clear_db
@clear_mongo_db
def test_missing_body(app):
    """
    Create post with missing body, 422
    """
    client = app.test_client()
    response = client.post(
        POST_ENDPOINT,
        data={
            "content": "Example post"
        }
    )
    assert response.status_code == 422
