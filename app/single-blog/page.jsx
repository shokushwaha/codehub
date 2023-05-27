'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import React, { useState, useEffect } from 'react'

const SingleBlog = () => {
    const searchParam = useSearchParams()
    const { data: session } = useSession()
    const blogId = searchParam.get('id')
    const [blog, setBlog] = useState({});

    const router = useRouter();
    useEffect(() => {

        if (blogId)
            fetchBlog()

    }, [])
    const fetchBlog = async () => {
        const response = await fetch(`/api/blog/${blogId}`);
        const data = await response.json();
        setBlog(data[0]);


    }




    return (
        <div className='bg-slate-100 flex  justify-center w-full min-h-screen px-10 py-12'>

            <div>


                <div className='flex items-center'>
                    {!blog.creator ? "Hold on....loading!" : <>
                        <div>

                            <Image src={blog.creator.image} width={80} height={80} alt='blog_write_image' />
                        </div>
                        <div className='flex flex-col'>
                            <span className='flex items-center gap-1 font-semibold'>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                </svg>
                                {blog.creator.username}
                            </span>
                            <span className=' flex items-center gap-1 text-gray-400 font-sm'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>

                                {blog.creator.email}
                            </span>
                        </div>
                    </>}
                </div>

                <div className='flex flex-col gap-4 mt-4'>
                    <span>

                        {blog.prompt}
                    </span>
                    <span>

                        # {blog.tag}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SingleBlog