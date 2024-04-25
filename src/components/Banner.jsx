import Image from 'next/image'
import React from 'react'
import shoeImg from "../../public/shoe-imgg.png"

const Banner = () => {
  return (
    <div className='bg bg-[#dad7cd] w-full flex items-center justify-center py-16 z-10'>
        <Image src={shoeImg} height={600} width={600} alt='banner-img' className='-rotate-12 w-96 drop-shadow-2xl' />
    </div>
  )
} 

export default Banner