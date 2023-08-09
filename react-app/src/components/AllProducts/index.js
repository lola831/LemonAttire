import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { getAllProductsThunk } from "../../store/products";
import "./AllProducts.css"
import "../../App.css";



function AllProducts() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [color, setColor] = useState("")
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const products = useSelector(state => state.products)
  const productValues = Object.values(products)

  useEffect(() => {
    dispatch(getAllProductsThunk(category));
  }, [dispatch, category])

  console.log("products ", products)
  console.log("prod vals ", productValues)
  console.log("COLORR=============", color)

  // const changeImage = (product) => {
  //   console.log("HEREEEE PRODUCT----- ", product.image1)
  //   // document.getElementById("img-change-color").src = product.image1
  //   setColor(product.image1)
  // }


  return (

    <div className='all-prods-container'>

      <div className='product-cards'>
        {
          productValues.map(product => (

            <div className='card-container'>
              <div>
              <Link className='all-prod-link-prod' to={`/shop/${product.id}`} key={product.id}>
                <img alt=""
                  className='card-img'
                  id="img-change-color"
                  src={color.product_type_id === product.id ? color.image1 : `${product.products[0].image1}`}
                  onMouseOver={e => (color.product_type_id === product.id ? e.currentTarget.src = color.image2 : e.currentTarget.src = `${product.products[0].image2}`)}
                  onMouseOut={e => (color.product_type_id === product.id ? e.currentTarget.src = color.image1 : e.currentTarget.src = `${product.products[0].image1}`)}>
                </img>
              </Link>
              </div>
              <div className='all-prods-info'>
                <div className='card-name'>{`${product.name.toLowerCase()}`}</div>
                <div className='card-price'>${`${product.price}`}.00</div>
                <div>
                  {
                    product.products.length > 1 && (
                      <div className="all-prods-color-container">
                        {
                          product.products.map(item => (

                            <div key={item.id} className="all-prods-color-container" onClick={() => setColor(item)}>

                              <i
                                className="fa-solid fa-circle"
                                style={{ color: `${item.color}` }}
                              >
                              </i>

                            </div>

                          ))
                        }
                      </div>


                    )
                  }
                </div>
              </div>
            </div>

          ))
        }
      </div>
    </div>

  )
}

export default AllProducts
