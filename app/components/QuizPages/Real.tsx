import { poppin } from '@/app/constants'
import React from 'react'

const Real = ({test}:any) => {
  return (
    <form className='w-full  h-full relative'>
      <div className="w-full h-[10%]  flex-center mt-10" >
        <p className={`${poppin.className} text-md`}>Customize the format of your questions according to your preferences</p>
        </div>
        <div className="w-full h-[10%] relative  flex-all mt-5">
           <div className="flex w-[20%] flex-center relative">
            <p className={`${poppin.className} text-md`}>Number Of Questions :</p>
            <input type="text" name="text" className="inputs" required />
           </div>
           <div className="flex w-[20%] flex-center relative">
            <p className={`${poppin.className} text-md`}>Total Marks : </p>
            <input type="text" name="text" className="inputs" required />
           </div>
           <div className="flex w-[20%] flex-center relative">
            <p className={`${poppin.className} text-md`}>Negative Marks : </p>
            <input type="text" name="text" className="inputs" required />
           </div>
        </div>
        <div className="flex-center h-[15%] w-full mt-10  relative">
          <p className={`${poppin.className} text-md mr-2`}>Set time for Quiz{ "         "} : {"  "}</p>
          <input type="text" name="text" className="inputs" required /><span className={`${poppin.className} text-md ml-2 mr-5`}>hr</span>
          <input type="text" name="text" className="inputs" required /><span className={`${poppin.className} text-md ml-2 mr-5`}>min</span>
          <input type="text" name="text" className="inputs" required /><span className={`${poppin.className} text-md ml-2 mr-5`}>sec</span>
        </div>
        <div className="flex-center h-[15%] w-full mt-10  relative">
          <button className={`confirm ${poppin.className}`}>Generate {`${test === 'Topic'? 'Quiz':'Content'}`}</button>
        </div>
    </form>
  )
}

export default Real