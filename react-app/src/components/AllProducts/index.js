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


  let category = new URLSearchParams(location.search).get('category');
  console.log("PARAMS: ", category)

  const products = useSelector(state => state.products)
  let productValues = Object.values(products)

  console.log("PRODUCTSSS", products)

  useEffect(() => {
    dispatch(getAllProductsThunk(category));
  }, [dispatch, category])


  console.log("PROD VALS ", productValues)
  if (category === "View All") category = null;


  return (
    <>

    {category &&  <h1 className='page-header'>{category}
      {/* <img alt="dress" className='dress-img' src="https://media.istockphoto.com/id/1324859934/photo/a-tourist-woman-in-a-red-dress-and-hat-sits-on-a-balcony-in-the-village-of-oia-santorini.jpg?s=2048x2048&w=is&k=20&c=P5H9M2BpVqT7lMaAG5-Hk9qPvpRFNeNfbKXDAljPG0A="></img> */}

    </h1>}
    <div className='all-prods-container'>

      <div className='product-cards'>
        {
         productValues.length ? productValues.map(product => (

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
                <div className='card-name'>{`${product.name}`}</div>
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

          )) : (
            <div className='no-prods-container'> Coming soon!
              </div>
          )
        }
      </div>
    </div>
    </>
  )

}

export default AllProducts
