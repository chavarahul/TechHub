import { poppin } from '@/app/constants'
import React from 'react'

const Mock = ({test}:any) => {
  return (
    <form className='w-full  h-full relative'>
      <div className="w-full h-[10%]  flex-center mt-10" >
        <p className={`${poppin.className} text-md`}>Customize the format of your questions according to your preferences</p>
        </div>
        <div className="w-full h-[10%] relative  flex-all mt-5">
           <div className="flex w-[20%] flex-center relative">
            <p>Number Of Questions :</p>
            <input type="text" name="text" className="inputs" required />
           </div>
           <div className="flex w-[20%] flex-center relative">
            <p>Total Marks : </p>
            <input type="text" name="text" className="inputs" required />
           </div>
        </div>
        <div className="flex-center h-[15%] w-full mt-10  relative">
          <button className={`confirm ${poppin.className}`}>Generate {`${test === 'Topic'? 'Quiz':'Content'}`}</button>
          {/* <button onClick={()=>{localStorage.removeItem('option');localStorage.removeItem('input')}}>clear</button> */}
        </div>
    </form>
  )
}

export default Mock