import Login from "../../components/auth/Login/Login"
import { Navigate } from "react-router-dom"


const LoginPage = ({authenticated}) => {
  return (
    authenticated === true ? <Navigate to="/" /> : <Login />
    
  )
}

export default LoginPage