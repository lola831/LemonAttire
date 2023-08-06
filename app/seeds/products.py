from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():
    jay_ribbed_knit_crop_top_pink_s = Product(
        product_type_id=1, color="lightpink",
        image1="https://img.tobi.com/product_images/md/1/pink-jake-ribbed-knit-crop-top@2x.jpg", #from image source">
        image2="https://img.tobi.com/product_images/sm/2/pink-jake-ribbed-knit-crop-top@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/pink-jake-ribbed-knit-crop-top@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/pink-jake-ribbed-knit-crop-top@2x.jpg",
        stock=100)
    jay_ribbed_knit_crop_top_yellow_s = Product(
        product_type_id=1, color="lightyellow",
        image1="https://img.tobi.com/product_images/md/1/yellow-jake-ribbed-knit-crop-top@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/yellow-jake-ribbed-knit-crop-top@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/yellow-jake-ribbed-knit-crop-top@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/yellow-jake-ribbed-knit-crop-top@2x.jpg",
        stock=100)
    jay_ribbed_knit_crop_top_white_s = Product(
        product_type_id=1, color="White",
        image1="https://img.tobi.com/product_images/md/1/off-white-jake-ribbed-knit-crop-top@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/off-white-jake-ribbed-knit-crop-top@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/off-white-jake-ribbed-knit-crop-top@2x.jpg",
        stock=100)
    charlie_ribbed_cropped_top_white_s = Product(
        product_type_id=2, color="White",
        image1="https://img.tobi.com/product_images/md/1/cream-eagerly-anticipate-ribbed-cropped-top@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/cream-eagerly-anticipate-ribbed-cropped-top@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/cream-eagerly-anticipate-ribbed-cropped-top@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/cream-eagerly-anticipate-ribbed-cropped-top@2x.jpg",
        stock=100)
    abby_maxi_dress_taupe_s = Product(
        product_type_id=3, color="Taupe",
        image1="https://img.tobi.com/product_images/md/1/taupe-abegayle-plunging-maxi-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/taupe-abegayle-plunging-maxi-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/taupe-abegayle-plunging-maxi-dress@2x.jpg",
        stock=100)
    france_white_belted_crop_pants_s = Product(
        product_type_id=4, color="White",
        image1="https://img.tobi.com/product_images/md/1/white-belgium-belted-cropped-pants@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/white-belgium-belted-cropped-pants@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/white-belgium-belted-cropped-pants@2x.jpg",
        stock=100)
    satin_slit_mini_dress_blue = Product (
        product_type_id=5, color="lightblue",
        image1="https://img.tobi.com/product_images/md/1/light-blue-in-depth-satin-slit-mini-slit-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/light-blue-in-depth-satin-slit-mini-slit-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/light-blue-in-depth-satin-slit-mini-slit-dress@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/light-blue-in-depth-satin-slit-mini-slit-dress@2x.jpg",
        stock=100)
    satin_slit_mini_dress_green = Product (
        product_type_id=5, color="lightgreen",
        image1="https://img.tobi.com/product_images/md/1/green-in-depth-satin-slit-mini-slit-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/green-in-depth-satin-slit-mini-slit-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/green-in-depth-satin-slit-mini-slit-dress@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/green-in-depth-satin-slit-mini-slit-dress@2x.jpg",
        stock=100)



    db.session.add(jay_ribbed_knit_crop_top_pink_s)
    db.session.add(jay_ribbed_knit_crop_top_yellow_s)
    db.session.add(jay_ribbed_knit_crop_top_white_s)
    db.session.add(charlie_ribbed_cropped_top_white_s)
    db.session.add(abby_maxi_dress_taupe_s)
    db.session.add(france_white_belted_crop_pants_s)
    db.session.add(satin_slit_mini_dress_blue)
    db.session.add(satin_slit_mini_dress_green)

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
