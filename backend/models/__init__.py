"""
This is the model layer `M` in the MVC design. Access to
database and all of the operations should be done through
using models. Note that in flask we use models instead of
DAO.
"""
from .user import User
from .course import Course
from .video import Video
