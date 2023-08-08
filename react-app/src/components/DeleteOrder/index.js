import React from 'react'
import { useModal } from '../../context/Modal'
import { getCurrentOrder, removeOrder } from '../../store/orders'
import { useDispatch } from 'react-redux'

function DeleteOrder({ order, bag, updateBag }) {
    console.log("ORDER: ", order)
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const emptyBag = () => {
        updateBag(0)
        dispatch(removeOrder(order.id))
        dispatch(getCurrentOrder())
        closeModal()
    }

  return (
    <div>
    <div>Are you sure you want to empty your bag?</div>
    <button onClick={emptyBag}>Yes, I'm sure</button>
    <button onClick={closeModal} >Ooops, no I don't</button>
    </div>
  )
}

export default DeleteOrder
