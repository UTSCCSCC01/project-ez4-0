from app import db


class BaseModel(db.Model):
    """
    BaseModel including helpful mathods
    """

    __abstract__ = True

    def save(self) -> None:
        """
        Session commit to apply changes
        """
        db.session.add(self)
        db.session.commit()

    def delete(self) -> None:
        """
        Delete this row from the database
        """
        db.session.delete(self)
        db.session.commit()
