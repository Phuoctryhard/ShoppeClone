import React from 'react'
import AsideFilter from './Components/AsideFilter'
import SortProductList from './Components/SortProductList'
import Product from './Components/ProductItem'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import productApi from 'src/api/product.api'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/type/product.type'

import CategoryApi from 'src/api/category.api'
import { useQueryConfig } from 'src/hook/useQueryConfig'

export default function ProductList() {

  //omitBy :  loại bỏ những thuoc tinh ko t/m dieu kien
  // khởi tạo queryconfig
  const queryconfig = useQueryConfig()
  
  console.log(queryconfig)
  // const [page, setPage] = useState(2)
  // console.log(queryParams)
  const { data: productsData } = useQuery({
    // queryKey: ['product', queryParams],
    // queryconfig như category hay order hay sort_by thay đổi thì nó useQuery lại
    queryKey: ['products', queryconfig],
    // khi queryParams thay đổi thì useQuery tính năn như useEffect
    queryFn: () => {
      // fix loi du lieu : as ProductListConfig
      return productApi.getProduct(queryconfig as ProductListConfig)
    },
    // data sẽ ko null khi chuyển trang mà lấy data cũ nên sẽ ko bị giật
    placeholderData: keepPreviousData,
    staleTime : 3*60*1000
  })

  const { data: CategoryData } = useQuery({
    // categpry chỉ gọi  lần nên ko cần truyền
    queryKey: ['category'],
    queryFn: () => {
      return CategoryApi.getCategory()
    }
  })
  console.log(CategoryData?.data.data)
  console.log(productsData)
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              {/* mong muốn có url : bán chạy và điện thoại => queryConfig */}
              <AsideFilter CategoryData={CategoryData?.data.data || []} queryConfig={queryconfig} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryconfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xg:grid-cols-5 gap-3'>
                {productsData.data.data.products.map((element, index) => (
                  <Product key={index} product={element} />
                ))}
              </div>
              <Pagination queryConfig={queryconfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
