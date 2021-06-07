import pytest
from app import create_app, db


@pytest.fixture(scope="session")
def app():
    """
    A pytest fixture that exposes the flask app test client.
    https://flask.palletsprojects.com/en/1.1.x/testing/
    """
    return create_app(test=True)
