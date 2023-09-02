import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { submitOrder } from '../../store/orders';
import "./ShippingPage.css"

function ShippingPage() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const order = useSelector(state => state.orders)
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [cardnumber, setCardnumber] = useState("")
    const [expDate, setExpDate] = useState("")
    const [cvv, setCvv] = useState("")


    if (!user) return (
        <Redirect to='/login'></Redirect>
    )

    const handleSubmit = () => {
        dispatch(submitOrder(order.id))
    }
    console.log("user", user)

    if (!order) {
        return (
            <div className='order-conf-container'>
                <div className='order-conf-title'>Order Confirmation</div>
                <div>Order Number: #8485950505</div>
                <div>{user.firstName}, thank you for your order!</div>
                <div className='conf-msg'>We've received your order and will contact you as soon as your package is shipped. You'll soon receive a confirmation email in your inbox.</div>
                <Link className='new-order' to="/">Place a new order!</Link>
            </div>
        )
    }


    if (order && Object.keys(order).length) {
        return (
            <div className='shipping-container'>

                <form className='shipping-form'>

                    <div className='shipping-name'>Shipping Address</div>

                    <div className='shipping-input'>
                        <label>
                            Street Address:
                        </label>
                        <input
                            className='ship-input long-input'
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required>
                        </input>
                    </div>

                    <div className='shipping-input'>
                        <label>
                            City:
                        </label>
                        <input
                            className='ship-input long-input'
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required>
                        </input>
                    </div>

                    <div className='shipping-input'>
                        <label>
                            State:
                        </label>
                        <input
                            className='ship-input short-input'
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required>
                        </input>
                    </div>

                    <div className='shipping-input zip'>
                        <label>
                            ZIP Code:
                        </label>
                        <input
                            className='ship-input short-input'
                            type="text"
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                            required>
                        </input>
                    </div>

                    <div className='payment-details'>Payment Details</div>

                    <div className='shipping-input'>
                        <label>
                            Card Number:
                        </label>
                        <input
                            className='ship-input long-input'
                            type="text"
                            value={cardnumber}
                            onChange={(e) => setCardnumber(e.target.value)}
                            required>
                        </input>
                    </div>

                    <div className='shipping-input'>
                        <label>
                            Expiration Date (MM/YY):
                        </label>
                        <input
                            className='ship-input short-input'
                            type="text"
                            value={expDate}
                            onChange={(e) => setExpDate(e.target.value)}
                            required>
                        </input>
                    </div>

                    <div className='shipping-input cvv'>
                        <label>
                            Security Code (CVV):
                        </label>
                        <input
                            className='ship-input short-input'
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required>
                        </input>
                    </div>

                    <button onClick={handleSubmit} className='store-button-white'>Place Order</button>

                </form>

                <div className='order-sum-box'>
                    <div className="order-summary-container">
                        <div className="order-summary">Order Summary</div>
                        <div className="order-price">
                            subtotal:<span>${order.price}.00</span>
                        </div>
                        <div className="order-price">
                            tax:<span>${order.tax.toFixed(2)}</span>
                        </div>
                        <div className="order-price total">
                            total price:<span>${order.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }

}

export default ShippingPage
