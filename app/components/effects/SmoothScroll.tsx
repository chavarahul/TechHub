'use client'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'

const SmoothScroll = ({children}:any)=> {

  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  )
}
export default SmoothScroll
