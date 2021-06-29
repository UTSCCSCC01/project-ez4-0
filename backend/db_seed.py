from app import create_app
from models import User
from documents import Post, JobPost
from datetime import datetime

app = create_app()


def create_user(email, password, first_name, last_name):
    """
    Helper method to create user
    """
    return User.create(email, password, first_name, last_name)


def create_post(content, user_id, **kwargs):
    """
    Helper method to create post
    """
    return Post(
        content=content,
        user_id=user_id,
        posted_at=datetime.now(),
        **kwargs
    ).save()


def create_job_post(title, user_id, active=True, **kwargs):
    """
    Helper method to create job post
    """
    return JobPost(
        title=title,
        user_id=user_id,
        active=active,
        posted_at=datetime.now(),
        **kwargs
    ).save()


def db_seed():
    with app.app_context():
        # Create users
        foo = create_user("example@utoronto.ca", "x1234", "Foo", "Bar")
        alice = create_user("another@utoronto.ca", "x9999", "Alice", "Chen")
        bob = create_user("tester@utoronto.ca", "x8888", "Bob", "Wang")

        # Create post for Foo
        create_post("Example post content", foo.id)
        create_post("Post with some tags by foo", foo.id, tags=["cscc01", "post"])
        create_post("One more post", foo.id, tags=["post"])

        # Create post for Alice
        create_post("Example post another content", alice.id)
        create_post("Post with some tags to search for", alice.id, tags=["cscc01"])
        create_post("One last post", alice.id, tags=["last"])
        
        # Create job post for Bob
        create_job_post(
            "Software Engineer for UTSC",
            bob.id,
            tags=["job", "utsc"],
            description="Some random description about this"
        )
        create_job_post(
            "Data Analyst for Amazon",
            bob.id,
            tags=["data_analysis", "job"]
        )
        create_job_post(
            "Full Stack Developer for Shopify",
            bob.id,
            description="Some random description about this"
        )


if __name__ == "__main__":
    db_seed()
