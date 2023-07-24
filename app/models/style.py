from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Style(db.Model):
    __tablename__ = 'styles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates="styles")
    style_items = db.relationship('StyleItem', cascade="all, delete-orphan", back_populates="style" )


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'userId': self.user_id,
            'styleItems': [item.to_dict() for item in self.style_items],
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
