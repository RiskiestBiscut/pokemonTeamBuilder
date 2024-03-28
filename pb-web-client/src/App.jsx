import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'


import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage'
import SignInPage from './pages/SignInPage/SignInPage'
import SignUpPage from './pages/SignUpPage/SignUpPage';


const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>
    <Route index element={<HomePage />}/>
    <Route path='/signup' element={<SignUpPage />}/>
    <Route path='/signin' element={<SignInPage />}/>
    <Route path='*' element={<SignInPage />}/>
  </Route>
  )
);
const App = () => {

  return <RouterProvider router={router} />
}

export default App
