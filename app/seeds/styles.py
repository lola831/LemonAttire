from app.models import db, Style, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_styles():
    style1 = Style(
        title="Fall Casual Outfit", user_id=1)
    style2 = Style(
        title="Date Night Outfit", user_id=1)


    db.session.add(style1)
    db.session.add(style2)


    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.styles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM styles"))

    db.session.commit()
