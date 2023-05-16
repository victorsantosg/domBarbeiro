import './App.css'
// Import das páginas
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Agendamentos from './Components/Agendamentos/Agendamentos';

// React-Router-Dom
import {
  createBrowserRouter,
  RouterProvider 
} from 'react-router-dom'

// Rotas de páginas
const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login /></div>
  },
  {
    path: '/register',
    element: <div><Register /></div>
  },
  {
    path: '/dashboard',
    element: <div><Dashboard /></div>
  },
  {
    path: '/agendamentos',
    element: <div><Agendamentos /></div>
  }
])

function App() {
  return(
    <div>
      <RouterProvider  router={router}/>
    </div>
  )
}

export default App;