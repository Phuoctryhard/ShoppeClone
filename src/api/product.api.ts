import http from 'src/until/http'
import { Product, ProductList, ProductListConfig } from 'src/type/product.type'
import { SuccessResponse } from 'src/type/until.type'
import { ErrorResponse } from 'react-router-dom'
const URL = 'products'
export const productApi = {
  getProduct(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  }
}
// nhớ thêm kiểu dữ liệu trả về http axios <>
export default productApi
