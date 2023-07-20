from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .product_styles import product_styles



class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_type_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('product_types.id')), nullable=False)
    color = db.Column(db.String(20), nullable=False)
    size = db.Column(db.String(20), nullable=False)
    image = db.Column(db.String(225), nullable=False)
    stock = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    product_type = db.relationship('ProductType', lazy="joined", back_populates="products")
    order_items = db.relationship('OrderItem', cascade="all, delete-orphan", lazy="joined", back_populates="product")
    favorites = db.relationship('Favorite', cascade="all, delete-orphan", lazy="joined", back_populates="product")
    styles = db.relationship('Style', secondary=product_styles, lazy="joined", back_populates="product")

    def to_dict(self):
        return {
            'id': self.id,
            'color': self.color,
            'size': self.size,
            'image': self.image,
            'stock': self.stock,
            'price': self.product_type.price(),
            'productType': self.product_type.to_dict()
        }
