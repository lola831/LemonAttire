from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(40), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates="orders")
    order_items = db.relationship('OrderItem', cascade="all, delete-orphan", back_populates="order")

    def to_dict(self):
        return {
            'id': self.id,
            'status': self.status,
            'totalPrice': self.total_price,
            'orderItems': [item.to_dict() for item in self.order_items],
            'userId': self.user_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
