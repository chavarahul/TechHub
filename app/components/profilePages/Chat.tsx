


'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../user/UserData'
import { poppin } from '@/app/constants'
import PreLoader from '../common/PreLoader'

const Chat = () => {
  const userData = useUser();
  const id = userData?.id || '';
  const [data, setData] = useState([])
  const[success,setSuccess] = useState<boolean>(false) 
  useEffect(() => {
    const res = async () => {
      setSuccess(false)
      const newData = await axios.get(`/api/dbChat/${id}`);
      console.log(newData.data.createPrompt)
      setSuccess(true)
      setData(newData.data.createPrompt)
    }
    res()
  }, [])
  return (
    <>
      {
        success&&
        data?.map((t: any, index: number) => (
          <div key={index} className='mb-4 mt-5 p-4 glasser '>
            <p className={`${poppin.className} mb-3 leading-8`}><span className={``} style={{ color: 'rgb(1, 235, 252,0.8)' }}>Prompt </span> : {t.prompt}</p>
            <div>
              {
                t.data?.map((n: any, i: number) => (
                  <p key={i} className={`${poppin.className} leading-8`}><span className='' style={{ color: 'rgb(1, 235, 252,0.8)' }}>Solution</span> : {n}</p>
                ))
              }
            </div>
          </div>
        ))
        
      }
      {
        !success &&  <PreLoader/>
      }
    </>
  )
}

export default Chat