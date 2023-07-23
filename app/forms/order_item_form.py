from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import OrderItem

class OrderItemForm(FlaskForm):
    quantity = StringField('quantity', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    product_id= IntegerField('product_id', validators=[DataRequired()])
