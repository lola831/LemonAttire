from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class StyleItem(db.Model):
    __tablename__ = 'style_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    style_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('styles.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    product = db.relationship('Product', lazy="joined", back_populates="style_items")
    style = db.relationship('Style', lazy="joined", back_populates="style_items")

    def to_dict(self):
        return {
            'id': self.id,
            'stylesId': self.style_id,
            'productId': self.product_id,
            'createdAt': self.created_at
        }
