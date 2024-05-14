'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../user/UserData'
import { poppin } from '@/app/constants'

const Prompt = () => {
  const userData = useUser();
  const id = userData?.id || '';
const [data,setData] = useState([])
  useEffect(()=>{
    const res = async() => {
      const newData = await axios.get(`/api/dbprompt/${id}`);
      console.log(newData.data.createPrompt)
      setData(newData.data.createPrompt)
    }
    res()
  },[])
  return (
    <div>
      {
       data?.map((t:any,index:number)=>(
        <div key={index} className='border border-red-400 p-4 mt-5 mb-4 rounded-[10px] glasser'>
         <p className={`${poppin.className} leading-8`}> <span className={``} style={{ color:'rgb(1, 235, 252,0.8)'}}>Prompt</span> : {t.prompt}</p>
         <div>
         <span className={``} style={{ color:'rgb(1, 235, 252,0.8)'}}>Solution</span> 
          {
            t.output?.map((n:any,i:number)=>(
              <p key={i} className={`${poppin.className} leading-8`}>{i+1+") "}{n}</p>  
            ))
          }
         </div>
        </div>
       ))
      }
    </div>
  )
}

export default Prompt
