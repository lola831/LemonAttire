import { React, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { deleteStyleItem } from '../../store/styles'

function DisplayStyleItems( { productValues }) {
    const dispatch = useDispatch()
    const [color, setColor] = useState("")
    const [isDeleted, setIsDeleted] = useState(false)
    console.log("PRODUCT VALS: ", productValues)

    // if (isDeleted) {
    //     console.log("NO STYLE ON DETAILS PAGE REDIRECT TO STYLE PAGE")
    //     return <Redirect to="/styles"></Redirect>
    //   }

    const removeStyleItem = async (styleId, styleItemId) => {
        console.log("style id ", styleId)
        console.log("style item id: ", styleItemId)
        dispatch(deleteStyleItem(styleId, styleItemId))
        // setIsDeleted(true)
      }

  return (
    <div className='product-cards'>
    {
      productValues.map((product, i) => (

          <div key={i} className='card-container'>
             <Link to={`/shop/${product.product.id}`} >
            <img alt="product"
            className='card-img'
            id="img-change-color"
            src={color.product_type_id === product.product.id ? color.image1 : `${product.product.products[0].image1}`}
            onMouseOver={e => (color.product_type_id === product.product.id ? e.currentTarget.src = color.image2 : e.currentTarget.src = `${product.product.products[0].image2}`)}
            onMouseOut={e => (color.product_type_id === product.product.id ? e.currentTarget.src = color.image1 : e.currentTarget.src = `${product.product.products[0].image1}`)}>
            </img>
            </Link>
            <div className='card-name'>{`${product.product.name}`}</div>
            <div className='card-price'>{`${product.product.price}`}</div>
            {
              product.product.products.length > 1 && (
                <>
                  {
                    product.product.products.map((item, i) => (
                      <div key={i}>
                      <div onClick={() => setColor(item)}>

                      <i
                      className="fa-solid fa-circle"
                      style={{color: `${item.color}`}}
                      >
                      </i>
                      </div>
                      </div>
                    ))
                  }
                </>

              )
            }

                <button onClick={() => removeStyleItem(product.stylesId, product.id)}>Remove Item from Style</button>

          </div>

      ))
    }
  </div>
  )
}

export default DisplayStyleItems
