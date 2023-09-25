import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal'
import { getUserStyles } from "../../store/styles";
import { newStyleItem } from "../../store/styles";
import StylesFormPage from "./StylesFormPage";
import OpenModalButton from '../OpenModalButton'
import "./AddStyleItem.css"


function AddStyleItem({ styleItem, setMsg }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const styles = useSelector(state => state.styles)
    const [newStyle, setNewStyle] = useState(false)
    const [open, setOpen] = useState(false);
    const [chosenStyle, setChosenStyle] = useState(false)
    const [styleExists, setStyleExists] = useState(false)

    let stylesArray = Object.entries(styles).map((style) => (style[1]))


    useEffect(() => {
        dispatch(getUserStyles())
    }, [dispatch]);


    const handleOpen = () => {
        setOpen(!open);
    };




    const addToStyle = (style) => {

        setChosenStyle(style)
        setOpen(false)

        for (let i = 0; i < style.styleItems.length; i++) {
            if (style.styleItems[i].productTypeId == styleItem.id) {

                setStyleExists(true)
                return;
            }
        }


        dispatch(newStyleItem(styleItem.id, style.id))
        setMsg({ "style": "This item has been added to your style" })
        closeModal()
    }

    const styleReturned = (returnedStyle) => {
        addToStyle(returnedStyle)
    }


    return (
        <div className="add-style-item-container">
            {
                !newStyle && (
                    <div className="would-you-box">
                        <div className="would-you">Would you like to add to an existing Style or create a new one?</div>
                        <div className="would-you-buttons">
                            <button className="store-button would-you-new-style" onClick={() => setNewStyle(true)}>Create a New One</button>
                            <div className="dropdown-styles">
                                <button className="store-button" onClick={handleOpen}>Your Styles</button>
                                {open ? (
                                    <ul className="drop-down-menu-styles" >
                                        {
                                            stylesArray.map(style => (
                                                <li key={style.id}>
                                                    <button className="style-list-item" onClick={() => addToStyle(style)}>{style.title}</button>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                ) : null}
                                {
                                    styleExists && (
                                        <div className="already-has-item">*This Style already has this item</div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                )
            }

            {newStyle && (
                <div className="new-style-modal-container">
                    <StylesFormPage styleReturned={styleReturned} setMsg={setMsg} />
                    <button className="nevermind-new-style" onClick={() => setNewStyle(false)}>Nevermind, I want to add it to an existing Style</button>

                </div>
            )}
        </div>
    )
}

export default AddStyleItem
