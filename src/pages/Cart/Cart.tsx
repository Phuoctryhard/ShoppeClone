import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import purchaseApi from 'src/api/purchase.api'
import { purchasesStatus } from 'src/constants/path/purchase'
import { Link } from 'react-router-dom'
import { formatCurrency } from 'src/until/until'
import QuantityController from 'src/components/QuantityController'
import Button from 'src/components/Button'
import { produce } from 'immer'
import { Purchase } from 'src/type/purchase.type'
import { number } from 'yup'
import _ from 'lodash'

interface ExtendedPurchase extends Purchase {
  checked: boolean
  disabled: boolean
}

export default function Cart() {
  const { data: purChaseIncartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => {
      // promise
      return purchaseApi.getPurChases({ status: purchasesStatus.inCart })
    }
    // muốn lấy đc sản phẩm trong giỏ hàng thì phải có authentication
    // chạy useQuery khi có authentication , còn ko thì purCharInCartData sẽ bị rỗngF
  })
  const purchasesIncart = purChaseIncartData?.data.data

  // xử lí Checked state trong cart vs immer
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>([])

  // b1: cho all items purchase : checked = false
  useEffect(() => {
    const purchase = _.keyBy(purchasesIncart, '_id')
    console.log(purchase)
    setExtendedPurchase(
      purchasesIncart?.map((element) => {
        return {
          ...element,
          disabled: false,
          checked: Boolean(purchase[element._id]?.checked)
        }
      }) || []
      // mảng purchasesIncart : có thể undified
    )
  }, [purChaseIncartData])

  const handleCheck = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // thay đổi tại index đó
    //draff là mảng[] trước đó
    // thay đổi checked 1 phần tử bất ki
    setExtendedPurchase(
      produce((draff) => {
        draff[index].checked = event.target.checked
      })
    )
  }
  // check all
  // nếu all isAcheckAll : true => trả về true
  const isCheckAll = extendedPurchase.every((element) => {
    return element.checked == true
  })

  const handleIsCheckAll = () => {
    setExtendedPurchase(
      extendedPurchase.map((element) => {
        return {
          ...element,
          checked: !isCheckAll
        }
      })
    )
  }
  // update purchase
  const mutatePurchase = useMutation({
    mutationFn: purchaseApi.updatePurchases,
    onSuccess: () => {
      // khi mà gọi api thành công nó sẽ gọi lại api này purChaseIncartData
      refetch()
    }
  })
  const handleQuantity = (purchaseindex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchase[purchaseindex]
      setExtendedPurchase(
        produce((draff) => {
          draff[purchaseindex].disabled = true
        })
      )
      mutatePurchase.mutate({
        product_id: purchase.product._id,
        buy_count: value
      })
    }
  }
  // ontype bên kia bắn sang value
  const handleTypeQuantity = (purchaseindex: number) => (value: number) => {
    setExtendedPurchase(
      produce((draff) => {
        draff[purchaseindex].buy_count = value
      })
    )
  }

  // Xóa hàng , mua hàng
  const buyProductMutation = useMutation({
    mutationFn: purchaseApi.buyPurchases,
    onSuccess: () => {
      refetch()
    }
  })

  const deleteProductMutation = useMutation({
    mutationFn: purchaseApi.deletePurChases,
    onSuccess: () => {
      refetch()
    }
  })

  const handleDelete = (index: number) => {
    const purchaseId = extendedPurchase[index]._id
    deleteProductMutation.mutate([purchaseId])
    
  }

  console.log(purchasesIncart)
  console.log(extendedPurchase)
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='flex  flex-shrink-1  items-center col-span-12 border-2 border-[rgba(224,168,0,.4)] px-2 bg-[#fffefb]'>
              <img
                className='w-8 h-8 object-cover '
                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/d9e992985b18d96aab90.png'
                alt=''
              />
              <span className='text-[#222] ml-2'>
                Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn nhé!
              </span>
            </div>
            {/* khi p : thì nó sẽ thu hẹp với thẻ cha  */}
            <div className='grid grid-cols-12 rounded-sm bg-neutral-100 py-5 text-sm capitalize text-gray-500 shadow gap-y-5'>
              <div className='bg-[#fffefb] col-span-6 flex items-start p-3'>
                <input
                  type='checkbox'
                  className='w-5 h-5 accent-orange'
                  checked={isCheckAll}
                  onChange={handleIsCheckAll}
                />
                <span className='ml-4 flex-grow text-black'>Sản Phẩm</span>
              </div>
              <div className='bg-[#fffefb] col-span-6 '>
                {/* grow để ăn hết khoảng ko gian trống */}
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1 '>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
              <div className='col-span-12'>
                {/* {purchasesIncart?.map((purchase, index) => { */}
                {extendedPurchase?.map((purchase, index) => {
                  return (
                    <div
                      className='items-center grid grid-cols-12 rounded-sm bg-white py-5 px-4 text-sm capitalize text-gray-500 shadow gap-y-5 border border-gray-200 '
                      key={index}
                    >
                      <div className='col-span-6' key={index}>
                        <div className='flex'>
                          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                            <input
                              type='checkbox'
                              className='h-5 w-5 accent-orange'
                              checked={purchase.checked}
                              onChange={handleCheck(index)}
                            />
                          </div>

                          <div className='flex-grow flex '>
                            <div className='flex  '>
                              <Link to='' className='h-20 w-20 flex-shrink-0 border  '>
                                <img src={purchase.product.image} alt='' />
                              </Link>
                            </div>
                            <div className='flex-grow px-2 pt-2'>
                              <Link to='' className='text-left line-clamp-2'>
                                {purchase.product.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-6  '>
                        <div className='grid grid-cols-5 items-center  '>
                          <div className='col-span-2 '>
                            <div className='flex items-center justify-center '>
                              <span className='line-through'>₫{formatCurrency(purchase.price_before_discount)}</span>
                              <span className='ml-2'> ₫{formatCurrency(purchase.price)}</span>
                            </div>
                          </div>
                          <div className='col-span-1'>
                            <QuantityController
                              value={purchase.buy_count}
                              max={purchase?.product.quantity}
                              onIncrease={(value) => handleQuantity(index, value, value <= purchase?.product.quantity)}
                              onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                              disabled={purchase.disabled}
                              onType={handleTypeQuantity(index)}
                              onFocusOut={(value: number) =>
                                // lấy purchase nguyên bản thay vì bản sao purchase.buy_count
                                handleQuantity(
                                  index,
                                  value,
                                  value <= purchase?.product.quantity &&
                                    value >= 1 &&
                                    purchasesIncart[index].buy_count != value
                                )
                              }
                            />
                          </div>
                          <div className='col-span-1 ml-6'>
                            <span className='text-orange '>
                              ₫ {formatCurrency(purchase.price * purchase.buy_count)}
                            </span>
                          </div>
                          <div className='col-span-1 '>
                            <button className='ml-11 text-black transition-colors hover:text-orange'>Xóa</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className='h-5 w-5 accent-orange'
                checked={isCheckAll}
                onChange={handleIsCheckAll}
              />
            </div>
            <button className='mx-3 border-none bg-none' onClick={handleIsCheckAll}>
              Chọn tất cả
            </button>
            <button className='mx-3 border-none bg-none'>Xóa</button>
          </div>

          <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Tổng thanh toán sản phẩm:</div>
                <div className='ml-2 text-2xl text-orange'>5</div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>₫</div>
              </div>
            </div>
            <Button className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'>
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
