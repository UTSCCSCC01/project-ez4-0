"""
Test: GET /api/v1/job_posts
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
def test_get_job_posts(app):
    """
    Get job posts successfully, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    create_job_post(app, "Example job post I", user.id)
    create_job_post(app, "Example job post II", user.id)
    response = client.get(
        JOB_POST_ENDPOINT,
    )
    assert response.status_code == 200
    assert len(response.json["job_posts"]) == 2
