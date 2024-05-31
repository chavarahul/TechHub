'use client'
import { poppin } from '@/app/constants'
import axios from 'axios';
import React, { useState } from 'react'
import { FormData } from '@/app/constants/type';

const Professional = ({ test,prompt }: { test: string, prompt: string }) => {
  const [questions, setQuestions] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [negativeMarks, setNegativeMarks] = useState('')
  const [level, setLevel] = useState('')
  const[monitering,setMonitering] = useState<boolean>(false)

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value;
    if (value === '' || (/^\d{1,3}$/.test(value) && Number(value) >= 1 && Number(value) <= 999)) {
      setState(value);
    }
  };
  const handleLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || (/^\d{0,1}$/.test(val) && Number(val) >= 0 && Number(val) <= 2)) {
      setLevel(val);
    }
  }
  const formSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const fromData :FormData = {type:test,questions,level,prompt,monitering};
    handleSubmit(e,fromData);
  }
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>,fromData:FormData) =>{
   try{
    e.preventDefault();
    const res = await axios.post('http://127.0.0.1:5000/professional',{type:fromData.type,questions:fromData.questions,prompt:fromData.prompt,moniter:fromData.monitering});
    console.log(res?.data)
   }catch(error){
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Response error:', error.response.data);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
   }
  }
  return (
    <form className='w-full  h-full relative' autoCorrect='yes' autoComplete='on' onSubmit={formSubmit}>
      <div className="w-full h-[10%]  flex-center mt-16" >
        <p className={`${poppin.className} text-md`}>Customize the format of your questions according to your preferences</p>
      </div>
      <div className="w-full h-[10%] relative  flex-all mt-12">
        <div className="flex w-[20%] flex-center relative">
          <p className={`${poppin.className} text-md`}>Number Of Questions :</p>
          <input
            type="text"
            className="inputs"
            value={questions}
            onChange={(e) => handleNumberChange(e, setQuestions)}
            required
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
        <div className="flex w-[20%] flex-center relative">
          <p className={`${poppin.className} text-md`}>Total Marks : </p>
          <input
            type="text"
            className="inputs"
            value={totalMarks}
            onChange={(e) => handleNumberChange(e, setTotalMarks)}
            required
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
        <div className="flex w-[20%] flex-center relative">
          <p className={`${poppin.className} text-md`}>Negative Marks : </p>
          <input
            type="text"
            className="inputs"
            value={negativeMarks}
            onChange={(e) => handleNumberChange(e, setNegativeMarks)}
            required
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
      </div>
      <div className="w-full h-[10%]  flex-center mt-16" >
        <p className={`${poppin.className} text-md`}>Customize the format of your time according to your preferences</p>
      </div>
      <div className="flex-all h-[15%] w-full mt-16  relative">
        <div className="w-[40%]  flex-all">
          <p className={`${poppin.className} text-md mr-2`}>Set time for Entire Quiz{"         "} : {"  "}</p>
          <input type="text" name="text" className="inputs" required /><span className={`${poppin.className} text-md ml-2 mr-5`}>hr</span>
          <input type="text" name="text" className="inputs" required /><span className={`${poppin.className} text-md ml-2 mr-5`}>min</span>
          <input type="text" name="text" className="inputs" required /><span className={`${poppin.className} text-md ml-2 mr-5`}>sec</span>
        </div>
        <div className="">|</div>
        <div className="w-[40%]  flex-all">
          <p className={`${poppin.className} text-md mr-2`}>Set time for Each Question{"         "} : {"  "}</p>
          <input type="text" name="text" className="inputs" required /><span className={`${poppin.className} text-md ml-2 mr-5`}>hr</span>
          <input type="text" name="text" className="inputs" required /><span className={`${poppin.className} text-md ml-2 mr-5`}>min</span>
          <input type="text" name="text" className="inputs" required /><span className={`${poppin.className} text-md ml-2 mr-5`}>sec</span>
        </div>
      </div>
      <div className="flex-center h-[15%] w-full mt-16 relative">
        <input type="radio" name="" id="" className='w-4 h-4 cursor-pointer' checked={monitering} onClick={()=>setMonitering(!monitering)} />
        <p className={`${poppin.className} text-md ml-4`} onClick={()=>setMonitering(!monitering)}>Monitering</p>
      </div>
      <div className="flex-center h-[15%] w-full mt-16 relative pb-10">
        <button className={`confirm ${poppin.className}`}>Generate {`${test === 'Content' ? 'Quiz' : 'Content'}`}</button>
      </div>
    </form>
  )
}

export default Professional