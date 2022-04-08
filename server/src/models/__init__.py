from .. import db
from .. import ma
from sqlalchemy.sql import func
from sqlalchemy import Column, DateTime
from datetime import datetime
import logging

logger = logging.getLogger('src.models')


class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date_added = Column(DateTime, default=datetime.utcnow)
    date_updated = Column(
        DateTime, onupdate=datetime.utcnow, default=datetime.utcnow)

    def create(self):
        if self.id:
            obj = self.query.get(self.id)
            if obj:
                raise ValueError(
                    'Cannot create a row entry because this item id already exists')

        db.session.add(self)
        db.session.commit()
        return self

    def update(self):
        if not self.id:
            raise ValueError(
                'Cannot update a table without object id specified')

        obj = self.query.get(self.id)
        if not obj:
            raise ValueError(
                'Cannot update a row element without first creating element')

        db.session.add(self)
        db.session.commit()
        return self

    def delete(self):
        db.session.delete(self)
        db.session.commit()
