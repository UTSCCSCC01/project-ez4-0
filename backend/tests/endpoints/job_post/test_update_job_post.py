"""
Test: UPDATE /api/v1/job_posts/:id
"""
from documents.job_post import JobPost
from tests.utils import clear_db, create_user, create_job_post


JOB_POST_ENDPOINT = "/api/v1/job_posts"


@clear_db
def test_update_job_post(app):
    """
    Update a job post successfully, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    job_post = create_job_post(app, "Example job post", user.id)
    response = client.patch(
        f"{JOB_POST_ENDPOINT}/{job_post.id}",
        data={
            "active": False
        }
    )
    assert response.status_code == 200
    with app.app_context():
        job = JobPost.objects(id=job_post.id).first()
        assert job.active == False


@clear_db
def test_update_job_post_invalid_id(app):
    """
    Update a job post by invalid id (not ObjectID), 400
    """
    client = app.test_client()
    create_user(app, "example@abc.com", "x1234")
    response = client.patch(
        f"{JOB_POST_ENDPOINT}/99"
    )
    assert response.status_code == 400


@clear_db
def test_update_non_exists_job_post(app):
    """
    Update a non-exists job post, 404
    """
    client = app.test_client()
    create_user(app, "example@abc.com", "x1234")
    response = client.patch(
        f"{JOB_POST_ENDPOINT}/60da9b4be6ab6b2608fcb2cb"
    )
    assert response.status_code == 404
