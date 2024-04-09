import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Inputs from 'src/components/Inputs'
import { getRudes, schema, Scheme } from 'src/until/rude'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authAPI from 'src/api/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntity } from '../../until/until'
import { ResponApi } from 'src/type/until.type'
import { Appcontext } from 'src/context/app.context'

// type Inputs = {
//   email: string
//   password: string
//   // _ : tiện gửi lên server
//   confirm_password: string
// }

// type register = {
//   email: string
//   password: string
// }
// type Inputs = Scheme
type Inputs = Pick<Scheme, 'email' | 'password' | 'confirm_password'>
// lấy email và password thôi
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(Appcontext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    // watch,
    getValues,
    setError,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(registerSchema)
  })

  console.log(errors)
  // console.log(watch('email'))
  // khi submit:  form ko dung thì function data ko chạy
  // const onSubmit: SubmitHandler<Inputs> = (data) =>{
  //   console.log(data)
  // }
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<Inputs, 'confirm_password'>) => authAPI.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    const body = omit(data, ['confirm_password'])
    console.log(body)
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
        setIsAuthenticated(true)
        if (data.data.data) {
          setProfile(data.data.data.user)
        }
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ResponApi<Omit<Inputs, 'confirm_password'>>>(error)) {
          // Lấy ra 1 object

          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<Inputs, 'confirm_password'>, {
                message: formError[key as keyof Omit<Inputs, 'confirm_password'>],
                type: 'server '
              })
            })
          }

          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'server '
          //   })
          // }
          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'server '
          //   })
          // }
        }
      }
    })
    console.log(data)
    // },
    // (data) => {
    //   // lấy giá trị password
    //   console.log(getValues('password'))
    // }
  })
  const rudes = getRudes(getValues)
  return (
    <div className='bg-orange'>
      {/* container : max-w-7xl mx-auto px-4  */}
      <div className='container'>
        {/* ban đầu cho nó 1 cột sau khi lớn lên thì 1 cột  */}
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          {/* mở rộng 2 cột , bắt đầu từ cột 2 */}
          <div className='lg:col-span-2 lg:col-start-4'>
            <form action='' className='p-10 bg-white rounded shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Kí</div>
              {/* Nên có 1 thẻ div bao bọc input : để có message báo lỗi đặt trong thẻ dĩ luôn  */}

              {/* Register = {register} */}
              <Inputs
                register={register}
                // rudes={rudes.emails}
                errorsMessage={errors.email?.message}
                className='mt-8'
                placeholder='Email'
                type='email'
                name='email'
              />
              <Inputs
                register={register}
                // rudes={rudes.password}
                errorsMessage={errors.password?.message}
                className='mt-2'
                placeholder='Password'
                type='password'
                name='password'
                autoComplete='on'
              />

              <Inputs
                register={register}
                // Spread operator for destructuring the configuration from 'rudes.confirm_password'
                // rudes={rudes.confirm_password}
                errorsMessage={errors.confirm_password?.message}
                className='mt-2'
                placeholder='Confirm password'
                type='password'
                autoComplete='on'
                name='confirm_password'
              />

              <div className='mt-3'>
                {/* w-full: 100% */}
                {/* Mặc định trong form button là submit */}
                <button className='w-full text-center bg-orange py-4 px-2 uppercase rounded-sm text-white hover:bg-red-600'>
                  Đăng Kí
                </button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className=' text-slate-400'>Bạn đã có tài khoản Shoppe? </span>
                  <Link to='/login' className='text-red-600 ml-1'>
                    Đăng Nhập
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

// <div className='mt-8'>
// <input
//   type='email'
//   className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
//   placeholder='Email'
//   //       {...register('email')} nó return về thuộc tính name : => sẽ overide name
//   // use Required nghĩa là phải có data ko thì lỗi
//   {...register('email', rudes.emails)}
// />
// {/* thẻ div thông báo lỗi : min-h-[1rem] : để tránh xuất hiện text sẽ đẩy lên đẩy xuống: set up sẵn 1 rem   */}
// <div className='mt-1 text-red-600 text-sm min-h-[1.5rem]'>{errors.email?.message}</div>
// </div>

// <div className='mt-2'>
// <input
//   type='password'
//   className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
//   placeholder='Password'
//   {...register('password', rudes.password)}
//   autoComplete='on'
// />
// {/* thẻ div thông báo lỗi : min-h-[2rem ] : để tránh xuất hiện text sẽ đẩy lên đẩy xuống: set up sẵn 1 rem   */}
// <div className='mt-1 text-red-600 text-sm min-h-[1.5rem]'>{errors.password?.message}</div>
// </div>

{
  /* <div className='mt-2'>
  <input
    type='password'
    className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
    placeholder='Confirm password'
    {...register(
      'confirm_password',
      {
        // destructoring
        ...rudes.confirm_password
      } */
}
// validate: (value) => {
//   if (value === getValues('password')) {
//     {
//       return true
//     }
//   }
//   return 'Nhap mat khau khong khop  '
// }
// )}
// toan tu hoac value === getValue('password') || Nhap lai mat khau

//     autoComplete='on'
//   />
//   {/* thẻ div thông báo lỗi : min-h-[1rem] : để tránh xuất hiện text sẽ đẩy lên đẩy xuống: set up sẵn 1 rem   */}
//   <div className='mt-1 text-red-600 text-sm min-h-[1.5rem]'>{errors.confirm_password?.message}</div>
// </div>
