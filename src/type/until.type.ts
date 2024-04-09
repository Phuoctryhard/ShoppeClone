// những interface tiện ích
// nhận vào 1 data
// Response as 1 hàm có param Data

export interface ResponApi<Data> {
  message: string
  data?: Data
}

export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export interface SuccessResponse<Data> {
  message: string
  data: Data
}
