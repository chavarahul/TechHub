import React from 'react'
import Hero from '../components/effects/quiz/Preloader'
import { VortexDemoSecond } from '../components/ui/VortexDemo'
import { poppin } from '../constants'

const page = () => {
  return (
  <>
  <Hero/>
    <div className=' w-full min-h-[85vh] relative bg-[black]'>
      <VortexDemoSecond/>
        <div className='w-full relative min-h-screen'>
           <div className="w-full borders min-[10%] flex-center py-10">
            <p className={`${poppin.className} text-4xl capitalize`}>Design your own unique quiz</p>  
          </div>   
        </div>
    </div>
  </>
  )
}

export default page