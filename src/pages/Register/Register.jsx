import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Field, Formik, Form } from 'formik'
import "../../pages/Register/Register.scss"
import logo from '../../assets/images/logo.png'
import { IoIosArrowBack } from 'react-icons/io'
import { FaUser } from 'react-icons/fa'
import { FaLock } from 'react-icons/fa6'
import { MdEmail } from "react-icons/md";
import { registerValidate } from '../../utils/registerValidate'


const Register = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/signIn')

  }

  const goBack = () => {
    navigate('/signIn')
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
            email: '',
          }}
          validationSchema={registerValidate()}
          onSubmit={(values) => {
            console.log(values)
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
              <br />
              <div className="input-group email">
                <Field type='text' placeholder='Email' name='email' required />
                <span className='icon'>
                  <MdEmail style={{fontSize:'24px'}} />
                </span>
              </div>

              {errors.email && touched.email ? (
                <p className='errorMsg'>{errors.email}</p>) : null}
              <button type='submit' className='button-register' >
                ĐĂNG KÝ
              </button>
              <div className="linkRegister">
                <p>Bạn đã có tài khoản</p>
                <Link to='/signIn' onClick={goToLogin} className='dangky'>Đăng Nhập</Link>
              </div>

            </Form>
          )}
        </Formik>

      </div>
    </div>
  )
}

export default Register
