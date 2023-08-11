from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import StyleItem, Product

def check_product(form, field):
    product_type_id = field.data
    product = Product.query.get(product_type_id)
    if product is None:
        raise ValidationError('Product does not exist.')

class StyleItemForm(FlaskForm):
    product_type_id= IntegerField('product_type_id', validators=[DataRequired()])
