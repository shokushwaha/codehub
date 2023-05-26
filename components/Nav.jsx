'use client'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useRouter } from "next/navigation"
const Nav = () => {

    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);



    const router = useRouter();
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, [])

    return (
        <nav className="flex w-full items-center justify-between bg-neutral-800 px-2 py-2 fixed top-0 left-0">
            <Link href='/' className="flex gap-2 items-center py-2 ">

                <span className=" text-4xl  font-extrabold from-yellow-400 via-red-600 to-orange-600 bg-gradient-to-r bg-clip-text text-transparent uppercase " >CodeHub</span>

            </Link>




            <div className=" sm:flex hidden gap-10  items-center pr-8">
                {
                    session?.user ? <>

                        <Link
                            href='/create-prompt'
                            className="text-gray-400 hover:text-white  flex  items-center gap-1 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                            Create Blog
                        </Link>
                        <button
                            className="text-red-400 hover:text-red-600  flex items-center gap-1 "
                            onClick={signOut} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>

                            LogOut
                        </button>
                        <Image
                            alt='user-profile-image'
                            src={session?.user.image}
                            width={40}
                            height={40}
                            onClick={() => router.push(`/profile/?id=${session?.user.id}`)}
                            className="hover:cursor-pointer rounded-md shaodw" />
                    </>
                        : (
                            <>

                                {
                                    providers && Object.values(providers).map((provider) => (
                                        <button type="button" key={provider.name} onClick={() => signIn(provider
                                            .id)} className="bg-green-400 hover:bg-green-600 rounded-md px-4 py-2 shadow " >
                                            SignIn
                                        </button>
                                    ))
                                }
                            </>
                        )
                }
            </div>



            <div className='sm:hidden flex relative '>
                {session?.user ? (
                    <div className='flex flex-col'>
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        />

                        {toggleDropdown && (
                            <div className='absolute right-0 top-full mt-3  p-5 rounded-lg bg-white border-2 border-gray-200 flex flex-col gap-2 justify-end items-end '>
                                <Link
                                    href={`/profile/?id=${session?.user.id}`}
                                    className='flex items-center gap-1 w-28'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>

                                    My Profile
                                </Link>
                                <Link
                                    href='/create-prompt'
                                    className='w-28 flex gap-1 items-center '
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Blog
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className='flex items-center gap-1 w-28'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                    </svg>

                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className='bg-green-400 hover:bg-green-600 rounded-md px-4 py-2 shadow'
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>

        </nav>
    )
}

export default Nav