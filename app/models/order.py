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

    user = db.relationship('User', cascade="all, delete-orphan", lazy="joined", back_populates="orders")

    order_items = db.relationship('OrderItem', cascade="all, delete-orphan", lazy="joined", back_populates="order")

    def to_dict(self):
        return {
            'id': self.id,
            'status': self.status,
            'totalPrice': self.total_price,
            'createdAt': self.created_at,
            'user': self.user.to_dict(),
            'orderItems': [item.to_dict() for item in self.order_items],
        }
