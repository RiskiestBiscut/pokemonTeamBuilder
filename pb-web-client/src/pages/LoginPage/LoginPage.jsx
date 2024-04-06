import Login from "../../components/auth/Login/Login"
import Header from "../../components/auth/Header/Header"
import { useSelector } from 'react-redux'

import { Navigate } from "react-router-dom"


const LoginPage = () => {
  const { authenticated } = useSelector(state => state.user)
  return (
    authenticated === true ? <Navigate to="/" /> :
    <>
      <Header />
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Login />
    </div>
    </>
  )
}

export default LoginPage