const ADD_STYLE = 'styles/ADD_STYLE'

export const addStyle = style => ({
    type: ADD_STYLE,
    payload: style
})

export const createStyle = data => async (dispatch) => {
    console.log("IN THUNK", data)
    const response = await fetch(`/api/styles/`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        const style = await response.json();
        console.log("style response: ", style)
        dispatch(addStyle(style))
        return style;
    }else if (response.status < 500) {
		const data = await response.json();
        console.log("DATAAAAAAAAAAAA:", data)
		if (data.errors) {
            console.log("DATA ERRORS:", data.errors)
			return data;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

const initialState = [];

const stylesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_STYLE: {
            newState = {
                ...state,
                [action.payload.id]: action.payload
            }
            return newState;
        }
        default:
            return state;
    }
}


export default stylesReducer
