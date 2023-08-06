import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Redirect, Link } from 'react-router-dom';
import { deleteStyle, getUserStyles, modifyStyle } from '../../store/styles';
import DisplayStyleItems from './DisplayStyleItems';
import "./StyleDetails.css"

function StylesDetails() {
  const dispatch = useDispatch();
  const { styleId } = useParams();
  const user = useSelector(state => state.session.user)
  const styles = useSelector(state => state.styles)
  const style = useSelector(state => state.styles[styleId])
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState(style ? style.title : "")
  const [isDeleted, setIsDeleted] = useState(false)
  const [errors, setErrors] = useState("")

  console.log("STYLE: ", style)
  console.log("EDIT: ", edit)
  console.log("EROOR: ", errors)
  console.log("STYLES ", styles)

  useEffect(() => {
    dispatch(getUserStyles())
  }, [dispatch]);

  if (!user) return (
    <Redirect to='/login'></Redirect>
  )
  if (isDeleted) {
    console.log("NO STYLE ON DETAILS PAGE REDIRECT TO STYLE PAGE")
    return <Redirect to="/styles"></Redirect>
  }

  const removeStyle = async () => {
    dispatch(deleteStyle(style.id))
    setIsDeleted(true)
  }

  // const onSubmit = async (e) => {
  //   console.log("in title change func")
  //   console.log("title value: ", title)
  //   if (e.code === "Enter") {
  //     console.log("in enter validate")
  //     setTitle(e.target.value)
  //     console.log("title val: ", title)
  //     const data = await dispatch(modifyStyle(style.id, { title }))
  //     console.log("data back in component, ", data)
  //     if (data.errors) {
  //       console.log("here!!!!!!")
  //       // let stylesArray = Object.entries(styles).map((style) => ( style[1])) looop??
  //       // console.log(stylesArray)

  //       setError(data.errors[0].title)
  //       console.log("ERROR AFTER SETTING IT", error)

  //     }
  //     else {
  //       console.log("TITLE CHANGE SUCCESFUL")
  //       setEdit(false)
  //     }
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("errors: ", errors)
    if (errors.title) errors.title = "";

    const data = await dispatch(modifyStyle(style.id, {title}))
    if (data.errors) {
       setErrors(data.errors[0])

    }else {
        setEdit(false)
    }
}

  console.log("ERROR OUTSIDE OF CHNAGT TTITLE", errors)

  if (Object.keys(styles).length) {

    return (
      <div className='style-details-container'>
        {
          !edit ? (
            <div className='style-title-container'>
              <div className='style-details-title'>{style.title}</div>
              <button className='change-title-button' onClick={() => setEdit(true)}>Change title name</button>
            </div>
          ) : (
            // <form>
            //   <input
            //     className='style-details-title-edit'
            //     // value={title ? title : style.title}
            //     value={title}
            //     onChange={(e) => setTitle(e.target.value)}
            //     type="text"
            //     onKeyDown={(e) => changeTitle(e)}
            //     required
            //   // defaultValue={style.title}
            //   // onClick={changeTitle}
            //   />
            //   {error && <span className="error">{error}</span>}
            // </form>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="new-style-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              {errors.title && ( <span className="error">{errors.title}</span> )}
              <button type='submit'>Save Title</button>
            </form>
          )
        }

        <div>

          <DisplayStyleItems productValues={style.styleItems} />
        </div>

        <div>
          <button className="delete-style-button" onClick={removeStyle}>Delete style</button>

        </div>

        <Link to="/styles">Go back to all styles</Link>

      </div>

    )
  } else {
    return <div>Loading...</div>
  }
}

export default StylesDetails
