const GET_USER_STYLES = 'styles/GET_USER_STYLES'
const GET_STYLE = 'styles/GET_STYLE'
const ADD_STYLE = 'styles/ADD_STYLE'
const ADD_STYLE_ITEM = 'styles/ADD_STYLE_ITEM';
const GET_STYLE_ITEMS = 'styles/GET_STYLE_ITEMS'
const EDIT_STYLE = 'styles/EDIT_STYLE'
const REMOVE_STYLE = 'styles/REMOVE_STYLE'

export const loadUserStyles = styles => ({
    type: GET_USER_STYLES,
    payload: styles
})

export const loadStyleItems = styleItems => ({
    type: GET_STYLE_ITEMS,
    payload: styleItems
})

export const loadStyle = style => ({
    type: GET_STYLE,
    payload: style
})

export const addStyle = style => ({
    type: ADD_STYLE,
    payload: style
})

export const addStyleItem = styleItem => ({
    type: ADD_STYLE_ITEM,
    payload: styleItem
});

export const editStyle = (style) => ({
    type: EDIT_STYLE,
    payload: style
})

export const removeStyle = styleId => ({
    type: REMOVE_STYLE,
    payload: styleId
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
        if (!styles.length) {
            return null
        }
        return styles;
    } else {
        return response;
    }
}

export const getStyleItems = (styleId) => async (dispatch) => {
    console.log("in thunk")
    const response = await fetch(`/api/styles/${styleId}/style_items/`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const styleItems = await response.json();
        console.log("in thunk response, ", styleItems)
        dispatch(loadStyleItems(styleItems));
        return styleItems;
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

export const newStyleItem = (styleItemId, styleId) => async dispatch => {

    const response = await fetch(`/api/styles/${styleId}/style_items/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(styleItemId)
    });


    if (response.ok) {
        const res= await response.json();
        console.log("resss", res)
        if (res.error) {
            console.log("in errorrrrrrr", res.error)
            return res
        }
        console.log("style ITEM response!!!!! ", res)
        dispatch(addStyleItem(res));
        return res;
    } else {
        return response
    }

}

export const modifyStyle = (styleId, data) => async dispatch => {
    console.log("in thunkkkkkkk for  edit style", data)
     const response = await fetch(`/api/styles/${styleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    //  console.log("MODIFY ORDER RESPONSE", response)
    if (response.ok) {
        const style = await response.json();
        console.log("style response!!!!! ", style)
        dispatch(editStyle(style));
        return style;
    } else {
        return response;
    }
};

export const deleteStyle = (styleId) => async (dispatch) => {
    const response = await fetch(`/api/styles/${styleId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        dispatch(removeStyle(styleId))
        return response;
    } else {
        return response;
    }
}

const initialState = {};

const stylesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_USER_STYLES: {
            newState = { ...state };
            action.payload.user_styles.forEach(style => {
                newState[style.id] = style;
            });
            return newState;
        }
        case GET_STYLE_ITEMS: {
            console.log("action payload, ", action.payload)
            newState.styleItems = action.payload
            return newState
        }
        case ADD_STYLE: {
            newState = {
                ...state,
                [action.payload.id]: action.payload
            }
            return newState;
        }
        case ADD_STYLE_ITEM: {
            newState = { ...state };
            console.log("NEW STATE:  ", newState)
            console.log("payload: ", action.payload)

            // for (let i = 0; i < newState.length; i++) {
            //     console.log(newState[i])

            //     if (newState[i].id === action.payload.style_id) {
            //         console.log("found")

            //           newState[i].styleItems.push(action.payload)
            //     }
            // }

            newState[action.payload.style_id].styleItems.push(action.payload)

            return newState;
        }
        case GET_STYLE: {
            newState = action.payload
            return newState
        }
        case EDIT_STYLE: {
            newState = { ...state };
            newState.title = action.payload.title
            newState.styleItems = action.payload.styleItems
            return newState;
        }
        case REMOVE_STYLE: {
            newState = { ...state };
            console.log("NEW STATE", newState)
            console.log("????: ", newState[action.payload])
            delete newState[action.payload]
            console.log("updated state: ", newState)
            return newState
        }
        default:
            return state;
    }
}


export default stylesReducer
