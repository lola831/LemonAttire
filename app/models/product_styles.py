from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


# Helper table for joining many-to-many

product_styles = db.Table(
    "product_styles",
    db.Column(
        "product_id",
        db.Integer,
        db.ForeignKey("products.id"),
        primary_key=True
    ),
    db.Column(
        "style_id",
        db.Integer,
        db.ForeignKey("styles.id"),
        primary_key=True
    )
)
