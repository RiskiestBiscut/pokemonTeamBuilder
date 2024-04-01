import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200'>
            <>
                <Link className='text-sm text-blue-600 underline' to={'/signin'}>Login</Link>
                <Link className='text-sm text-blue-600 underline' to={'/signup'}>Register New Account</Link>
            </>
</nav>
  )
}

export default Header
