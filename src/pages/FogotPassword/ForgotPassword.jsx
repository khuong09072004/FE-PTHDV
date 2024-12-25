import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import logo from '../../assets/images/logoBook2.png';
import { IoIosArrowBack } from 'react-icons/io';
import { Formik, Form, Field } from 'formik';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import * as Yup from 'yup';
import './ForgotPassword.scss';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/signin');
  };


  const validationSchema = Yup.object().shape({
    token: Yup.string().required('Vui lòng nhập mã OTP'),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_SERVER}/Auth/ConfirmToken`,
        values.token,
        {
          headers: {
            'Content-Type': 'application/json', 
          },
        }
      );

      if (response?.status === 200) {
        toast.success('Token xác nhận hợp lệ!');
        navigate('/reset-password'); 
      } else {
        toast.error('Token không hợp lệ!');
      }
    } catch (error) {
      console.error('Lỗi trong catch:', error);
      if (error.response) {
        toast.error(`Lỗi từ server: ${error.response.data?.message || 'Vui lòng thử lại.'}`);
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="container">
      <div className="box">
        <div className="back">
          <span onClick={goBack}>
            <IoIosArrowBack /> QUAY LẠI
          </span>
        </div>
        <div className="logo">
          <img src={logo} alt="HIT Logo" />
        </div>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <LoadingSpinner />
          </div>
        ) : (
          <Formik
            initialValues={{ token: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="input-group">
                  <Field
                    type="text"
                    placeholder="Nhập mã xác nhận"
                    name="token"
                  />
                  {errors.token && touched.token && <p className="errorMsg">{errors.token}</p>}
                </div>
                <button type="submit" className="button">
                  Xác nhận
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
