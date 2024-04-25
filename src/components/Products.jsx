"use client"

import React, { useEffect } from 'react'
import Product from './Product';
import { useProductStore } from '@/store/product-store';
import { useSession } from 'next-auth/react';
import signInPleaseImg from "../../public/signInPlease.svg";
import Image from 'next/image';


const ProductsPage = () => {

  const { products, searchQuery, filteredProducts } = useProductStore();
  const { data: session } = useSession();

  useEffect(() => {
    const results = products[0].filter((item) => item?.title?.toLowerCase().includes(searchQuery.toLowerCase()));
    useProductStore.setState({ filteredProducts: results });
  }, [products, searchQuery]);

  const mainData = searchQuery !== '' ? filteredProducts : products[0];

  return (
    <main className='w-full py-7 z-10'>
     <div className='flex items-center justify-center flex-col'>
        {session?.user ? (
          <>
          <h1 className='text-amber-950 text-3xl font-bold py-4'>PRODUCTS</h1>
        <Product data={mainData} />
          </>
        ) : (
          <>
          <h1 className='text-amber-900 text-3xl font-bold py-7'>Uh oh, Please sign in to view products!</h1>
          <Image src={signInPleaseImg} width={400} height={400} className='py-5' alt='signInImg' />
          </>
        )}
     </div>
    </main>
  )
}

export default ProductsPage