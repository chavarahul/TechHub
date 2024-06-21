import axios from 'axios'
import React, { useState } from 'react'

const Page = () => {
  const [news,setNews] = useState('')
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const response = await axios.get(`https://newsapi.org/v2/everything?q=${news}&apiKey=dda8db681ab74cae8f51713585f96c33`);
  console.log(response)
  }
  return(
    <form action="" onSubmit={handleSubmit}>
        <input type="text" name="" id="" value={news} onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
            {
                setNews(e.target.value)
            }
        } />
    </form>
  )
}

export default Page