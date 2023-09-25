const SET_BAG = 'bag/SET_BAG'
const EDIT_BAG = 'bag/EDIT_BAG'
const GET_BAG = 'bag/GET_BAG'


export const setBag = (bag) => ({
    type: SET_BAG,
    payload: bag
});

export const editBag = (bag) => ({
    type: EDIT_BAG,
    payload: bag
})

export const getBag = () => ({
    type: GET_BAG
})

const initialState = 0

const bagReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BAG:

            return action.payload;
        case EDIT_BAG:

            return action.payload;
        case GET_BAG:
            return state;
        default:
            return state;
    }
}

export default bagReducer;
