"""
Test: DELETE /api/v1/users/:id
"""
from models import User
from tests.utils import clear_db, create_user


USER_ENDPOINT = "/api/v1/users"


@clear_db
def test_update_user(app):
    """
    Update a user successfully, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    response = client.patch(
        f"{USER_ENDPOINT}/{user.id}",
        data={
            "email": "google@utoronto.ca"
        }
    )
    assert response.status_code == 200
    with app.app_context():
        user = User.query.filter_by(id=user.id).first()
        assert user.email == "google@utoronto.ca"


@clear_db
def test_update_user_invalid_id(app):
    """
    Update a user by invalid id (not uuid), 404
    """
    client = app.test_client()
    create_user(app, "example@abc.com", "x1234")
    response = client.patch(
        f"{USER_ENDPOINT}/99"
    )
    assert response.status_code == 404


@clear_db
def test_update_non_exists_user(app):
    """
    Update a non-exists user, 404
    """
    client = app.test_client()
    create_user(app, "example@abc.com", "x1234")
    response = client.patch(
        f"{USER_ENDPOINT}/4dc0a649-4df9-4eb0-bee3-56a967cd80be"
    )
    assert response.status_code == 404


@clear_db
def test_update_duplicated_email(app):
    """
    Update a user with existing email, 400
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    existing_user = create_user(app, "google@utoronto.ca", "x1234")
    response = client.patch(
        f"{USER_ENDPOINT}/{user.id}",
        data={
            "email": existing_user.email
        }
    )
    assert response.status_code == 400
