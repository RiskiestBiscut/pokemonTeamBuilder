import { useAuth } from "../../../contexts/authContexts";
import { signOutUser } from "../../../firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";



const SendToSignIn = () => {
  const userLoggedIn = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {!userLoggedIn && (<Navigate to={'/signin'} replace={true} />)}
      <button onClick={() => { signOutUser().then(() => { navigate('/signin') }) }} className='text-sm text-blue-600 underline'>Logout</button>
    </>
  )

}

export default SendToSignIn