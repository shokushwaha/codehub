import Feed from '@components/Feed'
const Home = () => {
  return (
    <>

      <section className="flex flex-col w-full items-center justify-center py-4 bg-neutral-800 pb-20 shadow-4 shadow-black">
        <h1 className='text-3xl uppercase font-extrabold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent'>Discover & Share</h1>

        <span className='text-xl font-bold text-gray-200 mt-4' >Dev Blogs</span>
        <div className='' >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-28 h-28">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>

        </div>
        <p className='text-center font-semibold
        from-orange-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent
        
        '>Get the latest information, insights, announcements from the Dev Community</p>
      </section>
      <Feed />
    </>
  )
}

export default Home;