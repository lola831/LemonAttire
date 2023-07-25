const GET_CATEGORIES = "categories/GET_CATEGORIES";

export const getCategories = (categories) => ({
    type: GET_CATEGORIES,
    payload: categories,
})

export const getCategoriesThunk = () => async (dispatch) => {
    console.log("IN THUNK: ==========================> ")

    const response = await fetch(`/api/categories`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const categories = await response.json();
        console.log("THUNK RESPNSEEE, ", categories)
        dispatch(getCategories(categories))
        return categories;
    }
}

const initialState = []

const categoriesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_CATEGORIES:
            newState = [ ...state ];
            newState.push(...action.payload.categories)
            return newState;
        default:
            return state;
    }
}

export default categoriesReducer;
