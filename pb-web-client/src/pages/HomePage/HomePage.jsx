import HomeBox from "../../components/HomeBox/HomeBox"
import "./HomePage.css"
import { AuthProvider } from "../../contexts/authContexts"
import SendToSignIn from "../../components/auth/SendToSignIn/SendToSignIn";


const HomePage = () => {

  return (

  
      <AuthProvider>
       <SendToSignIn />
 <div className="flex flex-col h-screen bg-slate-900 pt-36">
      <h1 className="text-8xl font-sans font-bold text-white text-center" >Choose Your Starter</h1>
      <div className="flex justify-center">
        <HomeBox className="blue" />
        <HomeBox className="red" />
        <HomeBox className="green" />
      </div>
    </div>
      </AuthProvider>
   
    
    
  )
}

export default HomePage