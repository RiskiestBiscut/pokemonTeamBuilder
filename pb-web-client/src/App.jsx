import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';


import MainLayout from './layouts/MainLayout';
import { store } from './app/store'
import { Provider } from 'react-redux'


import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import SignUpPage from './pages/SignUpPage/SignUpPage';

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken.exp * 1000);
  if (decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false;
  } else {
    authenticated = true;
  }
}


const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>
    <Route index element={<HomePage />}/>
    <Route path='/signup' element={<SignUpPage authenticated={authenticated}/>} />
    <Route path='/login' element={<LoginPage authenticated={authenticated}/>} />
  </Route>
  )
);
const App = () => {

  return <Provider store={store}><RouterProvider router={router} /></Provider>
}

export default App
