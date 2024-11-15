import { api, apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const usersApi = () => ({
  getUserById: async (id) => apiDefault.get(`${ApiConstant.users.getUserById}/${id}`),
 
})

export const { getUserById } =
  usersApi()
