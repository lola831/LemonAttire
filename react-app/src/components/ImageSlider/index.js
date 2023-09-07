import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getAllProductsThunk } from '../../store/products';
import "./ImageSlider.css"

function ImageSlider({ productType, category }) {

    const dispatch = useDispatch();
    const sliderRef = useRef(null);
    const scrollAmount = 100;

    useEffect(() => {
        dispatch(getAllProductsThunk(category))
    }, [dispatch, category])

const products = useSelector(state => state.products)

console.log()
console.log("products", products)
console.log("product type! ", productType)






if (Object.keys(products).length) {

    delete products[productType]

    let productValues = Object.values(products)


    return (
        <div className="slider-container">
        {/* Left navigation button */}
          <button
            className="slider-btn"
            onClick={() => {
              const container = sliderRef.current;
              container.scrollLeft -= scrollAmount; // Scroll left by the specified amount
            }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        {/* Image container */}
          <div className="slider-images-container" ref={sliderRef}>
            {
                productValues.length && productValues.map(product => (
                    <Link className='all-prod-link-prod' to={`/shop/${product.id}`} key={product.id}>
                        <img
                        alt="sliderImage"
                        className='image-slider'
                        key={product.id}
                        src={`${product.products[0].image1}`}
                        onMouseOver={e => (e.currentTarget.src = `${product.products[0].image2}`)}
                        onMouseOut={e => (e.currentTarget.src = `${product.products[0].image1}`)}>
                    </img>
                    </Link>
                ))
            }
          </div>
        {/* Right navigation button */}
          <button
            className="slider-btn"
            onClick={() => {
              const container = sliderRef.current;
              container.scrollLeft += scrollAmount; // Scroll right by the specified amount
            }}
          >
           <i className="fa-solid fa-chevron-right"></i>
          </button>
       </div>
      )
}else {
    return <div>Loading...</div>
}


}

export default ImageSlider
