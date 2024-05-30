import { poppin } from '@/app/constants'
import React from 'react'

const Real = ({test}:any) => {
  return (
    <form className='w-full  h-full relative'>
      <div className="w-full h-[10%]  flex-center mt-16" >
        <p className={`${poppin.className} text-md`}>Customize the format of your questions according to your preferences</p>
        </div>
        <div className="w-full h-[10%] relative  flex-all mt-12">
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
        <div className="flex-center h-[15%] w-full mt-16  relative">
          <p className={`${poppin.className} text-md mr-2`}>Set time for Quiz{ "         "} : {"  "}</p>
          <input type="text" name="text" className="inputs" required /><span className={`${poppin.className} text-md ml-2 mr-5`}>hr</span>
          <input type="text" name="text" className="inputs" required /><span className={`${poppin.className} text-md ml-2 mr-5`}>min</span>
          <input type="text" name="text" className="inputs" required /><span className={`${poppin.className} text-md ml-2 mr-5`}>sec</span>
        </div>
        <div className="flex-center h-[15%] w-full  py-10 mt-5">
          <p className={`${poppin.className} text-md mr-2`}>Levels of Medium ({" "}Easy - 0 | Medium - 1 | Hard - 2 {" "}) {" "}:{" "}</p>
           <input type="text" name="" id="" className='ml-5 w-20 bg-transparent border-b-2 outline-none flex-center px-1 pl-8' />
        </div>
        <div className="flex-center h-[15%] w-full mt-5  relative">
          <button className={`confirm ${poppin.className}`}>Generate {`${test === 'Content'? 'Quiz':'Content'}`}</button>
        </div>
    </form>
  )
}

export default Real