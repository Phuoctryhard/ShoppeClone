import React, { InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
interface Props extends InputHTMLAttributes<HTMLImageElement> {
  // khai báo 1 số cần thiết để truyền vào thôi

  register?: UseFormRegister<any>
  rudes?: RegisterOptions
  errorsMessage?: string
  className?: string
  // placeholder: string
  // type: React.HTMLInputTypeAttribute
  // name: string
  classNameInput?: string
  classNameError?: string
  autoComplete?: string
}

export default function Inputs({
  name,
  register,
  rudes,
  errorsMessage,
  className,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm',
  placeholder,
  type,
  autoComplete
}: Props) {
  const registerResult = register && name ? register(name, rudes) : {}
  return (
    <div>
      <div className={className}>
        <input
          type={type}
          className={classNameInput}
          placeholder={placeholder}
          //       {...register('email')} nó return về thuộc tính name : => sẽ overide name
          // use Required nghĩa là phải có data ko thì lỗi
          // {...register(name, rudes)}   => lỗi undify -> fix
          // do return về 1 object => destructoring
          {...registerResult}
          name={name}
          autoComplete={autoComplete}
        />
        {/* thẻ div thông báo lỗi : min-h-[1rem] : để tránh xuất hiện text sẽ đẩy lên đẩy xuống: set up sẵn 1 rem   */}
        <div className='mt-1 text-red-600 text-sm min-h-[1.5rem]'>{errorsMessage}</div>
      </div>
    </div>
  )
}
