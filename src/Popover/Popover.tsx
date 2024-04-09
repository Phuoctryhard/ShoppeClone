import React, { useRef, useId } from 'react'
import { useFloating, FloatingPortal, arrow, shift, offset, flip, autoUpdate, type Placement } from '@floating-ui/react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
interface Props {
  children: React.ReactNode
  renderPopever: React.ReactNode
  className?: string
  initialOpen?: boolean
  translate_x?: string
  placement?: Placement
}
export default function Popover({ children, renderPopever, className, initialOpen, translate_x, placement }: Props) {
  const id = useId()
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef < HTMLElement > null
  // const { refs, floatingStyles, middlewareData } = useFloating()
  const showHover = () => {
    setIsOpen(true)
  }
  const leaveHover = () => {
    setIsOpen(false)
  }
  const data = useFloating({
    // offset(): popover cách thẻ cha
    middleware: [offset(1), flip(), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
    transform: false,
    // popover sẽ sang trái : bottom-start , end
    placement: placement
  })

  const { refs, floatingStyles, middlewareData } = data

  return (
    <>
      <div
        className='flex items-center py-1 hover:text-gray-300'
        ref={refs.setReference}
        onMouseEnter={showHover}
        onMouseLeave={leaveHover}
      >
        {/* <span className='mx-1'>Tiếng Việt </span> */}
        {children}

        <AnimatePresence>
          {isOpen && (
            <FloatingPortal id={id}>
              <motion.div
                ref={refs.setFloating}
                // phóng to thu nhỏ tại mũi tên arrow
                style={{ transformOrigin: `${middlewareData.arrow?.x}px top`, ...floatingStyles }}
                // tôi tự thêm mt 0.5
                className='bg-white '
                initial={{ opacity: 0, transform: 'scale(0' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0, transform: 'scale(0' }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className={`absolute z-10 translate-y-[-90%] border-[11px] border-x-transparent border-t-transparent border-b-white ${translate_x}`}
                  style={{
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y
                  }}
                ></span>
                {renderPopever}
              </motion.div>
            </FloatingPortal>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
