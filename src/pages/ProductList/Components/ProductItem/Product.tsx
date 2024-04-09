import React from 'react'
import { Link } from 'react-router-dom'
import ProducRating from 'src/components/ProducttRating'
import { Product as TypeProduct } from 'src/type/product.type'
import { formatNumberToSocialStyles } from 'src/until/until'
import { path } from 'src/constants/path/path'
interface ProductType {
  product: TypeProduct
}
// trùng tên thì mình đặt lại = as TypeProduct
export default function Product({ product }: ProductType) {
  const id = product._id
  return (
    <Link to={`${path.home}${product._id}`}>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover: shadow-md duration-100 overflow-hidden'>
        {/* BỊ TRÀN nên over flow  */}
        <div className='w-full pt-[100%] relative '>
          <img className='absolute top-0 left-0 object-cover bg-white w-full h-full' src={product.image} alt='' />
        </div>
        <div className=' p-2 '>
          {/* min-height để chứa nhiều text hơn */}
          <div className='min-h-[2rem] line-clamp-2 overflow-hidden text-xs'>{product.name}</div>
          <div className='flex items-center mt-3'>
            <div className='line-through text-gray-500 truncate'>
              <span className='text-xs'>₫</span>
              <span>{new Intl.NumberFormat().format(product.price_before_discount)}</span>
            </div>
            <div className='text-orange truncate ml-1'>
              <span className='text-xs'>₫</span>
              <span>{new Intl.NumberFormat().format(product.price)}</span>
            </div>
          </div>
          <div className='flex mt-3 items-center justify-start '>
            {/* Chồng ngôi sao 50% */}
            {/* <div className='flex items-center'>
            <div className='relative'>
              <div
                className='absolute top-0 left-0 h-full overflow-hidden'
                style={{
                  width: '50%'
                }}
              >
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  className='w-4 h-4 fill-yellow-500 text-yellow-300'
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
              <svg
                enableBackground='new 0 0 15 15'
                viewBox='0 0 15 15'
                x={0}
                y={0}
                className='w-4 h-4 fill-current text-gray-300'
              >
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div>
          </div> */}
            <ProducRating rating={product.rating}  />
            <div className='ml-2 test-sm'>
              <span>Đã bán {formatNumberToSocialStyles(product.sold)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
