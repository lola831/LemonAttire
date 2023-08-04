const GET_USER_STYLES = 'styles/GET_USER_STYLES'
const GET_STYLE = 'styles/GET_STYLE'
const ADD_STYLE = 'styles/ADD_STYLE'

export const loadUserStyles = styles => ({
    type: GET_USER_STYLES,
    payload: styles
})

export const loadStyle = style => ({
    type: GET_STYLE,
    payload: style
})

export const addStyle = style => ({
    type: ADD_STYLE,
    payload: style
})

export const getUserStyles = () => async (dispatch) => {
    console.log("in thunk")
    const response = await fetch(`/api/styles/current`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const styles = await response.json();
        console.log("in thunk response, ", styles)
        dispatch(loadUserStyles(styles));
        return styles;
    } else {
        return response;
    }
}

export const getStyle = (styleId) => async (dispatch) => {
    console.log("in thunk")
    const response = await fetch(`/api/styles/current/${styleId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const style = await response.json();
        console.log("in thunk response, ", style)
        dispatch(loadStyle(style));
        return style;
    } else {
        return response;
    }
}

export const createStyle = data => async (dispatch) => {
    console.log("IN THUNK", data)
    const response = await fetch(`/api/styles/`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        dispatch(getUserStyles())
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
        case GET_USER_STYLES: {
            newState = action.payload.user_styles
            return newState
        }
        case ADD_STYLE: {
            newState = {
                ...state,
                [action.payload.id]: action.payload
            }
            return newState;
        }
        case GET_STYLE: {
            newState = action.payload
            return newState
        }
        default:
            return state;
    }
}


export default stylesReducer
