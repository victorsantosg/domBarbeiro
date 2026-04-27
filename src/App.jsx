import './App.css'
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Booking from './Components/Booking/Booking';

import {
  createBrowserRouter,
  RouterProvider 
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Booking />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  }
])

function App() {
  return(
    <RouterProvider router={router}/>
  )
}

export default App;