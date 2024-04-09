export interface Purchase {
  _id: string
  buy_count?: number
  price: number
  price_before_discount: number
  status: number
  user: string
  product: number
  createdAt: string
  updatedAt: string
}
export type status = -1 | 1 | 1 | 2 | 3 | 4 | 5
export type statusList = status | 0
