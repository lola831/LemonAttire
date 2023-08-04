const ADD_STYLE = 'styles/ADD_STYLE'

export const addStyle = style => ({
    type: ADD_STYLE,
    payload: style
})

export const createStyle = data => async (dispatch) => {
    const response = await fetch(`/api/styles/`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        const style = await response.json();
        dispatch(addStyle(style))
        return style;
    }else {
        return response
    }
}

const initialState = [];

const stylesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_STYLE: {
            newState = state;
            newState.push(action.payload)
            return newState;
        }
        default:
            return state;
    }
}


export default stylesReducer
