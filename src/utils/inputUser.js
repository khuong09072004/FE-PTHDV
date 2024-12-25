import * as Yup from 'yup'

export const inputUser = () =>
  Yup.object({
    username: Yup.string().required('Tên đăng nhập là bắt buộc'),
  })
