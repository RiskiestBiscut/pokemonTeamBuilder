import { useState } from "react"
import { signInWithEmail, signInWithGoogle } from "../../../firebase/auth"
import { useAuth } from "../../../contexts/authContexts"
import { Navigate } from "react-router-dom"

const SignIn = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signingIn, setSigningIn] = useState(false);

  const signIn = async (e) => {
    e.preventDefault();
    if(!signingIn) {
      setSigningIn(true);
      await signInWithEmail(email, password);
    }
  }

  const signInGoogle = async (e) => {
    e.preventDefault();
    if(!signingIn) {
      setSigningIn(true);
      await signInWithGoogle()
        .catch(err => {
        setSigningIn(false);
        // TODO: add error handling
      })
    }
  }

  return (
    <>
   
    {userLoggedIn && (<Navigate to={'/'} replace={true} />)}
<main>
  <div className="max-w-sm rounded overflow-hidden shadow-lg px-16">
  <form className="m-10" onSubmit={signIn}>
  <div className="">
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">Sign In</h2>
        <div className="mt-10">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
              <input className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                type="email"
                name="email" 
                id="email" 
                placeholder="Enter email here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
              <input className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                type="password" 
                name="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>
        </div>
    </div>
  </div>
  <div className="mt-6 flex items-center justify-center gap-x-6">
    <button type="submit"  className="rounded-md bg-indigo-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
  </div>
</form>
  </div>
  

<div className="max-w-sm rounded overflow-hidden shadow-lg border-b border-gray-900/10 pb-12 mt-10">
      <h2 className="text-base font-semibold leading-7 text-gray-900 text-center mt-6">Sign In With Google</h2>
      <div className="mt-6 flex items-center justify-center gap-x-6">
      <button className=" flex items-center gap-x-3 rounded-md bg-indigo-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={(e) => {signInGoogle(e)}}> <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_17_40)">
              <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
              <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
              <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
              <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
          </g>
          <defs>
              <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
              </clipPath>
          </defs>
      </svg> Sign in with Google
        </button>
      </div>
        
    </div>
</main>
    </>
   
  )
}

export default SignIn