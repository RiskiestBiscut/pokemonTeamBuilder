import SignUp from "../../components/auth/SignUp/SignUp"
import Header from "../../components/auth/Header/Header"
import { AuthProvider } from "../../contexts/authContexts"

const SignUpPage = () => {
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <SignUp />
      </div>
    </AuthProvider>
      
    
  )
}

export default SignUpPage