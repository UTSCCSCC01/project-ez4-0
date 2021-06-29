"""
Test: GET /api/v1/job_posts?posted_by=...&tags=...&keyword=...&active=...
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
def test_get_job_posts_by_active(app):
    """
    Get posts by active, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    create_job_post(app, "Example job post I", user.id)
    create_job_post(app, "Example job post II", user.id, active=False)
    create_job_post(app, "Example job post III", user.id)
    response = client.get(
        f"{JOB_POST_ENDPOINT}?active=true",
    )
    assert response.status_code == 200
    assert len(response.json["job_posts"]) == 2
