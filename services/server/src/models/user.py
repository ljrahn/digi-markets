from .. import db
from . import BaseModel
from sqlalchemy import Column, String
from flask_login import UserMixin


class User(BaseModel, UserMixin):
    __tablename__ = 'user'
    username = Column(String(50), nullable=False)
    password = Column(String(200), nullable=False)
