import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginValidate } from '../../utils/loginValidate'
import { Field, Formik, Form} from 'formik'
import "../Login/Login.scss"
import logo from '../../assets/images/logo.png'
import { IoIosArrowBack } from 'react-icons/io'
import { FaUser } from 'react-icons/fa'
import { FaLock } from 'react-icons/fa6'


const Login = () => {
    const navigate = useNavigate();
    const goToForgotPassword = () => {
        navigate('/forgot-password')
      }
    const goToRegister = () =>{
      navigate('/signUp')

    }

    const goBack = () => {
      navigate('/')
    }
  return (
    <div className='container'>
        <div className='box'>
          <div className='back'>
            <span onClick={goBack}>
              <IoIosArrowBack /> QUAY LẠI
            </span>
          </div>
          <div className='logo'>
            <img src={logo} alt=' Logo' />
          </div>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={loginValidate()}
            onSubmit={(values) => {
              console.log(values)
            }}
          >
          {({errors,touched}) => (
            <Form>
              <div className='input-group'>
                <Field type='text' placeholder='Tên Đăng Nhập' name='username' autoComplete="off" required
                /> 
                <span className='icon'>
                  <FaUser />
                </span>
              </div>
              {errors.username && touched.username ? (
                <p className='errorMsg'>{errors.username}</p>) : null}
                <br />
              <div className='input-group pass'>
                <Field type='password' placeholder='Mật khẩu' name='password' required/>
                <span className='icon'>
                  <FaLock />
                </span>
              </div>
              <br />
              {errors.password && touched.password ? (
                <p className='errorMsg'>{errors.password}</p>) : null}

              <div className='forgot-password' onClick={goToForgotPassword} >
                  <Link to='/forgot-password'><i>Quên mật khẩu ?</i></Link>
              </div>
              <button type='submit' className='button'>
                ĐĂNG NHẬP
              </button>
              <div className="linkRegister"> 
                <p>Bạn chưa có tài khoản?</p>
                <Link to='/signUp' onClick={goToRegister} className='dangky'>Đăng ký</Link>
              </div>

            </Form>
          )}
          </Formik>
        
        </div>
      </div>
  )
}

export default Login
