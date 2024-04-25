"use client"

import { Heart, LogOut, Search, ShoppingBag, UserRound } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import userImage from "../../public/user-image.png"
import { useCartStore } from '@/store/cart-store'
import Link from 'next/link'
import { useProductStore } from '@/store/product-store'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import defaultImg from "../../public/default-user.png"


const Navbar = () => {

  const setSearchQuery = useProductStore((state) => state.setSearchQuery);

  const { data: session } = useSession();

  const { cart } = useCartStore((state) => ({
    cart: state.cart,
  }));

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  }


  return (
    <>
      <nav className='w-full px-8 py-3 flex items-center justify-between bg-white sticky top-0 z-50'>
        <Link href="/" className='logo w-60'>
          <h2 className='text-[28px] font-bold text-[#010101]'>BR.<span className='text-[#e5e2d7]'>F</span> </h2>
        </Link>
        <div className="hidden md:flex search relative items-center justify-center">
          <input onChange={handleSearch} type="text" placeholder='Search' className='bg-[#ece9e3] px-4 pl-10 py-[8px] rounded-[7px] text-sm w-[18rem]' />
          <Search size={18} className='absolute top-[9px] left-3 text-gray-400' />
        </div>
        <div className="cart-and-info flex items-center justify-center gap-6 w-60">
          <Link href="/cart" className={`${session?.user ? "pointer-events-auto" : "pointer-events-none text-gray-400"} relative cart flex flex-col items-center justify-center gap-1 cursor-pointer `}>
            <ShoppingBag size={22} className={`${session?.user ? 'text-gray-700' : 'text-gray-400'}`} />
            <div className='rounded-full bg-yellow-400 absolute -top-2 -right-1 w-4 h-4 flex items-center justify-center p-1'>
              <p className='count text-xs'>{cart.length}</p>
            </div>
          </Link>
          <div className="user flex items-center justify-center gap-3">
            {session ? (
              <>
                <h1 className='whitespace-nowrap text-base font-semibold tracking-wide'>{`Hi, ${session?.user?.name.split(" ").splice(0, 1)}`}</h1>
                {/* <button onClick={() => signOut()}>Sign out</button> */}
              </>
            ) : (
              <button onClick={() => signIn()}>Sign in</button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {session?.user ? (
                  <Image src={session?.user?.image} width={50} height={50} className='w-9 h-9 rounded-full cursor-pointer' alt="user-img" />
                ) : (
                  <Image src={defaultImg} width={50} height={50} className='w-9 h-9 rounded-full cursor-pointer' alt="user-img" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32 -ml-20">

                <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
      <div className="flex md:hidden search relative items-center justify-center">
        <input onChange={handleSearch} type="text" placeholder='Search' className='bg-[#ece9e3] px-4 pl-10 py-[8px] rounded-[7px] text-sm w-full mx-9' />
        <Search size={18} className='absolute top-[9px] left-12 text-gray-400' />
      </div>
    </>
  )
}

export default Navbar