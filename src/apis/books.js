import { apiDefault } from ".";
import { ApiConstant } from "../constants/api.constant";

const itemBooks = () => ({
    getAllItemBooks: async () => apiDefault.get(ApiConstant.books.getAllBooks),
    getBookById: async () => apiDefault.get(`${ApiConstant.books.getBooksById}/${id}`)
})
export const { getAllItemBooks } = itemBooks()