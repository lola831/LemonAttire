from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_type_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('product_types.id')), nullable=False)
    color = db.Column(db.String(20), nullable=False)
    size = db.Column(db.String(20), nullable=False)
    # price = db.Column(db.Float, nullable=False )
    image1 = db.Column(db.String(225), nullable=False)
    image2 = db.Column(db.String(225), nullable=True)
    image3 = db.Column(db.String(225), nullable=True)
    image4 = db.Column(db.String(225), nullable=True)
    stock = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    product_type = db.relationship('ProductType', lazy="joined", back_populates="products")
    order_items = db.relationship('OrderItem', cascade="all, delete-orphan", lazy="joined", back_populates="product")
    style_items = db.relationship('StyleItem', cascade="all, delete-orphan", lazy="joined", back_populates="product" )

    def to_dict(self):
        return {
            'id': self.id,
            'color': self.color,
            'size': self.size,
            'image1': self.image1,
            'image2': self.image2,
            'image3': self.image3,
            'image4': self.image4,
            'stock': self.stock,
            'price': self.product_type.price(),
            # 'productType': self.product_type.to_dict()
            'product_type_id': self.product_type_id
        }
