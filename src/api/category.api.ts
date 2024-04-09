import { Category } from 'src/type/category.type'
import { SuccessResponse } from 'src/type/until.type'
import http from 'src/until/http'
const URL = '/categories'
export const getCategory = () => {
  return http.get<SuccessResponse<Category>>(URL)
}

const CategoryApi = {
  getCategory: () => {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}
export default CategoryApi
