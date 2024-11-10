import * as Yup from 'yup'

export const registerValidate = () =>
  Yup.object({
    username: Yup.string().required('Tên đăng nhập là bắt buộc'),
    password: Yup.string().required('Mật khẩu là bắt buộc'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  })