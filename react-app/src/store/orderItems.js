
// Action Types
const GET_ORDER_ITEM = 'orderItems/GET_ORDER_ITEM'
const GET_ORDER_ITEMS = 'orderItems/GET_ORDER_ITEMS';
// const ADD_ORDER_ITEM = 'orderItems/ADD_ORDER_ITEM';
const DELETE_ORDER_ITEM = 'orderItems/DELETE_ORDER_ITEMS';

// Action Creators
export const getOrderItem = (orderItem) => ({
    type: GET_ORDER_ITEM,
    payload: orderItem
})

export const getOrderItems = (orderItems) => ({
    type: GET_ORDER_ITEMS,
    payload: orderItems
});

// export const addOrderItem = (orderItem) => ({
//     type: ADD_ORDER_ITEM,
//     payload: orderItem
// });

export const deleteOrderItem = (orderItem) => ({
    type: DELETE_ORDER_ITEM,
    payload: orderItem
})

// Thunks
export const getOrderItemsThunk = (orderId) => async dispatch => {
    console.log("in thunk")
    const response = await fetch(`/api/orders/${orderId}/order_items`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const orderItems = await response.json();
        console.log("in thunk response, ", orderItems)
        dispatch(getOrderItems(orderItems));
        return orderItems;
    }else {
        return response;
    }
}

// export const getOrderItemThunk = () => async (dispatch) => {
//     console.log("in thunk")
//     const response = await fetch(`/api/orders/current`, {
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     });
//     if (response.ok) {
//         const orders = await response.json();
//         console.log("in thunk response, ", orders)
//         dispatch(loadOrders(orders));
//         return orders;
//     }
// }

// export const newOrderItem = (data, orderId) => async dispatch => {
//     console.log("in thunk, data = ", data)
//     console.log("ORDER ID: ", orderId)

//     const response = await fetch(`/api/orders/${orderId}/order_items/`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//     });

//     if (response.ok) {
//         const orderItem = await response.json();
//         console.log("response!!!!! ", orderItem)
//         dispatch(addOrderItem(orderItem));
//         return orderItem;
//     }else {
//         return response
//     }
// }

export const removeOrderItem = (orderId, orderItemId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}/order_items/${orderItemId}`, {
        method: 'DELETE',
    });

    dispatch(deleteOrderItem(orderItemId));
    return response;
}

const initialState = {};

const orderItemsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case GET_ORDER_ITEMS: {
          return action.payload.orderItems;
        }
      case GET_ORDER_ITEM: {
          return action.payload.orderItem;
        }
    //   case ADD_ORDER_ITEM: {
    //     newState = {...state};
    //     newState = action.payload
    //     return newState;
    //   }
      case DELETE_ORDER_ITEM: {
        return state.filter((orderItem) => orderItem.id !== action.payload);
      }
      default:
        return state;
    }
  };

export default orderItemsReducer;
