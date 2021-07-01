"""
Test: POST /api/v1/job_posts
"""
from tests.utils import clear_db, clear_mongo_db, create_user


JOB_POST_ENDPOINT = "/api/v1/job_posts"


@clear_db
@clear_mongo_db
def test_create_job_post(app):
    """
    Create job post successfully, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    response = client.post(
        JOB_POST_ENDPOINT,
        data={
            "title": "Example job post",
            "user_id": user.id,
            "active": True
        }
    )
    assert response.status_code == 200


@clear_db
@clear_mongo_db
def test_missing_body(app):
    """
    Create job post with missing body, 422
    """
    client = app.test_client()
    response = client.post(
        JOB_POST_ENDPOINT,
        data={
            "title": "Example post",
            "active": True
        }
    )
    assert response.status_code == 422
