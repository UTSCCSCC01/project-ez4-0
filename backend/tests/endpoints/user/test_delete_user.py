"""
Test: DELETE /api/v1/users/:id
"""
from tests.utils import clear_db, create_user


USER_ENDPOINT = "/api/v1/users"


@clear_db
def test_delete_user(app):
    """
    Delete a user successfully, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    response = client.delete(
        f"{USER_ENDPOINT}/{user.id}"
    )
    assert response.status_code == 200


@clear_db
def test_delete_not_valid_id(app):
    """
    Delete a user by invalid id (not uuid), 404
    """
    client = app.test_client()
    create_user(app, "example@abc.com", "x1234")
    response = client.delete(
        f"{USER_ENDPOINT}/99"
    )
    assert response.status_code == 404


@clear_db
def test_delete_non_exists_user(app):
    """
    Delete a non-exists user, 404
    """
    client = app.test_client()
    create_user(app, "example@abc.com", "x1234")
    response = client.delete(
        f"{USER_ENDPOINT}/177d98b1-0c51-4982-91f6-76fa77fd3ba6"
    )
    assert response.status_code == 404
