import React from 'react'
import loading from "@/public/assets/images/loading.svg";
import Image from 'next/image';

const Loading = () => {
    return (
        <div className='h-screen w-screen flex justify-center items-start mt-12'>
            <Image src={loading.src} height={80} width={80} alt='Loading' />
        </div>
    )
}



export default Loading