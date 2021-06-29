"""
Test: DELETE /api/v1/job_posts/:id
"""
from tests.utils import (
    clear_db,
    clear_mongo_db,
    create_user,
    create_job_post,
)


JOB_POST_ENDPOINT = "/api/v1/job_posts"


@clear_db
@clear_mongo_db
def test_delete(app):
    """
    Delete single job post successfully, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    job_post = create_job_post(app, "Example job post", user.id)
    response = client.delete(
        f"{JOB_POST_ENDPOINT}/{job_post.id}",
    )
    assert response.status_code == 200


@clear_db
@clear_mongo_db
def test_delete_not_exists(app):
    """
    Delete post that does not exists, 404
    """
    client = app.test_client()
    response = client.delete(
        f"{JOB_POST_ENDPOINT}/60d646fbec78f906b934616b",
    )
    assert response.status_code == 404


@clear_db
@clear_mongo_db
def test_delete_invalid_id(app):
    """
    Delete post given invalid id, 400
    """
    client = app.test_client()
    response = client.delete(
        f"{JOB_POST_ENDPOINT}/invalid_id",
    )
    assert response.status_code == 400
