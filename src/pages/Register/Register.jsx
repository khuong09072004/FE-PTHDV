import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Field, Formik, Form } from 'formik'
import "../../pages/Register/Register.scss"
import logo from '../../assets/images/logoBook2.png'
import { IoIosArrowBack } from 'react-icons/io'
import { FaUser } from 'react-icons/fa'
import { FaLock } from 'react-icons/fa6'
import { MdEmail } from "react-icons/md";
import { registerValidate } from '../../utils/registerValidate'
import axios from 'axios'; // Thêm axios để gửi request
import toast from 'react-hot-toast';
import './Register.scss'

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState(''); // Lưu thông báo lỗi

  const goToLogin = () => {
    navigate('/signIn');
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('https://localhost:7262/api/Auth/Register', {
        email: values.email,
        username: values.username,
        password: values.password,
      });
  
      if (response.status === 200) {
        // Hiển thị thông báo thành công
        toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
  
        // Chuyển hướng ngay lập tức sau khi thông báo
        navigate('/signIn');
      }
    } catch (error) {
      // Hiển thị thông báo lỗi
      if (error.response) {
        toast.error(error.response.data.message || 'Có lỗi xảy ra!');
      } else {
        toast.error('Không thể kết nối đến máy chủ. Vui lòng thử lại.');
      }
    }
  };

  return (
    <div className='container'>
      <div className='box'>
        <div className='back'>
          <span onClick={goBack}>
            <IoIosArrowBack /> QUAY LẠI
          </span>
        </div>
        <div className='logo'>
          <img src={logo} alt='Logo' />
        </div>

        <Formik
          initialValues={{
            username: '',
            password: '',
            email: '',
          }}
          validationSchema={registerValidate()}
          onSubmit={handleSubmit}  
        >
          {({ errors, touched }) => (
            <Form>
              <div className='input-group'>
                <Field type='text' placeholder='Tên Đăng Nhập' name='username' autoComplete="off" required />
                <span className='icon'>
                  <FaUser />
                </span>
              </div>
              {errors.username && touched.username && <p className='errorMsg'>{errors.username}</p>}
              <br />
              <div className='input-group pass'>
                <Field type='password' placeholder='Mật khẩu' name='password' required />
                <span className='icon'>
                  <FaLock />
                </span>
              </div>
              {errors.password && touched.password && <p className='errorMsg'>{errors.password}</p>}
              <br />
              <div className="input-group email">
                <Field type='text' placeholder='Email' name='email' required />
                <span className='icon'>
                  <MdEmail style={{ fontSize: '24px' }} />
                </span>
              </div>
              {errors.email && touched.email && <p className='errorMsg'>{errors.email}</p>}

              {errorMessage && <p className='errorMsg'>{errorMessage}</p>}

              <button type='submit' className='button-register'>
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
  );
};

export default Register;
