"""
Test: POST /api/v1/auth
"""
from tests.utils import clear_db, create_user


AUTH_ENDPOINT = "/api/v1/auth"


@clear_db
def test_auth_user(app):
    """
    Authenticate a user successfully, 200
    """
    client = app.test_client()
    create_user(app, "example@abc.com", "x1234")
    response = client.post(
        AUTH_ENDPOINT,
        data={
            "email": "example@abc.com",
            "password": "x1234"
        }
    )
    assert response.status_code == 200


@clear_db
def test_auth_user_invalid_cred(app):
    """
    Authenticate a user with invalid password, 401
    """
    client = app.test_client()
    create_user(app, "example@abc.com", "x1234")
    response = client.post(
        AUTH_ENDPOINT,
        data={
            "email": "example@abc.com",
            "password": "x99"
        }
    )
    assert response.status_code == 401


@clear_db
def test_auth_user_not_found_email(app):
    """
    Authenticate a user that is not exists, 404
    """
    client = app.test_client()
    create_user(app, "example@abc.com", "x1234")
    response = client.post(
        AUTH_ENDPOINT,
        data={
            "email": "notExists@abc.com",
            "password": "x1234"
        }
    )
    assert response.status_code == 404
