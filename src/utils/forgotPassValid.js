import * as Yup from 'yup'

export const forgotPassValid = () =>
  Yup.object({
    otp: Yup.string()
      .required('OTP là bắt buộc'),
      
  })
