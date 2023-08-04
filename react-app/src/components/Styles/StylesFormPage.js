import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useModal } from '../../context/Modal'
import { addStyle } from '../../store/styles';
import "./StylesFormPage.css"

function StylesFormPage() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [clicked, setClicked] = useState(false)
    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState("")
    const [blankField, setBlankField] = useState(true);

    useEffect(() => {
        const errors = [];
        if (title.length < 1) errors.title = "Title must contain atleast 1 character"
        if (title.length > 20) errors.title = "Title cannot be longer than 20 characters"
        setErrors(errors)
    }, [title])

    if (!user) return <Redirect to="/login" />

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length > 0) return;

        if (user) {
            const data = await dispatch(addStyle(title))
                .catch(async (response) => {
                    const data = await response.json();
                    if (data && data.errors) setErrors(data.errors)
                })
        } else {
            return <Redirect to="/signup" />
        }
        closeModal();

    }


    return (
        <div className='styles-form-container'>

            <form onSubmit={handleSubmit}>
                <h1>My New Style</h1>
                <label>
                    Title:
                    <input
                        type="text"
                        className="new-style-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                {clicked && <span className="error">{errors.title}</span>}
                <button type='submit'> Create Your New Style </button>
            </form>
        </div>
    )
}

export default StylesFormPage
