import axios, { AxiosError } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.eum'
import { NonUndefined } from 'react-hook-form'

// sau khi chạy return về 1 error có kiểu nhất định
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}
// sau khi chạy functuon thì error từ unknown trả về error is AxiosError

// 1 hàm check lỗi 422 . mình lấy lỗi 422 trong axios export ra 1 file riêng
export function isAxiosUnprocessableEntity<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyles(currency: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(currency)
    .replace('.', ',')
    .toLowerCase()
}

// cú pháp -? loại bỏ undified của key optional
//ví dụ : {
//  handle?:
//}
//loại bỏ undified
export type Noundified<T> = {
  //NoNullable : loại bỏ giá trị undified
  [P in keyof T]-?: NonUndefined<NonNullable<T[P]>>
}
export const rateSale = (original: number, sale: number) => {
  return Math.round(((original - sale) / original) * 100) + '%'
}
export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
