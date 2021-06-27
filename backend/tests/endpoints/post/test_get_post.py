"""
Test: GET /api/v1/posts/:id
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
def test_get_post(app):
    """
    Get single post successfully, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    post = create_post(app, "Example post", user.id)
    response = client.get(
        f"{POST_ENDPOINT}/{post.id}",
    )
    assert response.status_code == 200
    assert response.json["id"] == str(post.id)


@clear_db
@clear_mongo_db
def test_get_not_exists(app):
    """
    Get post that does not exists, 404
    """
    client = app.test_client()
    response = client.get(
        f"{POST_ENDPOINT}/60d646fbec78f906b934616b",
    )
    assert response.status_code == 404


@clear_db
@clear_mongo_db
def test_get_invalid_id(app):
    """
    Get post given invalid id, 400
    """
    client = app.test_client()
    response = client.get(
        f"{POST_ENDPOINT}/invalid_id",
    )
    assert response.status_code == 400
