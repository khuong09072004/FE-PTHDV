import './App.scss'
import Header from '../src/common/Header/Header'
import Footer from './common/Footer/Footer'
import SliderItem from './components/SliderItem/SliderItem'
import CourseItem from './components/CourseItem/CourseItem'
import { useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import DashboardBooks from './pages/DashboardBooks/DashboardBooks'
import Dashboard from './pages/DashBoard/DashBoard'
import MainLayoutAdmin from './layouts/MainLayoutAdmin'
import { Toaster } from 'react-hot-toast';


function App() {


  const router = useRoutes([
    {
      path:"/",
      element: <MainLayout/>,
      children:[
        {
          path:'',
          element:<Home/>
        },
       
      ],
    },
    {
      path: '/signIn',
      element:<Login/>
    },
    {
      path:'/signUp',
      element:<Register/>
    },
    {
      path:'/admin',
      element:<MainLayoutAdmin/>,
      children: [
        {
          path: '',
          element: <Dashboard/>,
        },
      ],
    }
    
  ])
  return (
    <>
     
    {router}
    <Toaster position="top-center" reverseOrder={false} />
   
    
    </>
  )
}

export default App