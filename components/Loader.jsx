import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
const Loader = () => {
    return (
        <div className='flex min-h-screen min-w-screen items-center justify-center'>

            <ThreeDots
                height="100"
                width="100"
                radius="10"
                color="#0a66fa"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    )
}

export default Loader