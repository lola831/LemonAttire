from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    order_id = db.Column(db.Integer, db.ForiegnKey(add_prefix_for_prod('orders.id'), nullable=False))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    product = db.relationship('Product', lazy="joined", back_populates="order_items")
    order = db.relationship('Order', lazy="joined", back_populates="order_items")

    def to_dict(self):
        return {
            'id': self.id,
            'quantity': self.quantity,
            'price': self.price,
            'orderId': self.order_id,
            'productId': self.product_id
        }
