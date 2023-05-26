import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname()
  const router = useRouter();


  const goToUserProfile = () => {
    if (!session?.user) {
      toast.error(`You need to login to see other's profile`)
      return;
    }

    router.push(`/profile/?id=${post.creator._id}`)
  }



  const goToSingleBlog = (id) => {
    if (!session?.user) {
      toast.error(`You need to login to see full blog`)
      return;
    }
    router.push(`/single-blog/?id=${id}`)

  }
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />

      <div className={pathName === "/profile" ? "shadow border-b-2 border-gray-400  w-full md:w-1/3 bg-white rounded-md p-2 mx-auto my-4" : "flex flex-col gap-4  px-4 py-2 rounded-md  flex-wrap bg-white hover:bg-white hover:scale-105 border-2 border-gray-100 shadow hover:border-white"
      }
      >
        <div className='flex'>

          <Image
            src={post.creator.image}
            alt='creator_image'
            width={40}
            height={40}
            className='rounded-md '
          />
          <div className='flex gap-4'>

            <div className='flex flex-col items-start ml-4'>

              <h2 className='text-md  font-semi bold hover:cursor-pointer' onClick={goToUserProfile} >@ {post.creator.username}</h2>
              <p className='text-gray-400 text-sm ' >{post.creator.email}</p>
            </div>




          </div>
        </div>
        <div>
          <p className='text-gray-800'>{post.prompt.substring(0, 100)}
            <span className='text-blue-400 text-xl hover:cursor-pointer mx-1' onClick={() => goToSingleBlog(post._id)}>
              ....
            </span>
          </p>
          <p onClick={() => handleTagClick && handleTagClick(post.tag)} className='text-blue-400 hover:cursor-pointer'  >

            #{post.tag}</p>
        </div>
        <div className='py-2'>

          <button onClick={() => goToSingleBlog(post._id)} className='flex items-center gap-2 bg-gray-200 px-2 py-1 rounded-md shadow hover:bg-sky-100 ' >
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>

          </button>
        </div>



        {session?.user.id === post.creator._id && pathName === "/profile" && (
          <div className='flex gap-4 items-center justify-between'>
            <p
              className='font-inter text-sm  cursor-pointer bg-green-400 px-5 py-1 rounded-md hover:bg-green-500 shadow'
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className='font-inter text-sm  cursor-pointer bg-orange-400 px-5 py-1 rounded-md hover:bg-orange-500 shadow'
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
      </div >

    </>
  )
}

export default PromptCard