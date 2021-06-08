"""
Test: GET /api/v1/users/:id
"""
from tests.utils import clear_db, create_user


USER_ENDPOINT = "/api/v1/users"


@clear_db
def test_get_user(app):
    """
    Get user successfully, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    response = client.get(
        f"{USER_ENDPOINT}/{user.id}"
    )
    assert response.status_code == 200


@clear_db
def test_get_user_invalid_id(app):
    """
    Get user with invalid id (non-uuid), 404
    """
    client = app.test_client()
    create_user(app, "example@abc.com", "x1234")
    response = client.get(
        f"{USER_ENDPOINT}/99"
    )
    assert response.status_code == 404


@clear_db
def test_get_user_non_exist_id(app):
    """
    Get user with non-exist id, 404
    """
    client = app.test_client()
    create_user(app, "example@abc.com", "x1234")
    response = client.get(
        f"{USER_ENDPOINT}/53f9cba9-5f69-432a-840a-0c0b707d2814"
    )
    assert response.status_code == 404
