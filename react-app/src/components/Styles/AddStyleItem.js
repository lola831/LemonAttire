import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStyles } from "../../store/styles";
import { newStyleItem } from "../../store/styles";
import "./AddStyleItem.css"


function AddStyleItem({ styleItem }) {
    const dispatch = useDispatch()
    const styles = useSelector(state => state.styles)
    const [newStyle, setNewStyle] = useState(false)
    const [open, setOpen] = useState(false);
    const [style, setStyle] = useState(false)
    console.log("STYLES, ", styles)

    useEffect(() => {
        dispatch(getUserStyles())
    }, [dispatch]);


    const handleOpen = () => {
        setOpen(!open);
    };

    const addToStyle = (style) => {
        console.log("HEREEEE", style)
        // setOpen(false)
        //check if style item already exists in style
        //if its already there show options again setting style to false?
        //add style item to style



    }


    return (
        <div className="add-style-item-container">
            {
                !newStyle && (
                    <>
                        <div>Would you like to add to an existing Style or create a new one?</div>
                        <button onClick={() => setNewStyle(true)}>Create a New One</button>
                        <div className="dropdown-styles">
                            <button onClick={handleOpen}>Your Styles</button>
                            {open ? (
                                <ul >
                                    {
                                        styles.map(style => (
                                            <li key={style.id}>
                                                <button onClick={() => addToStyle(style)}>{style.title}</button>
                                            </li>
                                        ))
                                    }

                                </ul>
                            ) : null}

                        </div>
                    </>
                )
            }

            {newStyle && (
                <>
                    <div>Name your Style: </div>
                    <button onClick={() => setNewStyle(false)}>Nevermind, I want to add it to an existing Style</button>

                </>
            )}
        </div>
    )
}

export default AddStyleItem
