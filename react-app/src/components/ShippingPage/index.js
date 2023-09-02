import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
function ShippingPage() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
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

    const handleSubmit = async (e) => {
        e.PreventDefault();
        const data = await dispatch()
    }

  return (
    <div>
    <div>Shipping Address</div>
    <form>
       <label>
        Street Address
       </label>
       <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required>
       </input>

       <label>
        City
       </label>
       <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required>
       </input>

       <label>
        State
       </label>
       <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required>
       </input>

       <label>
        ZIP Code
       </label>
       <input
        type="text"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        required>
       </input>

       <div>Payment Details</div>

       <label>
        Card Number
       </label>
       <input
        type="text"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        required>
       </input>

       <label>
       Expiration Date (MM/YY)
       </label>
       <input
        type="text"
        value={expDate}
        onChange={(e) => setExpDate(e.target.value)}
        required>
       </input>

       <label>
        Security Code (CVV)
       </label>
       <input
        type="text"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        required>
       </input>

    </form>

    </div>
  )
}

export default ShippingPage
