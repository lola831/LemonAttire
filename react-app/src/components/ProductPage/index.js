import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductType } from "../../store/productType";
// import EditReviewForm from "../../Reviews/EditReview";
// import DeleteReviewForm from "../../Reviews/DeleteReview";
// import ReservationForm from "../../ReservationForm";
import { getUserFavorites, addFavorites, deleteFavorites } from "../../store/favorites";

// import OpenModalButton from "../OpenModalButton";
import AddOrderItem from "../AddOrderItem";
import './ProductPage.css'
import "../../App.css";

const ProductPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const productType = useSelector(state => state.productType);
    const favorites = useSelector(state => state.favorites);
    const user = useSelector(state => state.session.user);
    const [loadingFavorites, setLoadingFavorites] = useState(true);
    const [favorite, setFavorite] = useState(false);
    const [item, setItem] = useState("")
    const [size, setSize] = useState("")
    const [imageIndex, setImageIndex] = useState("")
    const [orderItem, setOrderItem] = useState({})


    let index = 0;

    useEffect(() => {
        dispatch(getProductType(id));
        if (user) {
            dispatch(getUserFavorites())
                .then(() => setLoadingFavorites(false))
                .catch((error) => {
                    console.log("Error fetching favorites:", error);
                    setLoadingFavorites(false);
                });
        } else {
            setLoadingFavorites(false);
        }
    }, [dispatch, id, user]);

    console.log("PRODUCT TYPE: ", productType)
    console.log("favorites: ", favorites)
    console.log("USER: ", user)
    console.log("ITEM: ", item)

    // checks if product is in user's favorites
    useEffect(() => {
        if (user && favorites.length) {
            for (let i = 0; i < favorites.length; i++) {
                console.log("id: ", favorites[i].product_type_id)
                console.log("id: ", id)
                if (favorites[i].product_type_id == id) {
                    setFavorite(true)
                }
                console.log("FAVORITE???? ", favorite)
            }
        }
    }, [favorites, id, user]);

    const addFav = () => {
        let productId = 1;
        if (index != 0) productId = index;
        let image = productType.products[productId-1].image1
        console.log("PRODUCT ID: ", productId)
        console.log("PRODUCT TYPE ID: ", productType.id)
        console.log("IMAGGEEEE, ", image)
        dispatch(addFavorites(productType.id, productId, image))
            .then(() => dispatch(getUserFavorites()))
            .then(() => setFavorite(true))
            .catch((error) => console.log("Error adding favorite: ", error));
    };

    const deleteFav = () => {
        let favId;
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].product_type_id == id) {
                favId = favorites[i].id
            }
        }
        dispatch(deleteFavorites(favId))
            .then(() => dispatch(getUserFavorites()))
            .then(() => setFavorite(false))
            .catch((error) => console.log("Error deleting favorite: ", error));

    };

    const addItem = () => {

    }

    if (Object.keys(productType).length) {
        let products = productType.products

        // if (products.length < 2 ) {
        //     setOrderItem(products[0])
        // }

        console.log("ORDER ITEMMMMMM: ", orderItem)



        let images;
        let imagesArray = [];
        for (let i = 0; i < products.length; i++) {
            images = products[i].images.filter(Boolean)
            imagesArray.push(images)
        }

        if (loadingFavorites && !user) {
            return <div>Loading favorites....</div>
        }

        // let index = 0;
        if (item) index = item.id - 1;
        console.log("INDEX: ", index)
        console.log("IMAGEINDEX: ", imageIndex)

        return (
            <div className="product-page-container">
                <div className="product-area">
                    <div className="product-img-container">
                        <div className="product-small-area">
                            {imagesArray[index].map((img, i) => (
                                <img key={i} className="product-img-small" src={`${img}`} onMouseOver={() => setImageIndex(i)}></img>
                            ))}
                        </div>
                        <div className="product-img-big-container">
                            <img className="product-img-big" src={imageIndex ? `${imagesArray[index][imageIndex]}` : `${imagesArray[index][0]}`}></img>
                            {
                                user && (
                                    <>
                                        {
                                            favorite ? (
                                                <button className="fav-button" onClick={deleteFav}>
                                                    <i className="fa-solid fa-heart"></i>
                                                </button>
                                            ) : (
                                                <button className="fav-button" onClick={addFav}>
                                                    <i className="far fa-heart"></i>
                                                </button>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <div className="product-info">
                        <div className="product-name">{`${productType.name}`}</div>
                        <div>${`${productType.price}`}</div>
                        {
                            productType.products.length > 1 && (
                                <>
                                    {productType.products.map(item => (
                                        <>
                                            <div className="color-options" key={item.id} onMouseOver={() => setItem(item)}>
                                            <input type="checkbox" className="color-circle" key={item.id} style={{ backgroundColor: `${item.color}` }} onClick={() => setItem(item)} onMouseOver={() => setItem(item)}></input>
                                            </div>
                                        </>
                                    ))}
                                </>
                            )
                        }
                        <button className="circle" onClick={() => setSize("Small")}>S</button>
                        <button className="circle" onClick={() => setSize("Medium")}>M</button>
                        <button className="circle" onClick={() => setSize("Large")}>L</button>
                        <button onClick={addItem} >ADD TO BAG</button>
                        <div>DESCRIPTION
                            <div>{`${productType.description}`}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <div>Loading....</div>
    }
}

export default ProductPage;
