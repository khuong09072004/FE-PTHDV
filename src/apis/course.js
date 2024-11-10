import { apiDefault } from ".";
import { ApiConstant } from "../constants/api.constant";

const itemCourse = () => ({
    getAllItemCourse: async () => apiDefault.get(ApiConstant.course.getAllCourse)
})
export const { getAllItemCourse } = itemCourse()