from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import StyleItem, Product

def check_product(form, field):
    product_id = field.data
    product = Product.query.get(product_id)
    if product is None:
        raise ValidationError('Product does not exist.')

class StyleItemForm(FlaskForm):
    product_id= IntegerField('product_id', validators=[DataRequired()])
