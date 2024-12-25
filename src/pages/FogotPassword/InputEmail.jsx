import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { Field, Formik, Form } from 'formik';
import logo from '../../assets/images/logoBook2.png';
import { sendCode } from '../../apis/auth.api';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useState } from 'react'; // Thêm useState

const InputEmail = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Quản lý trạng thái loading

  const goBack = () => {
    navigate('/signin');
  };

  // Validation schema cho email
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Vui lòng nhập email'),
  });

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
        {isLoading ? ( // Hiển thị spinner nếu đang tải
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <LoadingSpinner />
          </div>
        ) : (
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              setIsLoading(true); // Bật trạng thái loading
              try {
                const response = await sendCode(values.email); // Gửi yêu cầu API với email
                console.log(response);
                if (response?.status === 200) {
                  // Nếu email hợp lệ
                  localStorage.setItem('email', values.email); // Lưu email vào localStorage
                  navigate('/verify-otp'); // Điều hướng đến trang nhập OTP
                  toast.success(response.data);
                } else {
                  toast.error('Email không tồn tại');
                }
              } catch (error) {
                if (error.response?.status === 404) {
                  toast.error('Có lỗi xảy ra! Vui lòng thử lại sau');
                } else if (error?.code === 'ERR_NETWORK') {
                  toast.error('Mất kết nối, kiểm tra kết nối mạng của bạn');
                } else {
                  toast.error(error.message);
                }
              } finally {
                setIsLoading(false); // Tắt trạng thái loading
              }
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="input-group">
                  <Field type="text" placeholder="Nhập email" name="email" />
                </div>
                {errors.email && touched.email && (
                  <p className="errorMsg">{errors.email}</p>
                )}
                <br />
                <button type="submit" className="button">
                  NHẬN CODE
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default InputEmail;
