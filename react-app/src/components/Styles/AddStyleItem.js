import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal'
import { getUserStyles } from "../../store/styles";
import { newStyleItem } from "../../store/styles";
import StylesFormPage from "./StylesFormPage";
import OpenModalButton from '../OpenModalButton'
import "./AddStyleItem.css"


function AddStyleItem({ styleItem }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const styles = useSelector(state => state.styles)
    const [newStyle, setNewStyle] = useState(false)
    const [open, setOpen] = useState(false);
    const [chosenStyle, setChosenStyle] = useState(false)
    const [styleExists, setStyleExists] = useState(false)
    console.log("STYLES, ", styles)
    let stylesArray = Object.entries(styles).map((style) => ( style[1]))
    console.log("styles array: ", stylesArray)

    useEffect(() => {
        dispatch(getUserStyles())
    }, [dispatch]);


    const handleOpen = () => {
        setOpen(!open);
    };




    const addToStyle = (style) => {
        console.log("HEREEEE", style)
        setChosenStyle(style)
        setOpen(false)

        for (let i = 0; i < style.styleItems.length; i++) {
            if (style.styleItems[i].productTypeId == styleItem.id) {
                console.log("ALREADY IN HERREEEE")
                setStyleExists(true)
                return;
            }
        }

        console.log("GOOD TO ADD")
        dispatch(newStyleItem(styleItem.id, style.id))
        closeModal()
    }

    const styleReturned = (returnedStyle) => {
        addToStyle(returnedStyle)
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
                                        stylesArray.map(style => (
                                            <li key={style.id}>
                                                <button onClick={() => addToStyle(style)}>{style.title}</button>
                                            </li>
                                        ))
                                    }
                                </ul>
                            ) : null}
                            {
                                styleExists && (
                                    <div>This Style already has this item, please choose a different Style or create a new one</div>
                                )
                            }

                        </div>
                    </>
                )
            }

            {newStyle && (
                <>
                    <StylesFormPage styleReturned={styleReturned}/>
                    <button onClick={() => setNewStyle(false)}>Nevermind, I want to add it to an existing Style</button>

                </>
            )}
        </div>
    )
}

export default AddStyleItem
