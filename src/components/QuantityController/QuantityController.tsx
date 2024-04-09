import React from 'react'
import Inputnumber from '../InputNumber'
import { PropsInnerNumber } from '../InputNumber/Inputnumber'

interface Props extends PropsInnerNumber {
  max?: number
  min?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void // sự kiện onchange trên input
  classNameWrapper: string
  value: number
  disable : boolean
}
export default function QuantityController({
  max,
  min,
  onIncrease,
  onDecrease,
  onType,
  classNameWrapper = 'ml-6',
  value,
  disable,
  onFocusOut 
  
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max != undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
  }
  const increase = () => {
    let _value = Number(value)
    if (max != undefined && _value > max) {
      _value = max
    } else {
      _value += 1
    }
    onIncrease && onIncrease(_value)
  }
  const decrease = () => {
    let _value = Number(value)
    if (max != undefined && _value < 1) {
      _value = 0
    } else {
      _value -= 1
    }
    onDecrease && onDecrease(_value)
  }
  // xu li blur 
  const handleBlur = (event :React.FocusEvent<HTMLInputElement, Element>)=>{
    onFocusOut && onFocusOut(Number(event.target.value))
  }

  return (
    <div>
      <div className={'flex items-center ' + classNameWrapper}>
        <button
          className='h-8 w-8 border border-gray-400 flex items-center justify-center rounded-l-sm'
          onClick={decrease}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
          </svg>
        </button>
        {/* className='px-5 border-y border-gray-400 h-8 flex items-center justify-center' */}
        <Inputnumber
          value={value}
          className=''
          classNameError='hidden'
          classNameInput='h-8 w-14 border-t border-b border-gray-300 text-center outline-none'
          onChange={handleChange}
          disabled = {disable}
          onBlur={handleBlur}
        />
        <button
          className='h-8 w-8 border border-gray-400 flex items-center justify-center rounded-r-sm'
          onClick={increase}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </button>
      </div>
    </div>
  )
}
