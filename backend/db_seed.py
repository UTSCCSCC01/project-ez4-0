from app import create_app, db
from models import User, Course, Video
from documents.post import Post
from documents.job_post import JobPost
from documents.post_like import PostLike
from documents.post_comment import PostComment
from documents.enrollment import Enrollment
from datetime import datetime, date


app = create_app()


def create_user(email, password, first_name, last_name, **kwargs):
    """
    Helper method to create user
    """
    return User.create(
        email,
        password,
        first_name,
        last_name,
        **kwargs
    )


def create_course(name, category, description):
    """
    Helper method to create course
    """
    return Course.create(
        name,
        category,
        description,
    )


def create_video(name, description, url, course_id):
    """
    Helper method to create video
    """
    return Video.create(
        name,
        description,
        url,
        course_id
    )


def create_post(title, user_id, content="", **kwargs):
    """
    Helper method to create post
    """
    return Post(
        title=title,
        content=content,
        user_id=user_id,
        posted_at=datetime.now(),
        **kwargs
    ).save()


def create_job_post(title, company, location, user_id, active=True, **kwargs):
    """
    Helper method to create job post
    """
    return JobPost(
        title=title,
        company=company,
        location=location,
        user_id=user_id,
        active=active,
        posted_at=datetime.now(),
        **kwargs
    ).save()


def create_post_like(user_id, post):
    """
    Helper method to like a post
    """
    return PostLike(
        user_id=user_id,
        liked_at=datetime.now(),
        post=post
    ).save()


def create_post_comment(user_id, content, post, **kwargs):
    """
    Helper method to like a post
    """
    return PostComment(
        content=content,
        user_id=user_id,
        posted_at=datetime.now(),
        post=post,
        **kwargs
    ).save()


def create_enrollment(user_id, course_id, finished, **kwargs):
    return Enrollment(
        course_id=course_id,
        user_id=user_id,
        finished=finished,
        **kwargs
    ).save()


def db_seed():
    with app.app_context():
        # Create users
        foo = create_user(
            "example@utoronto.ca",
            "x1234",
            "Foo",
            "Bar",
            avatar="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200",
            gender="Male",
            phone_number="6476666611",
            birthdate=date(1999, 4, 4),
            address="1234 Foo Street",
            bio="This is my favouite profile!"
        )
        alice = create_user(
            "another@utoronto.ca",
            "x9999",
            "Alice",
            "Chen",
            avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
            gender="Female",
            phone_number="6470208879",
            birthdate=date(1987, 5, 6),
            address="76 Consumer road",
            bio="No pain, no gain."
        )
        bob = create_user(
            "tester@utoronto.ca",
            "x8888",
            "Bob",
            "Wang",
            avatar="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            gender="Male",
            phone_number="6471872619",
            birthdate=date(1970, 12, 1),
            address="46 Finch Ave",
            bio="Let's go."
        )

        # Create post for Foo
        foo_post_1 = create_post("Example post content", foo.id)
        foo_post_2 = create_post("Post with some tags by foo", foo.id, tags=["cscc01", "post"])
        foo_post_3 = create_post("One more post", foo.id, tags=["post"])

        # Create post for Alice
        alice_post_1 = create_post("Example post another content", alice.id)
        alice_post_2 = create_post("Post with some tags to search for", alice.id, tags=["cscc01"])
        alice_post_3 = create_post("One last post", alice.id, tags=["last"])

        # Create likes for Alice -> Foo posts
        create_post_like(alice.id, foo_post_1)
        create_post_like(alice.id, foo_post_2)
        create_post_like(alice.id, foo_post_3)

        # Create likes for Bob -> Foo posts
        create_post_like(bob.id, foo_post_1)
        create_post_like(bob.id, foo_post_2)
        create_post_like(bob.id, foo_post_3)

        # Create comment for Foo -> Alice posts
        create_post_comment(foo.id, "I really like your post, do you think we can chat?", alice_post_1)
        create_post_comment(foo.id, "This looks amazing.", alice_post_2)
        
        # Create comment for Bob -> Alice posts
        create_post_comment(bob.id, "What's your next plan?", alice_post_1)
        create_post_comment(bob.id, "LGTM", alice_post_2)

        # Create job post for Bob
        create_job_post(
            "Software Engineer",
            "UTSC",
            "Remote",
            bob.id,
            tags=["job", "utsc"],
            description="Some random description about this"
        )
        create_job_post(
            "Data Analyst",
            "Amazon",
            "1234 Foo Street",
            bob.id,
            tags=["data_analysis", "job"]
        )
        create_job_post(
            "Full Stack Developer",
            "Shopify",
            "43 Vancouver Street",
            bob.id,
            description="Some random description about this"
        )

        # Courses
        course_a = create_course("How to be successful in startup", "Academics", "Teach you how to be successful")
        course_b = create_course("How to be successful in startup II", "Academics", "Second series")
        course_c = create_course("Java Tutorial", "Tutorial", "A series of Java tutorial")
        course_d = create_course("Python Tutorial", "Tutorial", "A series of Python tutorial")

        # Videos for course_a
        course_a_vid_a = create_video("50 Entrepreneurs share priceless advice", "Learn", "https://www.youtube.com/watch?v=QoqohmccTSc", course_a.id)
        course_a_vid_b = create_video("One of the Greatest Speeches Ever | Jeff Bezos", "Train", "https://www.youtube.com/watch?v=EctzLTFrktc", course_a.id)
        course_a_vid_c = create_video("One of the Greatest Speeches Ever | Steve Jobs", "Repeat", "https://www.youtube.com/watch?v=Tuw8hxrFBH8", course_a.id)
        course_a_vid_d = create_video("Unleash Your Super Brain To Learn Faster | Jim Kwik", "Repeat", "https://www.youtube.com/watch?v=uT_GcOGEFsk", course_a.id)


        # Videos for course_b
        course_b_vid_a = create_video("4. Step four", "Networking", "https://www.youtube.com/watch?v=E3yI_3NA6yQ", course_b.id)
        course_b_vid_b = create_video("5. Step five", "Expand", "https://www.youtube.com/watch?v=Y-7JVVZmSLg", course_b.id)

        # Videos for course_c
        create_video("Beginner", "Tutorial for beginner", "https://www.youtube.com/watch?v=eIrMbAQSU34", course_c.id)

        # Videos for course_d
        create_video("Full Course", "Full courses for beginner", "https://www.youtube.com/watch?v=rfscVS0vtbw", course_d.id)

        # Enrollment for Foo, course_a, finished vid_a, vid_b
        create_enrollment(foo.id, course_a.id, [course_a_vid_a.id, course_a_vid_b.id])

        # Enrollment for Alice, course_b, finished vid_a
        create_enrollment(alice.id, course_b.id, [course_b_vid_a.id])

        # Enrollment for Bob, course_a, finished vid_c, course_b, finished vid_a, vid_b
        create_enrollment(bob.id, course_a.id, [course_a_vid_c.id])
        create_enrollment(bob.id, course_b.id, [course_b_vid_a.id, course_b_vid_b.id])


def clear_dbs():
    """
    Helper method to clear both mongodb and postgres
    """
    with app.app_context():
        # Mongo
        Post.drop_collection()
        JobPost.drop_collection()
        # Postgres
        db.drop_all()
        db.create_all()


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "--clear":
        clear_dbs()
        print("Successfully cleared MongoDB and Postgres")
    db_seed()
    print("Successfully inserted seeds")
