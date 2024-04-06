import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


import MainLayout from './layouts/MainLayout';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';


import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import SignUpPage from './pages/SignUpPage/SignUpPage';
import TestPage from './pages/TestPage/TestPage';



const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}


const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>
    <Route index element={<HomePage />}/>
    <Route path='/signup' element={<SignUpPage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/test' element={<TestPage />} />
  </Route>
  )
);
const App = () => {

  return <Provider store={store}><RouterProvider router={router} /></Provider>
}

export default App
