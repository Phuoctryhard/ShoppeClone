import React from 'react'
interface Rating {
  rating: number
  // nếu ko truyền thì optional 
  activeClassName?: string
  noneActiveClassName?: string 
}
export default function ProducRating({ rating , activeClassName = 'w-4 h-4 fill-yellow-500 text-yellow-300' ,noneActiveClassName ='w-4 h-4 fill-current text-gray-300'}: Rating) {
  const handleRating = (order: number) => {
    if (order <= rating) {
      return '100%'
    } else if (order > rating && order - rating < 1) {
      return ((rating * 100) % 100) + '%'
    }
    return '0%'
  }
  return (
    <div className='flex items-center'>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <div className='relative' key={index}>
              <div
                className='absolute top-0 left-0 h-full overflow-hidden'
                style={{
                  width: handleRating(index + 1)
                }}
              >
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  className={activeClassName}
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
                // className='w-4 h-4 fill-current text-gray-300'
                className={ noneActiveClassName}
              >
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div>
          )
        })}
    </div>
  )
}
