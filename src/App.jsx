import './App.scss'
import Header from '../src/common/Header/Header'
import Footer from './common/Footer/Footer'
import BookDetail from './pages/BookDetail/BookDetail'
import { useLocation, useNavigate, useRoutes,Navigate  } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import DashboardBooks from './pages/DashboardBooks/DashboardBooks'
import Dashboard from './pages/DashBoard/DashBoard'
import MainLayoutAdmin from './layouts/MainLayoutAdmin'
import { Toaster } from 'react-hot-toast';
import useAuth from './hooks/useAuth'
import { useEffect } from 'react'
import AdminDashboard from './pages/DashboardChart/AdminDashboard'
import DashboardBook from './pages/DashboardBooks/DashboardBooks'
import DashboardAccount from './pages/DashBoardAccount/DashboardAccount'
import InputEmail from './pages/FogotPassword/InputEmail'
import ForgotPassword from './pages/FogotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import Profile from './components/Profile/Profile'
import FavoriteBooks from './pages/FavoriteBooks/FavoriteBooks'
import RecommendedBooks from './pages/RecommendedBooks/RecommendedBooks'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




function App() {
  const currentUser = useAuth();
  const location = useLocation();
  const path =location.pathname
  const navigate = useNavigate()
  const role = currentUser.user?.role || []
  const isAdmin = role.includes('Admin')
  console.log('Role:', role);
  console.log('isAdmin',isAdmin)

  useEffect(() => {
    if (!isAdmin && path.startsWith('/admin')) {
      navigate('/')
    }
  }, [role, path, navigate, isAdmin])


  const router = useRoutes([
    {
      path:"/",
      element: <MainLayout/>,
      children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path: '/books/:id',
          element: <BookDetail/>
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
      path: '/forgot-password',
      element: <InputEmail />,
    },
    {
      path: '/verify-otp',
      element: <ForgotPassword />,
    },
    {
      path: '/reset-password',
      element: <ResetPassword />,
    },
    {
      path:'/profile',
      element: <Profile/>
    },
    {
      path:'/favorites',
      element: <FavoriteBooks/>
    },
    {
      path:'/recommendedBooks',
      element:<RecommendedBooks/>
    },
    {
      path:'/admin',
      element: isAdmin ? <MainLayoutAdmin/> : <Navigate to="/" replace />,
      children: [
        {
          path: '',
          element: <DashboardBook/>,
        },
        {
          path:'dashboard',
          element:<AdminDashboard/>
        },
        {
          path:'dashboard-book',
          element:<DashboardBook/>
        },
        {
          path:'dashboard-account',
          element:<DashboardAccount/>
        }

      ],
    }
    ,
    
  ])
  return (
    <>
     
    {router}
    <Toaster position="top-center" reverseOrder={false} />
   
    
    </>
  )
}

export default App