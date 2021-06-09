"""
Test: POST /api/v1/users
"""
from tests.utils import clear_db, create_user


USER_ENDPOINT = "/api/v1/users"


@clear_db
def test_create_user(app):
    """
    Create user successfully, 200
    """
    client = app.test_client()
    response = client.post(
        USER_ENDPOINT,
        data={
            "email": "example@abc.com",
            "password": "x1234"
        }
    )
    assert response.status_code == 200


@clear_db
def test_create_user_exists_email(app):
    """
    Create user with existing email
    """
    client = app.test_client()
    create_user(app, "example@abc.com", "x1234")
    response = client.post(
        USER_ENDPOINT,
        data={
            "email": "example@abc.com",
            "password": "x1234"
        }
    )
    assert response.status_code == 400


@clear_db
def test_create_user_missing_field(app):
    """
    Create user missing email field, 422
    """
    client = app.test_client()
    response = client.post(
        USER_ENDPOINT,
        data={
            "email": "example@abc.com"
        }
    )
    assert response.status_code == 422


@clear_db
def test_create_user_no_body(app):
    """
    Create user with no request body, 422
    """
    client = app.test_client()
    response = client.post(
        USER_ENDPOINT
    )
    assert response.status_code == 422
