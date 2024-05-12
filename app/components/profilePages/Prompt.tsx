'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../user/UserData'

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
        <div key={index}>
         <p>{t.prompt}</p>
         <div>
          {
            t.output?.map((n:any,i:number)=>(
              <p key={i}>{n}</p>  
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