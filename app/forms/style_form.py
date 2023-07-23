from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Style

class StyleForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
