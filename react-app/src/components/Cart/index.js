import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentOrder } from "../../store/orders";
import { modifyItem } from "../../store/orders";
import "./Cart.css"

function Cart() {

  const dispatch = useDispatch();
  const order = useSelector(state => state.orders)
  // const [quantity, setQuantity] = useState()
  // const addOne = () => setQuantity(quantity + 1)
  // const minusOne = () => setQuantity(quantity - 1)

  useEffect(() => {
    dispatch(getCurrentOrder())
  }, [dispatch]);

  console.log("ORDER: ", order)

  const addOne = (item) => {
    let quantity = item.quantity + 1;
    let total_price = item.price * quantity;
    let data = {
      quantity,
      total_price
    }
    dispatch(modifyItem(order.id, item.id, data))
  }
  const minusOne = (item) => {
    let quantity = item.quantity - 1;
    let total_price = item.price * quantity;
    let data = {
      quantity,
      total_price
    }
    dispatch(modifyItem(order.id, item.id, data))
  }

  if (Object.keys(order).length) {


    return (
      <div className="cart-container">
        {
          order.orderItems.map((item, i) => (

            <div key={i} className="order-item-container">
              <img className="order-item-img" src={item.image}></img>

              <div className="order-item-info">
                <div>{`${item.name}`}</div>
                <div className="order-item-color-size">{`${item.color}`}, {`${item.size}`}</div>
                <div className="order-item-price">${`${item.total_price}`}</div>

                <div className="quantity-container">
                        <div>Qty: </div>
                        <button className="add" onClick={() => addOne(item)}>
                        <i className="fa-solid fa-plus"></i>
                        </button>
                        <div className="number">{item.quantity}</div>
                        <button className="subtract" onClick={() => minusOne(item)}>
                        <i class="fa-solid fa-minus"></i>
                        </button>
                        </div>

              </div>
            </div>
          ))
        }
      </div>
    )
  } else {
    return <>Loading...</>
  }
}

export default Cart
