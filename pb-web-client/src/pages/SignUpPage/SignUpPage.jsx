import SignUp from "../../components/auth/SignUp/SignUp"
import Header from "../../components/auth/Header/Header"
import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'


const SignUpPage = () => {

  const { authenticated } = useSelector(state => state.user)

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