'use client'
import { set } from 'mongoose'
import Link from 'next/link'
import { useState } from 'react'
import React from 'react'
import { Configuration, OpenAIApi } from 'openai'
const openai = new OpenAIApi(new Configuration({
  apiKey: provess.env.OPENAI_API_KEY
}))
const Form = (
  {
    type,
    post,
    setPost,
    submitting,
    hanldeSubmit

  }

) => {
  const [gptTag, setGptTag] = useState('');
  const [gptBlogData, setGptBlogData] = useState('');


  const fetchBlogFromGpt = async () => {

    openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", contnet: { gptTag } }]
    }).then((res) => {
      console.log(res.data.choices[0].message.content)
      setGptBlogData(res.data.choices[0].message.content)
    })
  }

  return (
    <section className='flex flex-col items-center  py-4 w-2/3 '>
      <h1 className='text-2xl'> {type} Blog</h1>



      <form onSubmit={hanldeSubmit} className=' flex flex-col bg-white px-4 py-8 gap-4 w-2/3 ' >
        <label className='flex flex-col justify-start border-b-2 border-gray-200'>
          <span className='text-gray-800'>
            Blog Content
          </span>
          <textarea
            value={post.prompt}
            onChange={e => setPost({ ...post, prompt: e.target.value })}
            placeholder='Enter prompt'
            required
            className='px-4 py-2 bg-gray-100 rounded-md shadow'

          />
        </label>

        <label className='flex flex-col justify-start border-b-2 border-gray-200'>
          <span className='text-gray-800'>
            Tag
          </span>
          <input
            value={post.tag}
            onChange={e => setPost({ ...post, tag: e.target.value })}
            placeholder='Enter tag'
            required
            className='px-4 py-2 bg-gray-100 rounded-md shadow'

          />
        </label>
        <div className='flex items-center justify-center'>
          <Link href='/' className='bg-red-400 px-3 py-1 rounded-md shadow hover:bg-red-500' >Cancel</Link>
        </div>

        <button
          type='submit'
          disabled={submitting}
          className='bg-green-400 rounded-md px-3 py-1 shadow hover:bg-green-500'
        >
          {submitting ? ` Hold on!⚡⚡` : type}
        </button>
        <input value={gptTag} onChange={(e) => setGptTag(e.target.value)} className='px-4 py-2 bg-gray-100 rounded-md shadow' />
        <button onClick={fetchBlogFromGpt} className='bg-yellow-400 rounded-md px-3 py-1 shadow hover:bg-yellow-500' >Autowrite </button>

        <span className='flex text-center bg-slate-200 '>
          {gptBlogData}
        </span>
      </form>
    </section>
  )
}

export default Form