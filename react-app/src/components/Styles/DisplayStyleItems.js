import { React, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteStyleItem } from '../../store/styles'
import "./DisplayStyleItems.css"


function DisplayStyleItems({ productValues }) {
  const dispatch = useDispatch()
  const [color, setColor] = useState("")
  const [isDeleted, setIsDeleted] = useState(false)
  const removeStyleItem = async (styleId, styleItemId) => {
    dispatch(deleteStyleItem(styleId, styleItemId))
  }

  return (
    <div className='product-cards style-i-cards'>
      {
        productValues.map((product, i) => (

          <div key={i} className='card-container style-i-card-container'>
            <Link to={`/shop/${product.product.id}`} >
              <img
                loading="lazy"
                alt="product"
                className='card-img card-i-image'
                id="img-change-color"
                src={color.product_type_id === product.product.id ? color.image1 : `${product.product.products[0].image1}`}
                onMouseOver={e => (color.product_type_id === product.product.id ? e.currentTarget.src = color.image2 : e.currentTarget.src = `${product.product.products[0].image2}`)}
                onMouseOut={e => (color.product_type_id === product.product.id ? e.currentTarget.src = color.image1 : e.currentTarget.src = `${product.product.products[0].image1}`)}>
              </img>
            </Link>
            <div className='style-i-info'>
              <div className='card-name style-i-card-name'>{`${product.product.name.toLowerCase()}`}</div>
              <div className='card-price style-i-card-price'>${`${product.product.price}`}.00</div>
              <div className='color-style-i-box'>
                {
                  product.product.products.length > 1 && (
                    <div className='style-i-colors'>
                      {
                        product.product.products.map((item, i) => (
                          <div className='all-prods-color-container-i' key={i}>
                            <div onClick={() => setColor(item)}>

                              <i
                                className="fa-solid fa-circle style-i"
                                style={{ color: `${item.color}` }}
                              >
                              </i>
                            </div>
                          </div>
                        ))
                      }
                    </div>

                  )
                }
              </div>
              <div className='style-i-remove-container'>
                <button className='store-button style-i-remove-button' onClick={() => removeStyleItem(product.stylesId, product.id)}>remove</button>
              </div>
            </div>
          </div>

        ))
      }
    </div>
  )
}

export default DisplayStyleItems
