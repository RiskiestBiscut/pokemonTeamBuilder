import SignUp from "../../components/auth/SignUp/SignUp"
import Header from "../../components/auth/Header/Header"


const SignUpPage = () => {
  return (
      <>
        <Header />
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <SignUp />
      </div>
      </>
    

      
    
  )
}

export default SignUpPage