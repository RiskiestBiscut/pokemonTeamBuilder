import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import { connect } from 'react-redux'
import { signupUser } from "../../../redux/actions/userActions";


const SignUp = ({ UI, signupUser}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const loading = UI.loading;

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
    console.log(errors)
  }, [UI.errors])
  


  const signUp = async (e) => {
    e.preventDefault();

    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      username: username
    }

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      }
    };

    signupUser(newUserData, config, navigate);
  }


  return (
    <>
    <main>
  <div className="max-w-sm rounded overflow-hidden shadow-lg px-16">
  <form className="m-10" onSubmit={signUp}>
  <div className="">
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">Sign Up</h2>
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
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
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
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>
        </div>
        <div className="mt-10">
          <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confrim Password</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
              <input className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                type="password" 
                name="confirmPassword" 
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
            </div>
            {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword}</span>}
          </div>
        </div>
        <div className="mt-10">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
              <input className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                type="text" 
                name="username" 
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            {errors.username && <span className="text-red-500 text-xs">{errors.username}</span>}
          </div>
        </div>
    </div>
  </div>
  {errors.general && <span className="text-red-500 text-xs">{errors.general}</span>}
  <div className="mt-6 flex items-center justify-center gap-x-6">
    {!loading && <button type="submit"  className="rounded-md bg-indigo-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>}
    {loading && <button className="rounded-md bg-indigo-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Signing Up...</button>}
  </div>
</form>
  </div>

</main>
    </>
   
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(SignUp)