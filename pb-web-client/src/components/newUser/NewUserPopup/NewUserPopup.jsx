import HomeBox from "../HomeBox/HomeBox";
import HomeBoxPopUp from "../HomeBox/HomeBoxPopUp";
import "./NewUserPopup.css";


const NewUserPopup = ({buttonPopup, setButtonPopup, newUser, setNewUser}) => {
  return (newUser) ? (
    <div className="popup-user">
      <div className="popup-inner-user">
        <h1 className="text-8xl font-sans font-bold text-white text-center" >Choose Your Starter</h1>
        <div className="flex justify-center">
          <HomeBox className="blue" setTrigger={setButtonPopup} />
          <HomeBox className="red" setTrigger={setButtonPopup}/>
          <HomeBox className="green" setTrigger={setButtonPopup}/>
        </div>
        <HomeBoxPopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>This is a popup</h3>
          <button onClick={() => setNewUser(false) }>confirm</button>
        </HomeBoxPopUp>
      </div>
    </div>
  ) : ""
}

export default NewUserPopup
