import "./HomePage.css"
import { useState } from "react";
import NewUserPopup from "../../components/newUser/NewUserPopup/NewUserPopup";
import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'


const HomePage = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [newUser, setNewUser] = useState(true);
  const { authenticated } = useSelector(state => state.user)

  return (
    authenticated === false ? <Navigate to="/login" /> :
     <>
      {newUser && <NewUserPopup buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} newUser={newUser} setNewUser={setNewUser}/>}
      <h1>HomePage</h1>
     </>
  )
}


export default HomePage