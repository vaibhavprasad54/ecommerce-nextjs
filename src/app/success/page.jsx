"use client"

import { ArrowLeft } from 'lucide-react';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'
import orderPlaced from "../../../public/order-placed.svg";
import Image from 'next/image';

const page = () => {

  const { data: session } = useSession();

  return (
    <div className='w-full h-[85vh] flex items-center justify-center'>
      <div className="main w-72 flex flex-col items-center justify-center sm:w-[37rem] bg-[#e7e4d9] p-10 rounded-xl shadow-sm">
        <h1 className='text-3xl font-bold text-green-600'>Order Placed!</h1>
        <p className='text-amber-950 text-lg font-semibold'>Thankyou {session?.user?.name.split(" ").splice(0, 1)}</p>
        <p className='text-sm text-gray-600 text-center py-4'>You order has been placed successfully and will be <br /> delivered in 4-7 business days.</p>
        {/* <Image src={orderPlaced} height={250} width={250} alt='order-placed-img' /> */}
        <Link href="/" className='flex items-center justify-center mt-5 gap-2 px-4 py-2 rounded-[8px] text-gray-100 bg-amber-900 hover:bg-amber-950'>
          <ArrowLeft size={20} /> <p>Continue shopping</p>
        </Link>
      </div>
    </div>
  )
}

export default page