from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Style

def style_title_exists(form, field):
    title = field.data
    style = Style.query.filter(Style.title == title).first()
    print("===================== style found? ", style)
    if style:
        raise ValidationError('*you already have a style with this title, please choose a new one')

class StyleForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), style_title_exists])
