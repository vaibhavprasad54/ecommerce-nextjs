import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'
import orderPlaced from "../../../public/order-placed.svg";
import Image from 'next/image';

const page = () => {

  return (
    <div className='w-full h-[85vh] flex items-center justify-center'>
      <div className="main w-72 flex flex-col items-center justify-center sm:w-[37rem] bg-red-300 p-10 rounded-xl shadow-sm">
        <h1 className='text-3xl font-bold text-black'>Uh Oh! Error occured!</h1>
        <p className='text-amber-950 text-lg font-semibold'>Please try again to place the order.</p>
        <p className='text-sm text-gray-800 text-center py-4'>We're making sure you shop what you wanted.</p>
        {/* <Image src={orderPlaced} height={250} width={250} alt='order-placed-img' /> */}
        <Link href="/" className='flex items-center justify-center mt-5 gap-2 px-6 py-2 rounded-[8px] text-gray-100 bg-amber-900 hover:bg-amber-950'>
          <RotateCcw size={20} /> <p>Retry</p>
        </Link>
      </div>
    </div>
  )
}

export default page