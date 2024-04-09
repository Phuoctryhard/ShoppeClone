export const sortby = {
  createdAt: 'createdAt',
  view: 'view',
  sold: 'sold',
  price: 'price'
} as const
export const order = {
  asc: 'asc',
  desc: 'desc'
} as const
// thêm từ khóa  as const để chỉ đọc giá trị , ko chỉnh sửa dc
