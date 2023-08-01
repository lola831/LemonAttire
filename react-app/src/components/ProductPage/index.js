import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductType } from "../../store/productType";
// import EditReviewForm from "../../Reviews/EditReview";
// import DeleteReviewForm from "../../Reviews/DeleteReview";
// import OpenModalButton from "../../OpenModalButton";
// import ReservationForm from "../../ReservationForm";
import { getUserFavorites, addFavorites, deleteFavorites } from "../../store/favorites";
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
    const [color, setColor] = useState("")
    const [item, setItem] = useState("")

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

    if (Object.keys(productType).length) {
        let products = productType.products
        let images;
        let imagesArray = [];
        for (let i = 0; i < products.length; i++) {
            images = products[i].images.filter(Boolean)
            imagesArray.push(images)
        }

        // let reviews = "Reviews";
        // if (restaurant.reviews.length === 1) reviews = "Review";

        // star rating
        // const fullStars = Math.floor(restaurant.averageRating);
        // const starArr = [];
        // for (let i = 1; i <= fullStars; i++) {
        //     starArr.push(1);
        // }
        // if (restaurant.averageRating < 5) {
        //     const partialStar = restaurant.averageRating - fullStars;
        //     starArr.push(partialStar);
        //     const emptyStars = 5 - starArr.length;
        //     for (let i = 1; i <= emptyStars; i++) {
        //         starArr.push(0);
        //     }
        // }

        // const monthNames = ["January", "February", "March", "April", "May", "June",
        // "July", "August", "September", "October", "November", "December"
        // ];

        // const convertDate = (date) => {
        //     const month = monthNames[new Date(date).getMonth()];
        //     const year = new Date(date).getFullYear();

        //     return (
        //         <p className="reviews-date">{month} {year}</p>
        //     )
        // }

        // const makeStars = (rating) => {
        //     const starArr = [];
        //     for (let i = 1; i <= 5; i++) {
        //         if (i <= rating) {
        //             starArr.push(<i key={i} className='fa-solid fa-star '></i>);
        //         } else {
        //             starArr.push(<i key={i} className='fa-regular fa-star'></i>);
        //         }
        //     }
        //     return starArr;
        // }



        // console.log("STARRRRR", starArr)
        if (loadingFavorites && !user) {
            return <div>Loading favorites....</div>
        }

        // let index = 0;
        if (color) index = color.id - 1;
        console.log("INDEX: ", index)
        console.log("ITEM: ", item)

        return (
            <div className="product-page-container">
                <div className="product-area">
                    <div className="product-img-container">
                        <div className="product-small-area">
                            {imagesArray[index].map((img, i) => (
                                <img key={i} className="product-img-small" src={`${img}`} onMouseOver={() => setItem(i)}></img>
                            ))}
                        </div>
                        <div className="product-img-big-container">
                            <img className="product-img-big" src={item ? `${imagesArray[index][item]}` : `${imagesArray[index][0]}`}></img>
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
                                            <div key={item.id} onClick={() => setColor(item)} onMouseOver={() => setColor(item)}>
                                                <i className="fa-solid fa-circle" style={{ color: `${item.color}` }}></i>
                                            </div>
                                        </>
                                    ))}
                                </>
                            )
                        }
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
