
// Action Types
const GET_CURRENT_ORDER = 'orders/GET_CURRENT_ORDER'
const GET_USER_ORDERS = 'orders/GET_USER_ORDERS';
const ADD_ORDER = 'orders/ADD_ORDER';
const DELETE_ORDER = 'orders/DELETE_ORDER';

// Action Creators
export const currentOrder = (order) => ({
    type: GET_CURRENT_ORDER,
    payload: order
})

export const loadOrders = (orders) => ({
    type: GET_USER_ORDERS,
    payload: orders
});

export const addOrder = (order) => ({
    type: ADD_ORDER,
    payload: order
});

export const deleteOrder = (order) => ({
    type: DELETE_ORDER,
    payload: order
})

// Thunks
export const getCurrentOrder = () => async (dispatch) => {
    console.log("in thunk")
    const response = await fetch(`/api/orders/current/pending`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const order = await response.json();
        console.log("in thunk response, ", order)
        dispatch(currentOrder(order));
        return order;
    }else {
        return response;
    }
}

export const getUserOrders = () => async (dispatch) => {
    console.log("in thunk")
    const response = await fetch(`/api/orders/current`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const orders = await response.json();
        console.log("in thunk response, ", orders)
        dispatch(loadOrders(orders));
        return orders;
    }else {
        return response;
    }
}

export const newOrder = data => async dispatch => {
    console.log("in thunk, data", data)
    const response = await fetch(`/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const order = await response.json();
        console.log("response!!!!! ", order)
        dispatch(addOrder(order));
        return order;
    }else {
        return response;
    }
}

export const modifyOrder = (order) => async dispatch => {
    // console.log("HERE")
         const response = await fetch(`/api/orders/${order.id}`, {
           method: 'PUT',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(order)
         });
        //  console.log("MODIFY ORDER RESPONSE", response)
         if (response.ok){
        //    dispatch(getSpotDetails(spot.id));
        //    dispatch(getAllSpots());
        //    dispatch(getSpotsUser());
           return response;
         } else {
          return response;
         }
     };

export const removeOrder = (orderId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          }
    });
    return response;
    // if (response.ok){
    //     // console.log("here after  delete order fetch")
    //     //  dispatch(getAllSpots());
    //     // //  dispatch(getSpotsUser());
    //      return response;
    //    }else {
    //     return response;
    //    }
}

const initialState = [];

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USER_ORDERS: {
          return action.payload.orders;
        }
      case GET_CURRENT_ORDER: {
          return action.payload.order;
        }
      case ADD_ORDER: {
        return [...state, action.payload];
      }
      case DELETE_ORDER: {
        return state.filter((order) => order.id !== action.payload);
      }
      default:
        return state;
    }
  };

export default ordersReducer;
