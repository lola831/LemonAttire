from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    product_types = db.relationship('ProductType', cascade="all, delete-orphan", back_populates="category")

    def to_dict_name(self):
        return self.name

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }
