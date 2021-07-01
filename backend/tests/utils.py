from app import db
from models import User
from documents import Post
from documents import JobPost
from datetime import datetime
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


def clear_mongo_db(func):
    """
    Decorator to clear the mongodb before executing the test.
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        Post.drop_collection()
        JobPost.drop_collection()
        return func(*args, **kwargs)
    return wrapper


def create_user(app, email, password, first_name="Foo", last_name="Bar"):
    """
    Helper method to create user
    """
    with app.app_context():
        return User.create(email, password, first_name, last_name)


def create_post(app, title, user_id, content="", **kwargs):
    """
    Helper method to create post
    """
    with app.app_context():
        return Post(
            title=title,
            content=content,
            user_id=user_id,
            posted_at=datetime.now(),
            **kwargs
        ).save()


def create_job_post(app, title, user_id, active=True, **kwargs):
    """
    Helper method to create job post
    """
    with app.app_context():
        return JobPost(
            title=title,
            user_id=user_id,
            active=active,
            posted_at=datetime.now(),
            **kwargs
        ).save()
