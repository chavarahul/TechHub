'use client'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'
import Navbar from './Navbar'
interface Child{
    children:ReactNode
}
const LayoutProvider = ({children}:Child) => {
    const path = usePathname()
    console.log(path)
  return (
   <>
   {path !== '/Login' && path !== '/register' && <Navbar/>}
   {children}
   </>
  )
}

export default LayoutProvider
