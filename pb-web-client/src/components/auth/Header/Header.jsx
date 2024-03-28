import { useAuth } from '../../../contexts/authContexts'
import { signOutUser } from '../../../firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  return (
    <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200'>
    {
        userLoggedIn
            ?
            <>
                <button onClick={() => { signOutUser().then(() => { navigate('/signin') }) }} className='text-sm text-blue-600 underline'>Logout</button>
            </>
            :
            <>
                <Link className='text-sm text-blue-600 underline' to={'/signin'}>Login</Link>
                <Link className='text-sm text-blue-600 underline' to={'/signup'}>Register New Account</Link>
            </>
    }

</nav>
  )
}

export default Header
