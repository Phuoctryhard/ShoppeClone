import React from 'react'
import { Link, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import Inputs from 'src/components/Inputs'
import classNames from 'classnames'
import { Category } from 'src/type/category.type'
import { path } from 'src/constants/path/path'
import Inputnumber from 'src/components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { Scheme, schema } from 'src/until/rude'
import { yupResolver } from '@hookform/resolvers/yup'
import { error } from 'console'
import { Noundified } from 'src/until/until'
import RatingStar from 'src/pages/ProductList/Components/RatingStar'
import { QueryConfig } from 'src/hook/useQueryConfig'

interface Props {
  CategoryData: Category[]
  queryConfig: QueryConfig
}
// type FormData = {
//   price_min: string
//   price_max: string
// }
// có thể lấy ở Schema
// vấn đề max_min : có thể undified
// những cái thuộc tính khác nó required nên ko undified dc
//  Noundified loại bỏ undified

type FormData = Noundified<Pick<Scheme, 'price_max' | 'price_min'>>
const priceSchema = schema.pick(['price_max', 'price_min'])

export default function AsideFilter({ CategoryData, queryConfig }: Props) {
  // default value undified  nếu ko truyền vào
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    // xử lí chặt chẽ , nếu ko có sẽ render {} xong đó value undified
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    // dùng cho controller , register thì tự có ref rùi
    // xóa bỏ mặc đinh price_min
    shouldFocusError: false
  })
  const onSubmit = handleSubmit(
    (data) => {
      console.log(data)
      // thành công
      navigate({
        pathname: '/',
        search: createSearchParams({
          ...queryConfig,
          price_min: data.price_min,
          price_max: data.price_max
        }).toString()
      })
    },
    (error) => {
      error.price_max?.ref?.focus()
    }
  )

  // in ra value khi onchange
  const valueWatch = watch()
  console.log(valueWatch)
  console.log(errors)

  const { category } = queryConfig
  // ko có category trên url => undified
  // CategoryData : lấy từ useQuery
  console.log(category, CategoryData)
  return (
    <div className='py-4'>
      <Link
        to='/'
        // xử lí active
        className={classNames('flex items-center font-bold uppercase ', {
          'text-orange ': category == undefined
        })}
      >
        <svg
          className={classNames('w-6 h-6 text-gray-800 dark:text-white mr-3 ', {
            'text-orange ': category == undefined
          })}
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path stroke='currentColor' strokeLinecap='round' strokeWidth='2' d='M5 7h14M5 12h14M5 17h14' />
        </svg>
        Danh mục sản phẩm
      </Link>
      {/* <div className='h-[1px] mt-4  bg-gray-300'></div> */}
      <div className='h-[1px] bg-gray-300 mt-4'></div>
      <ul className='mt-2'>
        {CategoryData.map((categoryItems) => {
          const isActive = category === categoryItems._id
          return (
            <>
              <li className='py-2 pl-2' key={categoryItems._id}>
                {/* url : cateGory theo Id */}
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItems._id
                    }).toString()
                  }}
                  className={classNames('relative px-2 ', {
                    'text-orange font-semibold': isActive
                  })}
                >
                  {/* relative để dưới ăn theo */}
                  {isActive && (
                    <svg
                      viewBox='0 0 2 3.5' // Adjusted viewBox dimensions
                      // fill - orange
                      className='w-3 h-3 fill-orange absolute left-[-6px] top-[3px]'
                    >
                      <polygon points='2 1.75 0 0 0 3.5' />
                    </svg>
                  )}
                  {categoryItems.name}
                </Link>
              </li>
            </>
          )
        })}
      </ul>
      <Link to='' className='flex items-center mt-6 uppercase font-bold'>
        <svg
          className='w-4 h-4 text-gray-800 dark:text-white mr-3'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeWidth={2}
            d='M18.8 4H5.2a1 1 0 0 0-.7 1.7l5.3 6 .2.7v4.8c0 .2 0 .4.2.4l3 2.3c.3.2.8 0 .8-.4v-7.1c0-.3 0-.5.2-.7l5.3-6a1 1 0 0 0-.7-1.7Z'
          />
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='h-[1px] bg-gray-300 my-4'></div>
      <div className=''>
        <div className=''>Khoảng Giá</div>
        <form action='' onSubmit={onSubmit}>
          <div className='flex items-start mt-4'>
            {/* xử lí input number  */}
            <Controller
              control={control}
              name='price_min'
              // trong field có onChange, onBlur, value, ref
              // destructoring : {field}
              render={({ field: { onChange, ref, value } }) => {
                return (
                  <Inputnumber
                    className='grow'
                    type='input'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm pl-2'
                    placeholder='đ Từ '
                    // onChange={onChange} cách khác :
                    // onChange: send data back to hook form
                    onChange={(event) => {
                      onChange(event)
                      // validate price_max
                      trigger('price_max')
                    }}
                    // react hook form quản lí number của mình
                    value={value}
                    ref={ref}
                    classNameError='hidden'
                  />
                )
              }}
            />
            <div className='mx-2 flex items-center mt-1'>-</div>
            <Controller
              control={control}
              name='price_max'
              // trong field có onChange, onBlur, value, ref
              // destructoring : {field}
              render={({ field: { onChange, value, ref } }) => {
                return (
                  <Inputnumber
                    className='grow'
                    type='input'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm pl-2'
                    placeholder='đ Đến'
                    // onChange={onChange} cách khác :
                    // onChange: send data back to hook form
                    onChange={(event) => {
                      onChange(event)
                      // validate price_min
                      trigger('price_min')
                    }}
                    // react hook form quản lí number của mình
                    value={value}
                    ref={ref}
                    classNameError='hidden'
                  />
                )
              }}
            />
          </div>
          <div className='mt-1 text-red-600 text-sm min-h-[1.5rem]'>{errors.price_min?.message}</div>

          <Button className='w-full bg-orange p-2 text-white rounded-md uppercase hover:bg-orange/80'>Áp dụng</Button>
        </form>
      </div>
      <div className='h-[1px] bg-gray-300 my-4'></div>
      <div className=''>
        <div className=''>Đánh Giá</div>
        <RatingStar queryConfig={queryConfig} />
      </div>
    </div>
  )
}
{
  /* <Inputnumber
              type='input'
              className='grow'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm pl-2'
              placeholder='đ Đến'
            /> */
}
