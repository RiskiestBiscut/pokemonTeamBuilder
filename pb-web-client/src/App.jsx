import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'


import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import SignUpPage from './pages/SignUpPage/SignUpPage';


const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>
    <Route index element={<HomePage />}/>
    <Route path='/signup' element={<SignUpPage />}/>
    <Route path='/login' element={<LoginPage />}/>
  </Route>
  )
);
const App = () => {

  return <RouterProvider router={router} />
}

export default App
