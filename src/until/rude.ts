// chỉ import đc type của interface
import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

// type Rudes = { [key: string] :RegisterOptions}
type Rudes = { [key in 'emails' | 'password' | 'confirm_password']?: RegisterOptions }
// getRudes là funtion return object
export const getRudes = (getValues?: UseFormGetValues<any>): Rudes => ({
  emails: {
    required: {
      value: true,
      message: 'Lỗi Email là bắt buộc '
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Lỗi độ dài 5 - 160 kí tự  '
    },
    minLength: {
      value: 5,
      message: 'Lỗi độ dài 5 - 160 kí tự ' // JS only: <p>error message</p> TS only support string
    }
  },
  password: {
    required: {
      value: true,
      message: 'Lỗi Password là bắt buộc '
    },

    maxLength: {
      value: 160,
      message: 'Lỗi độ dài 5 - 160 kí tự  '
    },
    minLength: {
      value: 5,
      message: 'Lỗi độ dài 5 - 160 kí tự ' // JS only: <p>error message</p> TS only support string
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Lỗi confirmpassword là bắt buộc '
    },
    maxLength: {
      value: 160,
      message: 'Lỗi độ dài 5 - 160 kí tự  '
    },
    minLength: {
      value: 5,
      message: 'Lỗi độ dài 5 - 160 kí tự ' // JS only: <p>error message</p> TS only support string
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhap mat khau khong khop  '
        : undefined
  }
})

// khuyết điểm rude.email ko gợi ý

export const schema = yup.object({
  email: yup
    .string()
    .email('Lỗi email không đúng định dạng')
    .required('Email là bắt buộc')
    .min(5, 'Lỗi độ dài 5 - 160 ksi tự ')
    .max(160, 'Lỗi độ dài 5 - 160 ksi tự '),
  password: yup
    .string()
    .required('Password là bắt buộc ')
    .min(5, 'Lỗi độ dài 5 - 160 ksi tự ')
    .max(160, 'Lỗi độ dài 5 - 160 ksi tự '),
  confirm_password: yup
    .string()
    .required('Nhap lai Password là bắt buộc')
    .min(5, 'Lỗi độ dài 5 - 160 ksi tự ')
    .max(160, 'Lỗi độ dài 5 - 160 ksi tự ')
    .oneOf([yup.ref('password')], 'Nhập lại mk khớp '),
  // test : để custom validate  lại vì nó phức tạp

  price_min: yup.string().test({
    name: 'price - not - allowed',
    message: 'Giá không phù hợp ',
    test: function (value) {
      const price_min = value
      // this.parent = thì sẽ gọi ra object cha của price_min
      const { price_max } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_min !== '' || price_max != ''
    }
  }),
  price_max: yup.string().test({
    name: 'price - not - allowed',
    message: 'Giá không phù hợp ',
    test: function (value) {
      const price_max = value
      // this.parent = thì sẽ gọi ra object cha của price_min
      const { price_min } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_min !== '' || price_max != ''
    }
  }),
  // xử lí xóa dấu cách
  search: yup.string().trim().required('Tên là bắt buộc')
})
const login = schema.omit(['confirm_password'])
export type login = yup.InferType<typeof login>
export type Scheme = yup.InferType<typeof schema>

// https://github.com/jquense/yup
