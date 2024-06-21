"use client"
import axios from 'axios'
import React, { useState } from 'react'

const Page = () => {
     const [art,setArt] = useState('')
     const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await axios.post('/api/view',{art})
     }
    return(
        <form action=" " onSubmit={handleSubmit}>
            <input type="text" value={art} onChange={(e)=>{setArt(e.target.value)}} />
            <button type='submit'>ddd</button>

        </form>
    )
}

export default Page