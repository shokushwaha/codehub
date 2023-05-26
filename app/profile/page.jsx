'use client'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Profile from '@components/Profile';
import Loader from '@components/Loader';
import HandLoader from '@components/HandLoader';
const MyProfile = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([])
    const router = useRouter();
    const searchParams = useSearchParams()
    const userId = searchParams.get('id');
    const [userDet, setUserDet] = useState({})
    const [loading, setLoading] = useState(false);

    const handleEdit = async (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }


    const handleDelete = async (post) => {

        const hasConfiremd = confirm("Are you sure you want to delete?");
        if (hasConfiremd) {
            try {

                const response = await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE"
                })
                if (response.ok)
                    router.push('/')
            } catch (error) {
                console.log(error);
            }
        }

    }


    useEffect(() => {

        const fetchPosts = async () => {
            setLoading(true);
            if (session?.user.id === userId) {


                const response = await fetch(`/api/users/${session?.user.id}/posts`);
                const data = await response.json();
                setPosts(data);
                console.log(data)
            }
            else {
                const response = await fetch(`/api/users/${userId}/posts`);
                const data = await response.json();
                setPosts(data);
                const response2 = await fetch(`/api/profile/${userId}`)
                const data2 = await response2.json();
                setUserDet(data2[0])
                console.log(data2[0])
            }
            setLoading(false);

        }
        if (session?.user.id)
            fetchPosts();
    }, [])

    if (loading)
        return (
            <div className='flex items-center justify-center mt-80'>

                <HandLoader />
            </div>
        )
    return (
        <div className='mt-10 px-8 py-8'>

            <Profile
                name={session?.user.id === userId ? `${session.user.name}` : `${userDet.username}`}
                desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
                data={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    )
}

export default MyProfile