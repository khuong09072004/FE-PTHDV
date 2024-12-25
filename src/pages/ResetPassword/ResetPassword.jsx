import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import logo from '../../assets/images/logoBook2.png';
import { IoIosArrowBack } from 'react-icons/io';
import { Formik, Form, Field } from 'formik';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import * as Yup from 'yup';


const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false); // Quản lý trạng thái loading
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/signin');
  };

  // Validation schema cho form đặt lại mật khẩu
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .required('Vui lòng nhập mật khẩu mới'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Mật khẩu xác nhận không khớp')
      .required('Vui lòng xác nhận mật khẩu'),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true); // Bật trạng thái loading
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_SERVER}/Auth/ResetPassword`,
        values, // Gửi cả newPassword và confirmPassword
        {
          headers: {
            'Content-Type': 'application/json', // Đảm bảo header là application/json
          },
        }
      );

      if (response?.status === 200) {
        toast.success('Đặt lại mật khẩu thành công!');
        navigate('/signin'); // Điều hướng đến trang đăng nhập
      } else {
        toast.error(response.data?.message || 'Đặt lại mật khẩu thất bại!');
      }
    } catch (error) {
      console.error('Lỗi trong catch:', error);
      if (error.response) {
        toast.error(`Lỗi từ server: ${error.response.data?.message || 'Vui lòng thử lại.'}`);
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
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
            initialValues={{ newPassword: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="input-group">
                  <Field
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    name="newPassword"
                  />
                  {errors.newPassword && touched.newPassword && <p className="errorMsg">{errors.newPassword}</p>}
                </div>
                <div className="input-group">
                  <Field
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    name="confirmPassword"
                  />
                  {errors.confirmPassword && touched.confirmPassword && <p className="errorMsg">{errors.confirmPassword}</p>}
                </div>
                <button type="submit" className="button">
                  Đặt lại mật khẩu
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
