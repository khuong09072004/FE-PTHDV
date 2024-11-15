import { useSelector, useDispatch } from 'react-redux'
import { save, clear } from '../store/auth.store'
import { toast } from 'react-hot-toast'

const useAuth = () => {
  const user = useSelector((state) => state.auth.auth)
  const dispatch = useDispatch()

  const saveUser = (payload) => {
    console.log('Saving user to Redux:', payload);
    dispatch(save(payload))
    toast.success('User saved successfully!');
  }
  const clearUser = () => {
    dispatch(clear())
  }

  return {
    user,
    saveUser,
    clearUser,
  }
}

export default useAuth
