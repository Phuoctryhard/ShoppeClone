import { Purchase, statusList } from 'src/type/purchase.type'
import { SuccessResponse } from 'src/type/until.type'
import http from 'src/until/http'

const url = 'purchases'
const purchaseApi = {
  addTocart: (body: { product_id: string; buy_count: number }) => {
    return http.post<SuccessResponse<Purchase>>(`${url}/add-to-cart`, body)
  },
  getPurChases: (params: { status: statusList }) => {
    return http.get<SuccessResponse<Purchase[]>>(`${url}`, {
      params
    })
  },
  // update trong cart
  updatePurchases(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessResponse<Purchase>>(`${url}/update-purchase`, body)
  },
  // mua hàng
  buyPurchases(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessResponse<Purchase[]>>(`${url}/buy-products`, body)
  },
  // xóa trong cart
  deletePurChases: (body: string[]) => {
    return http.delete<SuccessResponse<{ deleteid_count: number }>>(`${url}`, { data: body })
  }
}
export default purchaseApi
