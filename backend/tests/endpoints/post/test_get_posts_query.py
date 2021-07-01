"""
Test: GET /api/v1/posts?posted_by=...&tags=...&keyword=...
"""
from tests.utils import (
    clear_db,
    clear_mongo_db,
    create_user,
    create_post,
)


POST_ENDPOINT = "/api/v1/posts"


@clear_db
@clear_mongo_db
def test_get_posts_by_user_id(app):
    """
    Get posts by user id, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    create_post(app, "Example post I", user.id)
    response = client.get(
        f"{POST_ENDPOINT}?posted_by={user.id}",
    )
    assert response.status_code == 200
    assert len(response.json["posts"]) == 1


@clear_db
@clear_mongo_db
def test_get_posts_different_user_id(app):
    """
    Get posts by different user id, empty list of posts, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    create_post(app, "Example post I", user.id)
    response = client.get(
        f"{POST_ENDPOINT}?posted_by=104bb055-66c9-4e8d-85cd-a7868ab7da9c",
    )
    assert response.status_code == 200
    assert len(response.json["posts"]) == 0


@clear_db
@clear_mongo_db
def test_get_posts_by_tags(app):
    """
    Get posts by tags, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    create_post(app, "Example post I", user.id, tags=["cscc01", "hard"])
    response = client.get(
        f"{POST_ENDPOINT}?tags=cscc01",
    )
    assert response.status_code == 200
    assert len(response.json["posts"]) == 1


@clear_db
@clear_mongo_db
def test_get_posts_by_more_tags(app):
    """
    Get posts by more than one tags, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    create_post(app, "Example post I", user.id, tags=["cscc01", "hard", "final", "project"])
    create_post(app, "Example post II", user.id, tags=["cscc01", "project", "lecture"])
    response = client.get(
        f"{POST_ENDPOINT}?tags=cscc01,project",
    )
    assert response.status_code == 200
    assert len(response.json["posts"]) == 2


@clear_db
@clear_mongo_db
def test_get_posts_by_unmatched_tags(app):
    """
    Get posts by different tags, empty list of posts, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    create_post(app, "Example post I", user.id, tags=["cscc01", "hard"])
    response = client.get(
        f"{POST_ENDPOINT}?tags=cscc43",
    )
    assert response.status_code == 200
    assert len(response.json["posts"]) == 0


@clear_db
@clear_mongo_db
def test_get_posts_by_keyword(app):
    """
    Get posts by keyword, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    create_post(app, "Example post I", user.id)
    response = client.get(
        f"{POST_ENDPOINT}?keyword=Example",
    )
    assert response.status_code == 200
    assert len(response.json["posts"]) == 1


@clear_db
@clear_mongo_db
def test_get_posts_by_unmatched_keyword(app):
    """
    Get posts by keyword, empty list of posts, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    create_post(app, "Example post I", user.id)
    response = client.get(
        f"{POST_ENDPOINT}?keyword=cscc43",
    )
    assert response.status_code == 200
    assert len(response.json["posts"]) == 0


@clear_db
@clear_mongo_db
def test_get_posts_by_mixing(app):
    """
    Get posts by mixing user_id, keyword and tags, 200
    """
    client = app.test_client()
    user = create_user(app, "example@abc.com", "x1234")
    user_b = create_user(app, "utoronto@abc.com", "x1234")
    create_post(app, "Example post I", user.id, tags=["cscc01", "project", "final"])
    create_post(app, "Different post I", user.id, tags=["cscc01", "final"])
    create_post(app, "Random notes", user.id, tags=["cscc01", "lecture"])
    create_post(app, "Random notes", user_b.id, tags=["cscc01"])

    response_a = client.get(
        f"{POST_ENDPOINT}?posted_by={user.id}&keyword=post&tags=cscc01,final",
    )
    assert response_a.status_code == 200
    assert len(response_a.json["posts"]) == 2

    response_b = client.get(
        f"{POST_ENDPOINT}?keyword=notes&tags=cscc01,final",
    )
    assert response_b.status_code == 200
    assert len(response_b.json["posts"]) == 2

    response_c = client.get(
        f"{POST_ENDPOINT}?tags=cscc01",
    )
    assert response_c.status_code == 200
    assert len(response_c.json["posts"]) == 4
