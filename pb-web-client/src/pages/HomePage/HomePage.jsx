import "./HomePage.css"
import { useState } from "react";
import NewUserPopup from "../../components/newUser/NewUserPopup/NewUserPopup";


const HomePage = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [newUser, setNewUser] = useState(true);

  return (
     <>
      {newUser && <NewUserPopup newUser={newUser} setNewUser={setNewUser} buttonPopup={buttonPopup} setButtonPopup={setButtonPopup}/>}
      <h1>HomePage</h1>
     </>
  )
}


export default HomePage