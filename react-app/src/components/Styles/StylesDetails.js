import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Redirect, Link } from 'react-router-dom';
import { getStyle, deleteStyle, getUserStyles, modifyStyle } from '../../store/styles';
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

  console.log("STYLE: ", style)
  console.log("EDIT: ", edit)

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
  // .then(() => <Redirect to="/styles"></Redirect>)
}

const changeTitle = (e) => {
  // dispatch(modifyStyle(style.id, title))
  // setEdit(!edit)
  console.log("in title change func")
  console.log("title value: ", title)
  // setSaveStyle(style)
  if (e.code === "Enter") {
    console.log("in enter validate")
    setTitle(e.target.value)
    console.log("title val: ", title)
    dispatch(modifyStyle(style.id, {title}))
    setEdit(false)
  }
}

if (Object.keys(styles).length) {

  return (
    <div className='style-details-container'>
      {
        !edit ? (
          <div className='style-details-title' onClick={() => setEdit(true)}>{style.title}</div>
        ) : (
          <form>
          <input
          className='style-details-title-edit'
          value={title ? title : style.title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          required
          onKeyDown={(e) => changeTitle(e)}
          // defaultValue={style.title}
          // onClick={changeTitle}
          />
          </form>
        )
      }

    <button onClick={removeStyle}>Delete style</button>
    <Link to="/styles">Go back to all style</Link>

    </div>

  )
}else{
  return <div>Loading...</div>
}
}

export default StylesDetails
