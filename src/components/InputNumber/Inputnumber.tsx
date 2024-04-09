import React, { InputHTMLAttributes, forwardRef } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
// dùng gõ mỗi số thui
export interface PropsInnerNumber extends InputHTMLAttributes<HTMLInputElement> {
  // khai báo 1 số cần thiết để truyền vào thôi
  errorsMessage?: string
  className?: string
  classNameInput?: string
  classNameError?: string
}
const Inputnumber = forwardRef<HTMLInputElement, PropsInnerNumber>(function InputNumberInner(
  {
    errorsMessage,
    className = 'mt-1 text-red-600 text-sm min-h-[1.5rem]',
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm',
    onChange,
    ...rest
  },
  ref
) {
  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    // check Number
    if ((/^\d+$/.test(value) || value == '') && onChange) {
      // người dũng gõ số onchange chạy
      // truyền  event thì ngoài kia nhận event
      onChange(event)
    }
    return
  }
  return (
    <div>
      <div className={className}>
        {/* ref = {ref }: bên ngoài sẽ nhận dc ref  */}
        <input className={classNameInput} {...rest} onChange={handleChanges} ref={ref} />
        {/* thẻ div thông báo lỗi : min-h-[1rem] : để tránh xuất hiện text sẽ đẩy lên đẩy xuống: set up sẵn 1 rem   */}
        <div className={className}>{errorsMessage}</div>
      </div>
    </div>
  )
})
export default Inputnumber
