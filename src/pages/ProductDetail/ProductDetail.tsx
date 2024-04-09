import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import productApi from 'src/api/product.api'
import Inputnumber from 'src/components/InputNumber'
import ProducRating from 'src/components/ProducttRating'
import { formatNumberToSocialStyles, formatCurrency, rateSale } from 'src/until/until'
import DOMPurify from 'dompurify'
import { useState } from 'react'
import { ProductListConfig } from 'src/type/product.type'
import { useQueryConfig } from 'src/hook/useQueryConfig'
import Product from '../ProductList/Components/ProductItem'
import QuantityController from 'src/components/QuantityController'
import purchaseApi from 'src/api/purchase.api'
import { queryClient } from 'src/main'
import { purchasesStatus } from 'src/constants/path/purchase'
import { toast } from 'react-toastify'
// Bước làm Slider ảnh
// b1 : lấy index danh sách img [0 5 ] quản lí = useState
// b2 : biến curentImages để tính toán curentImages khi nó thay đổi
// b3 : xử lí active : khi hover thì cập nhật active img : name  (const isActive = active ? img == active : img == currentImages[0])
// b4 xử lí button next prev :
export default function ProductDetail() {
  const { id } = useParams()
  const { data: ProductDetailData } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => {
      // lỗi undified thì as string vì lúc nào nó cũng có
      return productApi.getProductDetail(id as string)
    }
  })
  // ví dụ {page : "1" , limit : 5}:
  const queryconfig = { limit: '20', page: '1', category: ProductDetailData?.data.data?.category._id }
  console.log(queryconfig)
  const { data: productsDataSame } = useQuery({
    // queryKey: ['product', queryParams],
    // queryconfig như category hay order hay sort_by thay đổi thì nó useQuery lại
    queryKey: ['products', queryconfig],
    // khi queryParams thay đổi thì useQuery tính năn như useEffect
    queryFn: () => {
      // fix loi du lieu : as ProductListConfig
      // query theo category
      return productApi.getProduct(queryconfig as ProductListConfig)
    },
    // sẽ chạy useQuery khi có ProductDetail : true
    enabled: Boolean(ProductDetailData),
    staleTime: 4 * 60 * 1000
  })
  console.log(productsDataSame)
  const product = ProductDetailData?.data.data
  // product chứa category {id }
  console.log(product)

  // xử lí slider image
  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5])
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImage) : []),
    // báo lỗi eslint missing curentIndexImage
    [product, currentIndexImage]
  )
  const [active, setActive] = useState('')
  //  5 phần tử images
  console.log(currentImages)
  //b4 : next , prev
  const next = () => {
    if (product?.images.length && currentIndexImage[1] < product?.images.length) {
      setCurrentIndexImage((prev) => {
        return [prev[0] + 1, prev[1] + 1]
      })
    }
  }
  const prev = () => {
    if (product?.images.length && currentIndexImage[0] > 0)
      setCurrentIndexImage((prev) => {
        return [prev[0] - 1, prev[1] - 1]
      })
  }

  // thêm sản phầm vào giỏ hàng
  const addTocartMutation = useMutation({
    mutationFn: purchaseApi.addTocart
  })
  const AddTocart = () => {
    addTocartMutation.mutate(
      {
        buy_count: buy,
        // product?._id as string : sẽ ko bao h undified rùi
        product_id: product?._id as string
      },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, {
            autoClose: 2000
          })
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
        }
      }
    )
  }
  // xử lí inputnumber tăng giảm 
  const [buy , setBuy] = useState(1)
  const handleBuy = (value : number)=>{
    setBuy(value)
  }
  // xử lí undified
  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow '>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div className='w-full relative pt-[100%] shadow'>
                {/* ảnh có chiều cao = rong  */}
                <img
                  className='absolute top-0 left-0 object-cover bg-white w-full h-full'
                  // src={ProductDetailData?.data.data.image}
                  src={active ? active : currentImages[0]}
                  alt={ProductDetailData?.data.data.name}
                />
              </div>
              {/* slider  */}
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                {/* button là absolute nên nó ghfi đè lên ảnh  */}
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>

                {currentImages.map((img, index) => {
                  const isActive = active ? img == active : img == currentImages[0]
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => setActive(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {/* inset : t-l-b-r : 0 
                    làm cái border bao quanh = div : use inset 
                    */}
                      {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                    </div>
                  )
                })}

                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-6 h-6'
                  >
                    <path stroke-linecap='round' stroke-linejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <div className=''>
                <h1 className='text-xl font-medium '>{product.name}</h1>
              </div>
              {/* phần rating  */}
              <div className='mt-6 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 mt-1 border-b border-b-orange text-orange'>{product.rating}</span>
                  <ProducRating
                    rating={product.rating}
                    activeClassName='fill-orange text-orange h-4 w-4'
                    // fill : lấp bên trong

                    noneActiveClassName='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                </div>
                {/* <span className='h-[1rem] bg-orange w-[1px]'></span> */}
                <div className='mx-4 h-8 w-[1px] bg-gray-300'></div>
                {/* số lượng bán  */}
                <div>
                  {/* hàm format số á  */}
                  <span>{formatNumberToSocialStyles(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>

              <div className='mt-8 flex items-center'>
                <div className='text-gray-500 capitalize'>Số lượng</div>
                {/* xử lí inputNumber thêm giảm value  */}
                <QuantityController 
                  onIncrease={handleBuy}
                  onDecrease={handleBuy}
                  onType={handleBuy}
                  max = {product.quantity}
                  value  = {buy}
                />
                <div className='ml-6 flex items-center'>
                  <span className='text-gray-500 capitalize text-sm'>{product.quantity} sản phẩm có sẵn</span>
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                {/* thêm vào giỏi hàng  */}
                <button
                  onClick={AddTocart}
                  className='flex h-12 items-center justify-center rounded-sm border border-orange capitalize text-orange bg-orange/10 px-10 shadow hover:bg-orange/5 '
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    // fill-current
                    className='w-6 h-6 mr-5  stroke-orange text-orange'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button className='ml-5 w-40 h-12 flex items-center p-2 bg-orange text-white justify-center rounded-sm shadow-sm outline-none hover:bg-orange/90'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* chi tiết sản phẩm  */}
      <div className='container '>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='capitalize text-xl bg-gray-100 p-4 rounded-sm text-slate-700'>Mô tả sản phẩm</div>
          {/* line-height : chiều cao giua cac dong */}
          <div className='text-sm mb-4 leading-loose mt-8 ml-4 '>
            <div
              className=''
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className=''>Có thể bạn thích</div>
          <div className='mt-6 grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 xg:grid-cols-7 gap-3'>
            {productsDataSame?.data.data.products.map((element, index) => <Product key={index} product={element} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
