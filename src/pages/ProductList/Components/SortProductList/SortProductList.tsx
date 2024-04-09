import React from 'react'
import { QueryConfig } from '../../ProductList'
import { sortby, order as orderPrice } from 'src/constants/product'
import { ProductListConfig } from 'src/type/product.type'
import classNames from 'classnames'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path/path'
import { omit } from 'lodash'
import { Link } from 'react-router-dom'
interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
export default function SortProductList({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const navigate = useNavigate()
  // lấy mặc định createAt
  const { sort_by = sortby.createdAt, order } = queryConfig
  //sortByValue: có thể undefined vì ?: => sử dụng Exclude<T,U> undified
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by == sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      // xử lí vẫn đề url có order khi có order
      // sort theo phổ biến. mới nhất , bán chạy
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }
  const handlePice = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        // sort :  theo giá và order :  asc or desc
        sort_by: sortby.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300 py-4 px-3 rounded-sm'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap gap-2 items-center'>
          <div className=''>Sắp xếp theo</div>
          <button
            className={classNames('h-10 px-4 capitalize bg-orange  text-sm hover:bg-orange/80 text-center rounded-sm', {
              // xử lí active
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortby.view),
              'bg-white text-black hover:bg-orange/80': !isActiveSortBy(sortby.view)
            })}
            onClick={() => handleSort(sortby.view)}
          >
            Phổ Biến
          </button>
          <button
            className={classNames('h-10 px-4 capitalize bg-orange text-sm hover:bg-orange/80 text-center rounded-sm', {
              // xử lí active
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortby.createdAt),
              'bg-white text-black hover:bg-orange/80': !isActiveSortBy(sortby.createdAt)
            })}
            onClick={() => handleSort(sortby.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-10 px-4 capitalize bg-orange  text-sm hover:bg-orange/80 text-center rounded-sm', {
              // xử lí active
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortby.sold),
              'bg-white text-black hover:bg-orange/80': !isActiveSortBy(sortby.sold)
            })}
            onClick={() => handleSort(sortby.sold)}
          >
            Bán chạy
          </button>
          {/* select option  */}
          <select
            className={classNames('h-10 px-4 capitalize text-back text-sm hover:bg-orange/80 text-left rounded-sm', {
              // xử lí active
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortby.price),
              'bg-white text-back hover:bg-orange/80': !isActiveSortBy(sortby.price)
            })}
            value={order || ''}
            // string not in assignable asc | desc
            onChange={(event) => handlePice(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' className='bg-white' disabled>
              Giá
            </option>
            {/* lấy ra kiểu order  */}
            <option value={orderPrice.asc} className='bg-white text-black'>
              Giá thấp đến cao
            </option>
            <option value={orderPrice.desc} className='bg-white text-black'>
              Giá cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex justify-start gap-10 items-center'>
          <span>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </span>
          <div className='flex items-center'>
            {page === 1 ? (
              <React.Fragment>
                <span className='bg-white px-4 h-10 rounded-tl-sm rounded-bl-sm hover:bg-slate-100 shadow-sm cursor-not-allowed flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-4 h-4'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </span>
              </React.Fragment>
            ) : (
              <>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      page: (page - 1).toString()
                    }).toString()
                  }}
                  className='bg-white px-4 h-10 rounded-tl-sm rounded-bl-sm hover:bg-slate-100 shadow-sm flex items-center'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-4 h-4'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </Link>
              </>
            )}

            {page === pageSize ? (
              <>
                <span className='bg-gray-400 px-4 h-10 rounded-tr-sm rounded-br-sm hover:bg-slate-100 shadow-sm cursor-not-allowed flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-4 h-4'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </span>
              </>
            ) : (
              <>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      page: (page + 1).toString()
                    }).toString()
                  }}
                  className='bg-gray-400 px-4 h-10 rounded-tr-sm rounded-br-sm hover:bg-slate-100 shadow-sm flex items-center'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-4 h-4'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
