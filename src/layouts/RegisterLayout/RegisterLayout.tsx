import React from 'react'
import Footer from 'src/components/Footer'
import Registerheader from 'src/components/RegisterHeader'
interface Props{
  children? : React.ReactNode 
}
export default function RegisterLayout({children}: Props) {
  return (
    <div>
      <Registerheader/>
      {children}
      <Footer/>
    </div>
  )
}
