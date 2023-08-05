import { React, useState } from 'react'
import { Link } from 'react-router-dom'

function DisplayProducts( { productValues }) {
    const [color, setColor] = useState("")
    console.log("PRODUCT VALS: ", productValues)

  return (
    <div className='product-cards'>
    {
      productValues.map(product => (

          <div className='card-container'>
             <Link to={`/shop/${product.product.id}`} key={product.product.id}>
            <img alt=""
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
                    product.product.products.map(item => (
                      <>
                      <div key={item.id} onClick={() => setColor(item)}>

                      <i
                      className="fa-solid fa-circle"
                      style={{color: `${item.color}`}}
                      >
                      </i>

                      </div>
                      </>
                    ))
                  }
                </>

              )
            }
          </div>

      ))
    }
  </div>
  )
}

export default DisplayProducts
