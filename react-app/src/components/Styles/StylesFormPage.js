import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect} from 'react-router-dom';
import { useModal } from '../../context/Modal'
import { createStyle } from '../../store/styles';
import "./StylesFormPage.css"

function StylesFormPage({ styleReturned, setMsg }) {
    console.log("IN STYLES FORM PAGE")
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState({})
    const [title, setTitle] = useState("")


    if (!user) return <Redirect to="/login" />

    const handleSubmit = async (e) => {
        e.preventDefault();


        console.log("errors: ", errors)
        if (errors.title) errors.title = "";

        const data = await dispatch(createStyle({ title }))
        if (data.errors) {
            setErrors(data.errors[0])
        } else {
            if (styleReturned) {
                console.log("child component style returned", data)
                setMsg({ "style": "Your style has been created and this item has been added to it" })
                styleReturned(data)
                console.log("in heeeeeeeeeeeeeeee")
                closeModal()
            }
            else {
                closeModal()
            }
        }
    }


    return (


        <form className='new-style-form' onSubmit={handleSubmit} onMouseLeave={closeModal}>

            <div className='new-style-form-container'>
                <div className="style-title-input-area">
                    <div className='title-style-box'>
                        <label className='title-label'>
                            title:
                        </label>
                    </div>
                    <div className='new-style-form-title-input'>
                        <input
                            type="text"
                            className="new-style-title-input2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='new-style-errors-container'>
                    {errors.title && <span className="sign-up-errors">*{errors.title}</span>}
                </div>

                <div className='style-form-button'>
                    <button className='store-button new-style-form-btn' type='submit'> create style </button>
                </div>
            </div>
        </form>
    )
}

export default StylesFormPage
