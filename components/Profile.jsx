'use client'
import React from 'react'
import PromptCard from './PromptCard'
import { useSession, session } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import BlogLoader from './BlogLoader'
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {

  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  return (

    <div className='flex flex-col bg-slate-100 p-4 min-h-screen '>

      <h1 className='text-2xl '>

        {name} profile
      </h1>
      <p>

        {desc}


      </p>

      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
        />
      ))}


    </div>
  )
}

export default Profile