import React from 'react'
import classNames from 'classnames'
import { QueryConfig } from 'src/pages/ProductList/ProductList'
import { Link, createSearchParams } from 'react-router-dom'
import { path } from 'src/constants/path/path'
// interface pagination {
//   page: number
//   setPage: React.Dispatch<React.SetStateAction<number>>
//   pageSize: number
// }

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
const Range = 2

export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)

  console.log(page)
  console.log(pageSize)

  let dotBefore = false
  let dotAfter = false
  const renderDotAfter = (index: number) => {
    if (!dotAfter) {
      dotAfter = true
      return (
        <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-poiter '>
          ...
        </button>
      )
    }
    return null
  }
  // if (page > Range * 2 + 1 && page < pageSize - Range * 2) {
  //   if (pageNumber > 2 && pageNumber < pageSize - Range) {
  //     // chek đúng
  const renderDotBefore = (index: number) => {
    if (!dotBefore) {
      dotBefore = true
      return (
        <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-poiter '>
          ...
        </button>
      )
    }
    return null
  }
  const renderPagination = () => {
    // xử lí ...  lần
    // ///// điều kiện để return ...
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        // xử lí th1: <=5 và ...
        if (page <= Range * 2 + 1 && pageNumber > page + Range && pageNumber < pageSize - Range + 1) {
          // dấu ... show 1 lần
          // page = 1 => pagenumber >=  4  <= 16 : ... dot    lần thôi vid mình dotAfter = true rùi
          return renderDotAfter(index)
        } else if (page > Range * 2 + 1 && page < pageSize - Range * 2) {
          if (pageNumber > Range && pageNumber < page - Range) {
            return renderDotBefore(index)
          } else if (pageNumber > page + Range && pageNumber < pageSize - Range + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - Range * 2 && page <= pageSize) {
          if (pageNumber < page - Range && pageNumber > Range) {
            return renderDotBefore(index)
          }
        }
        // render số
        return (
          // thay button thành Link
          // link dạng: /?page=1&&sort = 2

          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            // xử lí page khi dc active 
            className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-poiter border ', {
              'border-cyan-500': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
            // onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='flex flex-wrap mt-6 justify-center '>
      {page == 1 ? (
        <button className='bg-white/60 rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed border '>Prev</button>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-poiter border '
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {page == pageSize ? (
        <button className='bg-white/60 rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed  border'>Next</button>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-poiter  border'
        >
          Next
        </Link>
      )}
    </div>
  )
}
