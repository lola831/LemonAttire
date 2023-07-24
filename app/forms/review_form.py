from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Review

class ReviewForm(FlaskForm):
    description = StringField('description', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
