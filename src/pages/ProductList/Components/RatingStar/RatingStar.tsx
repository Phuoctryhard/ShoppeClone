import React from 'react'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { QueryConfig } from '../../ProductList'
import Button from 'src/components/Button'
import classNames from 'classnames'
import { omit } from 'lodash'
// index 0: có  5 vàng , indexStar : 0 - 4 vàng
// index 1: có  4 vàng , indexStar : 0 - 3 vàng
// index 2: có  3 vàng , indexStar : 0 - 2 vàng
// index 3: có  2 vàng , indexStar : 0 - 1 vàng
// index 4: có  1 vàng , indexStar : 0  vàng
// => indexStart < 5 - index => vàng
interface Props {
  queryConfig: QueryConfig
}
export default function RatingStar({ queryConfig }: Props) {
  const navigate = useNavigate()
  const handleRating = (index: number) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        // chỉ nhận String
        rating_filter: String(5 - index)
      }).toString()
    })
  }
  const handleDeleteAllRating = () => {
    navigate({
      pathname: '/',
      search: createSearchParams(
        omit(
          {
            ...queryConfig
          },
          ['rating_filter', 'price_min', 'price_max', 'category']
        )
      ).toString()
    })
  }
  return (
    <div>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            // thẻ div hay Link mà có onClick sẽ ko xử lí Visible,Lỗi: non-interactive elements with click handlers must have at least one keyboard listener.eslintjsx-a11y/click-events-have-key-events
            //, thay thành button thực hiện chức năng Click
            // fix : aria-hidden="true" vs div
            // xử li tab :tabIndex={0} role='button'
            <div
              aria-hidden='true'
              tabIndex={0}
              role='button'
              className={classNames('flex mt-2 ml-3 items-center pr-1  pt-1 pb-1 ', {
                // xử lí active
                'bg-gray-300 rounded-md ': String(5 - index) == queryConfig.rating_filter
              })}
              key={index}
              onClick={() => handleRating(index)}
            >
              {/* vàng  */}
              {Array(5 - index)
                .fill(0)
                .map((_, index) => (
                  <svg
                    key={index}
                    viewBox='0 0 9.5 8'
                    className='shopee-svg-icon rating-stars__star icon-rating-colored w-5 h-5 mr-1'
                  >
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ))}
              {/* trắng */}
              {Array(index)
                .fill(0)
                .map((_, index) => {
                  return (
                    <svg viewBox='0 0 30 30' className='_0ebc6I w-5 h-5 mr-1' key={index}>
                      <defs>
                        <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                          <stop offset='0%' stopColor='#FFD211' />
                          <stop offset='100%' stopColor='#FFAD27' />
                        </linearGradient>
                      </defs>
                      <path
                        fill='none'
                        fillRule='evenodd'
                        stroke='url(#star__hollow)'
                        strokeWidth={2}
                        d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                      />
                    </svg>
                  )
                })}
              {index < 1 ? '' : <span>Trở Lên</span>}
            </div>
          )
        })}
      <div className='h-[1px] bg-gray-300 my-4'></div>
      <Button
        className='uppercase text-white p-2 bg-orange w-full rounded-md hover:bg-orange/80'
        onClick={handleDeleteAllRating}
      >
        Xóa Tất cả{' '}
      </Button>
    </div>
  )
}
