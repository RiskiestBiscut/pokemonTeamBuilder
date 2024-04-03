import SignUp from "../../components/auth/SignUp/SignUp"
import Header from "../../components/auth/Header/Header"
import { Navigate } from "react-router-dom"


const SignUpPage = ({authenticated}) => {
  return (
    authenticated === true ? <Navigate to="/" /> :
      <>
        <Header />
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <SignUp />
      </div>
      </>
    

      
    
  )
}

export default SignUpPage