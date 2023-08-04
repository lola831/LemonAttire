const GET_USER_STYLES = 'styles/GET_USER_STYLES'
const GET_STYLE = 'styles/GET_STYLE'
const ADD_STYLE = 'styles/ADD_STYLE'
const ADD_STYLE_ITEM = 'styles/ADD_STYLE_ITEM';
const GET_STYLE_ITEMS = 'styles/GET_STYLE_ITEMS'
const EDIT_STYLE = 'styles/EDIT_STYLE'

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

export const newStyleItem = (data, styleId) => async dispatch => {
    console.log("in new style item thunk, data = ", data)
    console.log("style ID: ", styleId)
    console.log("item DATA: ", data)
    dispatch(addStyleItem(styleId, data))

    const response = await fetch(`/api/styles/${styleId}/style_items/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const styleItem = await response.json();
        console.log("style ITEM response!!!!! ", styleItem)
        dispatch(addStyleItem(styleItem));
        return styleItem;
    } else {
        console.log("EERROR: ", response)
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

const initialState = [];

const stylesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_USER_STYLES: {
            newState = action.payload.user_styles
            return newState
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
            newState.styleItems.push(action.payload)
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
        default:
            return state;
    }
}


export default stylesReducer
