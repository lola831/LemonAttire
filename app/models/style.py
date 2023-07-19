from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Style(db.Model):
    __tablename__ = 'styles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    product = db.relationship('Product', lazy="joined", back_populates="styles")
    user = db.relationship('User', lazy="joined", back_populates="styles")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'productId': self.product_id,
            'userId': self.user_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
