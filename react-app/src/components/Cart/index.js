import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentOrder, modifyItem, deleteItem } from "../../store/orders";
import OpenModalButton from "../OpenModalButton";
import DeleteOrder from "../DeleteOrder";

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
    let add = item.price;
    let data = {
      quantity,
      total_price,
      add
    }
    dispatch(modifyItem(order.id, item.id, data))
  }
  const minusOne = (item) => {
    let quantity = item.quantity - 1;
    let total_price = item.price * quantity;
    let minus = item.price
    let data = {
      quantity,
      total_price,
      minus
    }
    dispatch(modifyItem(order.id, item.id, data))
  }

  const removeItem = (item) => {
    console.log("Order  id : ", order.id)
    console.log("ITEM $$$$$$$$$$$ : ", item)
    dispatch(deleteItem(order.id, item))


  }

  if (Object.keys(order).length) {


    return (
      <div className="cart-container">
        {
          order.orderItems.map((item, i) => (

            <div key={i} className="order-item-container">
              <Link to={`/shop/${item.productTypeId}`}>
              <img className="order-item-img" src={item.image}></img>
              </Link>
              <div className="order-item-info">
                <div>{`${item.name}`}</div>
                <div className="order-item-color-size">{`${item.color}`}, {`${item.size}`}</div>
                <div className="order-item-price">${`${item.total_price}`}</div>

                <div className="quantity-container">
                        <div>Qty: </div>
                        <button className="add" disabled={item.quantity >=10 ? true : false} onClick={() => addOne(item)}>
                        <i className="fa-solid fa-plus"></i>
                        </button>
                        <div className="number">{item.quantity}</div>
                        <button className="subtract" disabled={item.quantity <= 1 ? true : false} onClick={() => minusOne(item)}>
                        <i class="fa-solid fa-minus"></i>
                        </button>
                </div>
                <button onClick={() => removeItem(item)}>Remove</button>

              </div>
            </div>
          ))
        }
        <div className="order-summary-container">
        <div>ORDER SUMMARY</div>
        <div>PRICE: ${order.price}</div>
        <div>TAX: ${order.tax}</div>
        <div>TOTAL PRICE: ${order.totalPrice}</div>
        </div>


            <OpenModalButton
              buttonText="EMPTY BAG"
              modalComponent={<DeleteOrder order={order}/>}
            />

      </div>
    )
  } else {
    return (
    <div>
      <div>Your Shopping bag is currently empty.</div>
      <Link to="/shop">
        <button>
          CONTINUE SHOPPING
        </button>
      </Link>
    </div>
    )
  }
}

export default Cart
