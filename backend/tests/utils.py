from app import db
from models import User
import functools


def clear_db(func):
    """
    Decorator to clear the database before executing
    the test.
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        app = kwargs.get("app", None)
        if app:
            with app.app_context():
                db.drop_all()
                db.create_all()
        return func(*args, **kwargs)
    return wrapper


def create_user(app, email, password, first_name="Foo", last_name="Bar"):
    """
    Helper method to create user
    """
    with app.app_context():
        return User.create(email, password, first_name, last_name)
