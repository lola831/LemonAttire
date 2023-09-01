from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():
    jay_ribbed_knit_crop_top_pink_s = Product(
        product_type_id=1, color="LightPink",
        image1="https://img.tobi.com/product_images/md/1/pink-jake-ribbed-knit-crop-top@2x.jpg", #from image source">
        image2="https://img.tobi.com/product_images/sm/2/pink-jake-ribbed-knit-crop-top@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/pink-jake-ribbed-knit-crop-top@2x.jpg",
        stock=100)
    jay_ribbed_knit_crop_top_yellow_s = Product(
        product_type_id=1, color="LightYellow",
        image1="https://img.tobi.com/product_images/md/1/yellow-jake-ribbed-knit-crop-top@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/yellow-jake-ribbed-knit-crop-top@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/yellow-jake-ribbed-knit-crop-top@2x.jpg",
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
        product_type_id=5, color="LightBlue",
        image1="https://img.tobi.com/product_images/md/1/light-blue-in-depth-satin-slit-mini-slit-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/light-blue-in-depth-satin-slit-mini-slit-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/light-blue-in-depth-satin-slit-mini-slit-dress@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/light-blue-in-depth-satin-slit-mini-slit-dress@2x.jpg",
        stock=100)
    satin_slit_mini_dress_green = Product (
        product_type_id=5, color="PaleGreen",
        image1="https://img.tobi.com/product_images/md/1/green-in-depth-satin-slit-mini-slit-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/green-in-depth-satin-slit-mini-slit-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/green-in-depth-satin-slit-mini-slit-dress@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/green-in-depth-satin-slit-mini-slit-dress@2x.jpg",
        stock=100)
    go_glam_strapless_maxi_dress_purple = Product (
        product_type_id=6, color="Plum",
        image1="https://img.tobi.com/product_images/md/1/dusty-purple-go-glam-strapless-maxi-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/dusty-purple-go-glam-strapless-maxi-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/dusty-purple-go-glam-strapless-maxi-dress@2x.jpg",
        stock=100,
    )
    go_glam_strapless_maxi_dress_emerald = Product (
        product_type_id=6, color="Teal",
        image1="https://img.tobi.com/product_images/md/1/emerald-go-glam-strapless-maxi-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/emerald-go-glam-strapless-maxi-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/emerald-go-glam-strapless-maxi-dress@2x.jpg",
        stock=100,
    )
    go_glam_strapless_maxi_dress_mint = Product (
        product_type_id=6, color="Aquamarine",
        image1="https://img.tobi.com/product_images/md/1/mint-go-glam-strapless-maxi-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/mint-go-glam-strapless-maxi-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/mint-go-glam-strapless-maxi-dress@2x.jpg",
        stock=100,
    )
    floral_keyhole_midi_dress = Product (
        product_type_id=7, color="DarkSeaGreen",
        image1="https://img.tobi.com/product_images/md/1/blue-cheryl-floral-keyhole-midi-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/blue-cheryl-floral-keyhole-midi-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/blue-cheryl-floral-keyhole-midi-dress@2x.jpg",
        stock=100,
    )
    blue_floral_mini_dress = Product (
        product_type_id=8, color="SteelBlue",
        image1="https://img.tobi.com/product_images/md/1/navy-cool-and-calm-ditsy-floral-smocked-skater-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/navy-cool-and-calm-ditsy-floral-smocked-skater-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/navy-cool-and-calm-ditsy-floral-smocked-skater-dress@2x.jpg",
        image4="https://img.tobi.com/product_images/sn/4/navy-cool-and-calm-ditsy-floral-smocked-skater-dress@2x.jpg",
        stock=100,
    )
    multi_floral_ribbed_mini_dress = Product (
        product_type_id=9, color="White",
        image1="https://img.tobi.com/product_images/md/1/ivory-multi-left-you-on-read-floral-ribbed-mini-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/ivory-multi-left-you-on-read-floral-ribbed-mini-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/ivory-multi-left-you-on-read-floral-ribbed-mini-dress@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/ivory-multi-left-you-on-read-floral-ribbed-mini-dress@2x.jpg",
        stock=100,
    )
    sherbert_dress = Product (
        product_type_id=10, color="PeachPuff",
        image1="https://img.tobi.com/product_images/md/1/orange-sherbert-summer-cutout-maxi-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/orange-sherbert-summer-cutout-maxi-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/orange-sherbert-summer-cutout-maxi-dress@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/orange-sherbert-summer-cutout-maxi-dress@2x.jpg",
        stock=100,
    )
    daisy_flutter_dress = Product (
        product_type_id=11, color="Honeydew",
        image1="https://img.tobi.com/product_images/md/1/lime-avah-ditsy-flutter-sleeve-full-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/lime-avah-ditsy-flutter-sleeve-full-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/lime-avah-ditsy-flutter-sleeve-full-dress@2x.jpg",
        stock=100,
    )
    valencia_dress = Product (
        product_type_id=12, color="OldLace",
        image1="https://img.tobi.com/product_images/md/1/cream-valence-lace-maxi-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/cream-valence-lace-maxi-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/cream-valence-lace-maxi-dress@2x.jpg",
        stock=100,
    )
    daniela_dress_pink = Product (
        product_type_id=13, color="Thistle",
        image1="https://img.tobi.com/product_images/md/1/lilac-dani-ribbed-ruched-bodycon-mini-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/lilac-dani-ribbed-ruched-bodycon-mini-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/lilac-dani-ribbed-ruched-bodycon-mini-dress@2x.jpg",
        stock=100,
    )
    daniela_dress_brown = Product (
        product_type_id=13, color="Sienna",
        image1="https://img.tobi.com/product_images/md/1/toffee-brown-dani-ribbed-ruched-bodycon-mini-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/toffee-brown-dani-ribbed-ruched-bodycon-mini-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/toffee-brown-dani-ribbed-ruched-bodycon-mini-dress@2x.jpg",
        stock=100,
    )
    satin_cowl_dress_hot_pink = Product (
        product_type_id=14, color="MediumVioletRed",
        image1="https://img.tobi.com/product_images/md/1/magenta-listen-to-me-satin-cowl-neck-adjustable-ruched-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/magenta-listen-to-me-satin-cowl-neck-adjustable-ruched-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/magenta-listen-to-me-satin-cowl-neck-adjustable-ruched-dress@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/magenta-listen-to-me-satin-cowl-neck-adjustable-ruched-dress@2x.jpg",
        stock=100,
    )
    satin_cowl_dress_blush = Product (
        product_type_id=14, color="RosyBrown",
        image1="https://img.tobi.com/product_images/md/1/blush-listen-to-me-satin-cowl-neck-adjustable-ruched-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/blush-listen-to-me-satin-cowl-neck-adjustable-ruched-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/blush-listen-to-me-satin-cowl-neck-adjustable-ruched-dress@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/blush-listen-to-me-satin-cowl-neck-adjustable-ruched-dress@2x.jpg",
        stock=100,
    )
    satin_cowl_dress_white = Product (
        product_type_id=14, color="White",
        image1="https://img.tobi.com/product_images/md/1/cream-listen-to-me-satin-cowl-neck-adjustable-ruched-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/cream-listen-to-me-satin-cowl-neck-adjustable-ruched-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/cream-listen-to-me-satin-cowl-neck-adjustable-ruched-dress@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/cream-listen-to-me-satin-cowl-neck-adjustable-ruched-dress@2x.jpg",
        stock=100,
    )
    floral_openback_bodycon_dress_cream = Product (
        product_type_id=15, color="White",
        image1="https://img.tobi.com/product_images/md/1/cream-kiana-flower-open-back-bodycon-mini-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/cream-kiana-flower-open-back-bodycon-mini-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/cream-kiana-flower-open-back-bodycon-mini-dress@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/cream-kiana-flower-open-back-bodycon-mini-dress@2x.jpg",
        stock=100,
    )
    floral_openback_bodycon_dress_black = Product (
        product_type_id=15, color="Black",
        image1="https://img.tobi.com/product_images/md/1/black-kiana-flower-open-back-bodycon-mini-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/black-kiana-flower-open-back-bodycon-mini-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/black-kiana-flower-open-back-bodycon-mini-dress@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/black-kiana-flower-open-back-bodycon-mini-dress@2x.jpg",
        stock=100,
    )
    green_plaid_dress = Product (
        product_type_id=16, color="Olive",
        image1="https://img.tobi.com/product_images/md/1/green-ramie-plaid-cowl-neck-midi-dress@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/green-ramie-plaid-cowl-neck-midi-dress@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/green-ramie-plaid-cowl-neck-midi-dress@2x.jpg",
        stock=100,
    )
    black_lace_top = Product (
        product_type_id=17, color="Jet",
        image1="https://img.tobi.com/product_images/md/1/black-zita-laced-cami-top@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/black-zita-laced-cami-top@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/black-zita-laced-cami-top@2x.jpg",
        stock=100,
    )
    one_shoulder_bodysuit = Product (
        product_type_id=18, color="White",
        image1="https://img.tobi.com/product_images/md/1/off-white-go-get-her-one-shoulder-cutout-bodysuit@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/off-white-go-get-her-one-shoulder-cutout-bodysuit@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/off-white-go-get-her-one-shoulder-cutout-bodysuit@2x.jpg",
        stock=100,
    )
    ivory_halter_top = Product (
        product_type_id=19, color="White",
        image1="https://img.tobi.com/product_images/md/1/ivory-curtis-halter-smocked-crop-top@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/ivory-curtis-halter-smocked-crop-top@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/ivory-curtis-halter-smocked-crop-top@2x.jpg",
        stock=100,
    )
    mint_ditsy_top = Product (
        product_type_id=20, color="Mint",
        image1="https://img.tobi.com/product_images/md/1/mint-lazy-afternoon-ditsy-floral-smocked-crop-top@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/mint-lazy-afternoon-ditsy-floral-smocked-crop-top@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/mint-lazy-afternoon-ditsy-floral-smocked-crop-top@2x.jpg",
        stock=100,
    )
    lala_top = Product (
        product_type_id=21, color="Taupe",
        image1="https://img.tobi.com/product_images/md/1/taupe-look-at-the-light-surplice-top@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/taupe-look-at-the-light-surplice-top@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/taupe-look-at-the-light-surplice-top@2x.jpg",
        stock=100,
    )
    macie_blouse_top_pink = Product (
        product_type_id=22, color="LightPink",
        image1="https://img.tobi.com/product_images/md/1/toast-maci-plunging-blouse@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/toast-maci-plunging-blouse@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/toast-maci-plunging-blouse@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/toast-maci-plunging-blouse@2x.jpg",
        stock=100,
    )
    stitch_crop_top_blue = Product (
        product_type_id=23, color="LightCyan",
        image1="https://img.tobi.com/product_images/md/1/mint-ivory-quinn-colorblocked-exposed-stitch-crop-top@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/mint-ivory-quinn-colorblocked-exposed-stitch-crop-top@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/mint-ivory-quinn-colorblocked-exposed-stitch-crop-top@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/mint-ivory-quinn-colorblocked-exposed-stitch-crop-top@2x.jpg",
        stock=100,
    )
    stitch_crop_top_pink = Product (
        product_type_id=23, color="MistyRose",
        image1="https://img.tobi.com/product_images/md/1/peach-orchid-quinn-colorblocked-exposed-stitch-crop-top@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/peach-orchid-quinn-colorblocked-exposed-stitch-crop-top@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/peach-orchid-quinn-colorblocked-exposed-stitch-crop-top@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/peach-orchid-quinn-colorblocked-exposed-stitch-crop-top@2x.jpg",
        stock=100,
    )
    cream_wide_leg_pants = Product (
        product_type_id=24, color="Linen",
        image1="https://img.tobi.com/product_images/md/1/cream-erikah-elastic-waist-wide-leg-pants@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/cream-erikah-elastic-waist-wide-leg-pants@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/cream-erikah-elastic-waist-wide-leg-pants@2x.jpg",
        stock=100,
    )
    striped_pants = Product (
        product_type_id=25, color="White",
        image1="https://img.tobi.com/product_images/md/1/white-multi-rosa-stripe-wide-leg-pants@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/white-multi-rosa-stripe-wide-leg-pants@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/white-multi-rosa-stripe-wide-leg-pants@2x.jpg",
        stock=100,
    )
    homebody_sweat_pants_pink = Product (
        product_type_id=26, color="Pink",
        image1="https://img.tobi.com/product_images/md/1/pink-homebody-sweatpants@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/pink-homebody-sweatpants@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/pink-homebody-sweatpants@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/pink-homebody-sweatpants@2x.jpg",
        stock=100,
    )
    homebody_sweat_pants_pink = Product (
        product_type_id=26, color="Pink",
        image1="https://img.tobi.com/product_images/md/1/pink-homebody-sweatpants@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/pink-homebody-sweatpants@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/pink-homebody-sweatpants@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/pink-homebody-sweatpants@2x.jpg",
        stock=100,
    )
    homebody_sweat_pants_blue = Product (
        product_type_id=26, color="Royalblue",
        image1="https://img.tobi.com/product_images/md/1/blue-homebody-sweatpants@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/blue-homebody-sweatpants@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/blue-homebody-sweatpants@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/blue-homebody-sweatpants@2x.jpg",
        stock=100,
    )
    homebody_sweat_pants_green = Product (
        product_type_id=26, color="Aquamarine",
        image1="https://img.tobi.com/product_images/md/1/green-homebody-sweatpants@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/green-homebody-sweatpants@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/green-homebody-sweatpants@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/green-homebody-sweatpants@2x.jpg",
        stock=100,
    )
    kory_sports_bra = Product (
        product_type_id=27, color="Jet",
        image1="https://img.tobi.com/product_images/md/1/black-kora-cut-out-back-sports-bra@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/black-kora-cut-out-back-sports-bra@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/black-kora-cut-out-back-sports-bra@2x.jpg",
        stock=100,
    )
    tie_dye_shorts_beige = Product (
        product_type_id=28, color="Beige",
        image1="https://img.tobi.com/product_images/sm/1/beige-come-thru-and-chill-elastic-waistband-sweatshorts@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/beige-come-thru-and-chill-elastic-waistband-sweatshorts@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/beige-come-thru-and-chill-elastic-waistband-sweatshorts@2x.jpg",
        stock=100,
    )
    tie_dye_shorts_rainbow = Product (
        product_type_id=28, color="Pink",
        image1="https://img.tobi.com/product_images/sm/1/rainbow-tie-dye-come-thru-and-chill-elastic-waistband-sweatshorts@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/rainbow-tie-dye-come-thru-and-chill-elastic-waistband-sweatshorts@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/rainbow-tie-dye-come-thru-and-chill-elastic-waistband-sweatshorts@2x.jpg",
        stock=100,
    )
    tie_dye_shorts_blue = Product (
        product_type_id=28, color="Darkslateblue",
        image1="https://img.tobi.com/product_images/sm/1/slate-blue-come-thru-and-chill-elastic-waistband-sweatshorts@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/slate-blue-come-thru-and-chill-elastic-waistband-sweatshorts@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/slate-blue-come-thru-and-chill-elastic-waistband-sweatshorts@2x.jpg",
        stock=100,
    )
    workout_set = Product (
        product_type_id=29, color="Plum",
        image1="https://img.tobi.com/product_images/sm/1/lavender-warm-up-ribbed-one-shoulder-bra-and-biker-shorts-set@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/lavender-warm-up-ribbed-one-shoulder-bra-and-biker-shorts-set@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/lavender-warm-up-ribbed-one-shoulder-bra-and-biker-shorts-set@2x.jpg",
        stock=100,
    )
    medium_wash_jeans = Product (
        product_type_id=30, color="Blue",
        image1="https://img.tobi.com/product_images/sm/1/medium-wash-highland-mid-rise-skinny-jeans@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/medium-wash-highland-mid-rise-skinny-jeans@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/medium-wash-highland-mid-rise-skinny-jeans@2x.jpg",
        stock=100,
    )
    distressed_jeans = Product (
        product_type_id=31, color="Blue",
        image1="https://img.tobi.com/product_images/sm/1/dark-wash-ventura-mid-rise-distressed-cropped-jeans@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/dark-wash-ventura-mid-rise-distressed-cropped-jeans@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/dark-wash-ventura-mid-rise-distressed-cropped-jeans@2x.jpg",
        stock=100,
    )
    boy_jeans = Product (
        product_type_id=32, color="Blue",
        image1="https://img.tobi.com/product_images/sm/1/medium-washed-kirby-vintage-straight-leg-jeans@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/medium-washed-kirby-vintage-straight-leg-jeans@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/medium-washed-kirby-vintage-straight-leg-jeans@2x.jpg",
        stock=100,
    )
    furry_jacket = Product (
        product_type_id=33, color="Navy",
        image1="https://img.tobi.com/product_images/sm/1/navy-ciao-furry-zip-up-jacket@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/navy-ciao-furry-zip-up-jacket@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/navy-ciao-furry-zip-up-jacket@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/navy-ciao-furry-zip-up-jacket@2x.jpg",
        stock=100,
    )
    corduroy_jacket = Product (
        product_type_id=34, color="Red",
        image1="https://img.tobi.com/product_images/sm/1/brick-tori-corduroy-moto-jacket@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/brick-tori-corduroy-moto-jacket@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/brick-tori-corduroy-moto-jacket@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/brick-tori-corduroy-moto-jacket@2x.jpg",
        stock=100,
    )
    fleece_jacket = Product (
        product_type_id=35, color="White",
        image1="https://img.tobi.com/product_images/sm/1/cream-juanita-boxy-fleece-crop-jacket@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/cream-juanita-boxy-fleece-crop-jacket@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/cream-juanita-boxy-fleece-crop-jacket@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/cream-juanita-boxy-fleece-crop-jacket@2x.jpg",
        stock=100,
    )
    pixie_beige = Product (
        product_type_id=36, color="Beige",
        image1="https://img.tobi.com/product_images/sm/1/natural-look-this-way-floral-skirt@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/natural-look-this-way-floral-skirt@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/natural-look-this-way-floral-skirt@2x.jpg",
        stock=100,
    )
    pixie_blue = Product (
        product_type_id=36, color="Lightblue",
        image1="https://img.tobi.com/product_images/sm/1/light-blue-look-this-way-floral-skirt@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/light-blue-look-this-way-floral-skirt@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/light-blue-look-this-way-floral-skirt@2x.jpg",
        stock=100,
    )
    sherbert_skirt = Product (
        product_type_id=37, color="PeachPuff",
        image1="https://img.tobi.com/product_images/sm/1/orange-summer-rays-french-terry-crop-top-and-mini-skirt-set@2x.jpg",
        image2="https://img.tobi.com/product_images/sm/2/orange-summer-rays-french-terry-crop-top-and-mini-skirt-set@2x.jpg",
        image3="https://img.tobi.com/product_images/sm/3/orange-summer-rays-french-terry-crop-top-and-mini-skirt-set@2x.jpg",
        image4="https://img.tobi.com/product_images/sm/4/orange-summer-rays-french-terry-crop-top-and-mini-skirt-set@2x.jpg",
        stock=100,
    )





    db.session.add(jay_ribbed_knit_crop_top_pink_s)
    db.session.add(jay_ribbed_knit_crop_top_yellow_s)
    db.session.add(jay_ribbed_knit_crop_top_white_s)
    db.session.add(charlie_ribbed_cropped_top_white_s)
    db.session.add(abby_maxi_dress_taupe_s)
    db.session.add(france_white_belted_crop_pants_s)
    db.session.add(satin_slit_mini_dress_blue)
    db.session.add(satin_slit_mini_dress_green)
    db.session.add(go_glam_strapless_maxi_dress_purple)
    db.session.add(go_glam_strapless_maxi_dress_emerald)
    db.session.add(go_glam_strapless_maxi_dress_mint)
    db.session.add(floral_keyhole_midi_dress)
    db.session.add(blue_floral_mini_dress)
    db.session.add(multi_floral_ribbed_mini_dress)
    db.session.add(sherbert_dress)
    db.session.add(daisy_flutter_dress)
    db.session.add(valencia_dress)
    db.session.add(daniela_dress_pink)
    db.session.add(daniela_dress_brown)
    db.session.add(satin_cowl_dress_hot_pink)
    db.session.add(satin_cowl_dress_blush)
    db.session.add(satin_cowl_dress_white)
    db.session.add(floral_openback_bodycon_dress_cream)
    db.session.add(floral_openback_bodycon_dress_black)
    db.session.add(green_plaid_dress)
    db.session.add(black_lace_top)
    db.session.add(one_shoulder_bodysuit)
    db.session.add(ivory_halter_top)
    db.session.add(mint_ditsy_top)
    db.session.add(lala_top)
    db.session.add(macie_blouse_top_pink)
    db.session.add(stitch_crop_top_blue)
    db.session.add(stitch_crop_top_pink)
    db.session.add(cream_wide_leg_pants)
    db.session.add(striped_pants)
    db.session.add(homebody_sweat_pants_blue)
    db.session.add(homebody_sweat_pants_green)
    db.session.add(homebody_sweat_pants_pink)
    db.session.add(kory_sports_bra)
    db.session.add(tie_dye_shorts_beige)
    db.session.add(tie_dye_shorts_blue)
    db.session.add(tie_dye_shorts_rainbow)
    db.session.add(workout_set)
    db.session.add(medium_wash_jeans)
    db.session.add(distressed_jeans)
    db.session.add(boy_jeans)
    db.session.add(furry_jacket)
    db.session.add(corduroy_jacket)
    db.session.add(fleece_jacket)
    db.session.add(pixie_beige)
    db.session.add(pixie_blue)
    db.session.add(sherbert_skirt)




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
