const SET_BAG = 'bag/SET_BAG'
const EDIT_BAG = 'bag/EDIT_BAG'


export const setBag = (bag) => ({
    type: SET_BAG,
    payload: bag
});

export const editBag = (bag) => ({
    type: EDIT_BAG,
    payload: bag
})

const initialState = 0

const bagReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BAG:
            console.log("in set bag")
            return action.payload;
        case EDIT_BAG:
            console.log("in edit bag")
            return action.payload;
        default:
            return state;
    }
}

export default bagReducer;
