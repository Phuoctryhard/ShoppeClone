import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getRudes, schema, Scheme, login } from 'src/until/rude'
import Inputs from 'src/components/Inputs'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authAPI from 'src/api/auth.api'
import { isAxiosUnprocessableEntity } from '../../until/until'
import { ResponApi } from 'src/type/until.type'
import { Appcontext } from 'src/context/app.context'
import Button from 'src/components/Button'
type FormData = Pick<Scheme, 'email' | 'password'>
// lấy email và password thôi
const loginSchema = schema.pick(['email','password'])
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(Appcontext)
  const navigate = useNavigate()
  const {
    setError,
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  const loginAccountMutation = useMutation({
    mutationFn: (body) => authAPI.loginAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    // const body = omit(data, ['confirm_password'])
    console.log(data)
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        console.log(data)
        if (data.data.data) {
          setProfile(data.data.data.user)
        }
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ResponApi<FormData>>(error)) {
          // Lấy ra 1 object
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'server '
              })
            })
          }
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

  // const onsubmit = handleSubmit((data) => {
  //   console.log(data)
  // })
  const value = watch()
  console.log(value)
  const rudes = getRudes()
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* ban đầu cho nó 1 cột sau khi lớn lên thì 1 cột  */}
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          {/* mở rộng 2 cột , bắt đầu từ cột 2 */}
          <div className='lg:col-span-2 lg:col-start-4'>
            <form action='' className='p-10 bg-white rounded shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>
              {/* Nên có 1 thẻ div bao bọc input : để có message báo lỗi đặt trong thẻ dĩ luôn  */}

              <Inputs
                register={register}
                rudes={rudes.emails}
                errorsMessage={errors.email?.message}
                className='mt-8'
                placeholder='Email'
                type='email'
                name='email'
              />
              <Inputs
                register={register}
                rudes={rudes.password}
                errorsMessage={errors.password?.message}
                className='mt-2'
                placeholder='Password'
                type='password'
                name='password'
                autoComplete='on'
              />

              <div className='mt-3'>
                {/* w-full: 100% */}
                <Button
                  className='w-full text-center bg-orange py-4 px-2 uppercase rounded-sm text-white hover:bg-red-600'
                  // loginMutation.isPending được sử dụng để kiểm tra xem mutation (đăng nhập) có đang trong quá trình xử lý không. Nếu isPending là true thì disabled
                  isLoading={loginAccountMutation.isPending}
                  disabled={loginAccountMutation.isPending}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className=' text-slate-400'>Bạn chưa có tài khoản shoppe? </span>
                  <Link to='/Register' className='text-red-600 ml-1'>
                    Đăng Kí
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
//   {...register('email',rudes.emails)}
//   className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
//   placeholder='Email'
// />
// {/* thẻ div thông báo lỗi : min-h-[1rem] : để tránh xuất hiện text sẽ đẩy lên đẩy xuống: set up sẵn 1 rem   */}
// <div className='mt-1 text-red-600 text-sm min-h-[1rem]'></div>
// </div>

// <div className='mt-3'>
// <input
//   type='password'
//   {...register('password',rudes.password)}
//   className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
//   placeholder='Password'
//   autoComplete='on'
// />
// {/* thẻ div thông báo lỗi : min-h-[1rem] : để tránh xuất hiện text sẽ đẩy lên đẩy xuống: set up sẵn 1 rem   */}
// <div className='mt-1 text-red-600 text-sm min-h-[1rem]'></div>
// </div>
