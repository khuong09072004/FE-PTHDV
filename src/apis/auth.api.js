import { apiDefault } from ".";
import { ApiConstant } from "../constants/api.constant";

const authApi = () => ({
    login: async({username, password}) => apiDefault.post(ApiConstant.auth.login,{
        username,
        password
    }),
    sendCode: async (email) => apiDefault.post(ApiConstant.auth.sendCode,{email}),
    confirmToken: async(token) => apiDefault.post(ApiConstant.auth.confirmToken,{token})
})

export const {
    login,
    sendCode,
    confirmToken


} = authApi();