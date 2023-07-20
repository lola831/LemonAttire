from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ProductType(db.Model):
    __tablename__ = 'product_types'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(225), nullable=False, unique=True)
    description = db.Column(db.String(500), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')))
    price = db.Column(db.Float, nullable=False )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    category = db.relationship('Category', lazy="joined", back_populates="product_types")

    products = db.relationship("Product", cascade="all, delete-orphan", lazy="joined", back_populates="product_type")


    def price(self):
        return self.price,

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'category': self.category.to_dict_name(),
            'products': [product.to_dict() for product in self.products]
        }