import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginValidate } from '../../utils/loginValidate'
import { Field, Formik, Form } from 'formik'
import "../Login/Login.scss"
import logo from '../../assets/images/logoBook2.png'
import { IoIosArrowBack } from 'react-icons/io'
import { FaUser } from 'react-icons/fa'
import { FaLock } from 'react-icons/fa6'
import { login } from '../../apis/auth.api'
import useAuth from '../../hooks/useAuth.js'
import toast from 'react-hot-toast';
import { getUserById } from '../../apis/user.api'


const Login = () => {
  const navigate = useNavigate();
  const authen = useAuth();
  const goToForgotPassword = () => {
    navigate('/forgot-password')
  }
  const goToRegister = () => {
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
          onSubmit={async (values) => {
            try {
              const res = await login(values);
              console.log("thong tin", res);
              const roles = res.data.role;
              
              if (roles.includes('Admin')) {
                authen.saveUser({
                  username:res.data.username,
                  role: roles,

                })
                toast.success('Đăng nhập thành công!')
                return navigate('/admin');
              }
              if (roles.includes('User')) {
                authen.saveUser({ username: res.data.username,
                  role: roles,
                 });
                toast.success('Đăng nhập thành công!');
                navigate('/');
              } else {
                toast.error('Lỗi token');
              }
            } catch (error) {
              if (error.response && error.response.data) {
                toast.error(error.response.data.message || 'Sai tên đăng nhập hoặc mật khẩu');
              } else if (error.code === 'ERR_NETWORK') {
                toast.error('Mất kết nối, kiểm tra kết nối mạng của bạn');
              } else {
                toast.error(error.message || 'Đã xảy ra lỗi');
              }
              console.error('API error:', error.response || error.message);
            }
          }}
          
        >
          {({ errors, touched }) => (
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
                <Field type='password' placeholder='Mật khẩu' name='password' required />
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
