from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():
    jay_ribbed_knit_crop_top_pink_s = Product(
        product_type_id=1, color="Pink", size="S",
        image1="https://img.tobi.com/product_images/md/1/pink-jake-ribbed-knit-crop-top@2x.jpg", #from image source
        image2="https://img.tobi.com/product_images/xs/2/pink-jake-ribbed-knit-crop-top.jpg?",
        image3="https://img.tobi.com/product_images/xs/3/pink-jake-ribbed-knit-crop-top.jpg?",
        image4="https://img.tobi.com/product_images/xs/4/pink-jake-ribbed-knit-crop-top.jpg?",
        stock=100)
    jay_ribbed_knit_crop_top_yellow_s = Product(
        product_type_id=1, color="Yellow", size="S",
        image1="https://img.tobi.com/product_images/xs/1/yellow-jake-ribbed-knit-crop-top.jpg?",
        image2="https://img.tobi.com/product_images/xs/2/yellow-jake-ribbed-knit-crop-top.jpg?",
        image3="https://img.tobi.com/product_images/xs/3/yellow-jake-ribbed-knit-crop-top.jpg?",
        image4="https://img.tobi.com/product_images/xs/4/yellow-jake-ribbed-knit-crop-top.jpg?",
        stock=100)
    jay_ribbed_knit_crop_top_white_s = Product(
        product_type_id=1, color="White", size="S",
        image1="https://img.tobi.com/product_images/xs/1/off-white-jake-ribbed-knit-crop-top.jpg?",
        image2="https://img.tobi.com/product_images/xs/2/off-white-jake-ribbed-knit-crop-top.jpg?",
        image3="https://img.tobi.com/product_images/xs/3/off-white-jake-ribbed-knit-crop-top.jpg?",
        stock=100)
    charlie_ribbed_cropped_top_white_s = Product(
        product_type_id=2, color="White", size="S",
        image1="https://img.tobi.com/product_images/xs/1/cream-eagerly-anticipate-ribbed-cropped-top.jpg?",
        image2="https://img.tobi.com/product_images/xs/2/cream-eagerly-anticipate-ribbed-cropped-top.jpg?",
        image3="https://img.tobi.com/product_images/xs/3/cream-eagerly-anticipate-ribbed-cropped-top.jpg?",
        image4="https://img.tobi.com/product_images/xs/4/cream-eagerly-anticipate-ribbed-cropped-top.jpg?",
        stock=100)
    abby_maxi_dress_wine_s = Product(
        product_type_id=3, color="Wine", size="S",
        image1="https://img.tobi.com/product_images/xs/1/taupe-abegayle-plunging-maxi-dress.jpg?",
        image2="https://img.tobi.com/product_images/xs/2/taupe-abegayle-plunging-maxi-dress.jpg?",
        image3="https://img.tobi.com/product_images/xs/3/taupe-abegayle-plunging-maxi-dress.jpg?",
        stock=100)
    france_white_belted_crop_pants_s = Product(
        product_type_id=4, color="White", size="S",
        image1="https://img.tobi.com/product_images/xs/1/white-belgium-belted-cropped-pants.jpg?",
        image2="https://img.tobi.com/product_images/xs/2/white-belgium-belted-cropped-pants.jpg?",
        image3="https://img.tobi.com/product_images/xs/3/white-belgium-belted-cropped-pants.jpg?",
        stock=100)


    db.session.add(jay_ribbed_knit_crop_top_pink_s)
    db.session.add(jay_ribbed_knit_crop_top_yellow_s)
    db.session.add(jay_ribbed_knit_crop_top_white_s)
    db.session.add(charlie_ribbed_cropped_top_white_s)
    db.session.add(abby_maxi_dress_wine_s)
    db.session.add(france_white_belted_crop_pants_s)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()