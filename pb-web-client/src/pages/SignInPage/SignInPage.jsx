import SignIn from "../../components/auth/SignIn/SignIn"
import Header from "../../components/auth/Header/Header"
import { AuthProvider } from "../../contexts/authContexts"

const SignInPage = () => {
  return (
    <AuthProvider>
         <Header />
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <SignIn />
      </div>
    </AuthProvider>
  )
}

export default SignInPage