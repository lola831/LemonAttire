from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_type_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('product_types.id')), nullable=False)
    color = db.Column(db.String(20), nullable=False)
    # price = db.Column(db.Float, nullable=False )
    image1 = db.Column(db.String(225), nullable=False)
    image2 = db.Column(db.String(225), nullable=True)
    image3 = db.Column(db.String(225), nullable=True)
    image4 = db.Column(db.String(225), nullable=True)
    stock = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    product_type = db.relationship('ProductType', back_populates="products")
    order_items = db.relationship('OrderItem', cascade="all, delete-orphan", back_populates="product")
    favorites = db.relationship('Favorite', cascade="all, delete-orphan", back_populates="product")


    def to_dict(self):
        return {
            'id': self.id,
            'color': self.color,
            'images': [self.image1, self.image2, self.image3, self.image4],
            'image1': self.image1,
            'image2': self.image2,
            'image3': self.image3,
            'image4': self.image4,
            'stock': self.stock,
            'product_type_id': self.product_type_id
        }

    def to_dict_simple(self):
        return self.product_type_id

    def to_dict_image(self):
        return self.image1
