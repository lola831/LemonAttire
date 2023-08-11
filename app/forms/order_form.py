from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Order

class OrderForm(FlaskForm):
    status = StringField('status', validators=[DataRequired()])
    # total_price = FloatField('total_price', validators=[DataRequired()])
