"use client"

import { useCartStore } from '@/store/cart-store'
import { ArrowLeft, Minus, Plus, Trash, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import cartIcon from "../../../public/cart1.png"
import emptyCart from "../../../public/empty-cart.svg";
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const page = () => {

    const [cartItems, setCartItems] = useState([]);
    const { data: session } = useSession();
    const router = useRouter();

    const { cart, removeFromCart } = useCartStore((state) => ({
        cart: state.cart,
        removeFromCart: state.removeFromCart,
    }));

    useEffect(() => {
        setCartItems(cart.reverse());
    }, [cart]);

    const totalAmount = () => {
       const total = cartItems.reduce((total, item) => total + Number(item.price), 0);
       return total.toFixed(2);
    } 

    //==================== Stripe Payment ======================
    const handleCheckout = async() => {
       const res = await fetch("api/checkout", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ products: cartItems })
        })
        const resData = await res.json();
        console.log("Res:", resData);
        if(resData.url){
            console.log(resData.url);
            router.push(resData.url);
        }
    }
    

    return (
        <div className='w-full mt-4'>
            <h1 className='text-center text-2xl font-bold text-amber-950'>Shopping Cart</h1>
            <div className='w-full flex items-center justify-center mt-4 relative px-4 md:px-0'>
                <div className="one w-56 h-2 rounded-l-lg bg-green-600"></div>
                <div className="two w-56 h-2 rounded-r-lg bg-slate-200"></div>
                <Image src={cartIcon} height={50} width={50} className='w-7 absolute -top-2' alt='cart-icon' />
            </div>
            <div className='w-full p-8 flex flex-col md:flex-row items-start justify-center gap-5 -mt-5'>
                <div className="shopping-cart p-2 md:p-6 w-full md:w-3/5 max-3xl ">
                    <div className="header mb-4 flex items-start justify-between border-b-2 py-2">
                        {/* <h1 className='font-semibold text-amber-950 text-xl'>Shopping Cart</h1> */}
                        {/* {cartItems.length > 0 && (
                            <Link href="/" className='flex mt-1'>
                            <ArrowLeft className='text-amber-950' />
                            <p className='text-base'>Continue shopping</p>
                        </Link>
                        )} */}
                    </div>
                    <div className='max-h-[60vh] overflow-y-auto'>
                        {cartItems.length > 0 ? (
                            <>
                                {cartItems?.map((item) => (
                                    <div key={item.id} className='rounded-[7px] flex flex-col gap-3'>
                                        <div className="added-product flex items-center justify-between border-[3px] border-opacity-70 border-gray-300 rounded-[19px] mr-2">
                                            <div className="product flex items-start justify-start gap-4">
                                                <Image src={item?.image} width={400} height={400} className='w-36 bg-[#ece9e0] m-3 rounded-[12px]' alt='item-img' />
                                                <div className="desc flex h-40 pt-8 flex-col justify-center">
                                                    <div>
                                                        <h1 className='font-semibold'>{item.title}</h1>
                                                        <p className='text-sm text-amber-900 opacity-70 -mt-1'>Shoes</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="quantity flex items-center justify-center gap-3">
                                                <div className="reduce">
                                                    <Minus size={14} className='border-2 p-[1px] text-gray-700 border-gray-400 rounded-[5px] w-5 h-5 cursor-pointer' />
                                                </div>
                                                <div className="count text-sm"> 2 </div>
                                                <div className="increase">
                                                    <Plus size={14} className='border-2 p-[1px] text-gray-700 border-gray-400 rounded-[5px] w-5 h-5 cursor-pointer' />
                                                </div>
                                            </div> */}
                                            <div className='flex items-center justify-center gap-5'>
                                            <div className="price">
                                                <p className='font-bold text-lg'> $ {item.price} </p>
                                            </div>
                                            <button className="remove pr-5">
                                                <X size={18} strokeWidth={2.5} onClick={() => removeFromCart(item.id)} className='text-red-600 font-semibold' />
                                            </button>
                                            </div>
                                        </div>
                                        <div className='w-full h-[2px] opacity-0 bg-amber-950'></div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className='flex flex-col items-center justify-between mt-5 px-2 md:px-5'>
                                <Image src={emptyCart} width={250} height={250} alt='empty-cart' />
                                <div className='flex flex-col items-center justify-center mt-10'>
                                    <h1 className='text-center text-3xl font-bold text-amber-800'> Nothing in here </h1>
                                    <h1 className='text-center text-sm text-gray-400'> Yuor cart is longing for some company. Begin your <br /> shopping adventure now! </h1>
                                    <Link href="/" className='flex items-center justify-center mt-5 gap-2 px-4 py-2 rounded-[8px] text-gray-100 bg-amber-900 hover:bg-amber-950'> 
                                        <ArrowLeft size={20} /> <p>Explore our Catalog</p>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {cartItems.length > 0 && (
                    <div className="order-summary py-5 w-full md:w-auto px-10 bg-[#ece9e0] flex flex-col rounded-[19px] mt-8">
                    <h2 className='font-semibold text-amber-950 text-lg pb-4'>Order Summary</h2>
                    <div className='relative md:w-72'>
                        <input type="text" placeholder='Coupon' className='w-full border-2 border-gray-400 rounded-[5px] px-3 py-1' />
                        <button className='bg-amber-950 opacity-85 hover:opacity-100 text-gray-200 px-4 py-[5px] rounded-[5px] absolute right-0 top-[1px]'>
                            Apply
                        </button>
                        <div className='w-full h-[1.5px] bg-gray-300 my-6'>  </div>
                        <div className="subtotal flex items-center justify-between py-1">
                            <p className='text-gray-500 text-sm'>Subtotal</p>
                            <p className='text-gray-500 text-sm'>$ {totalAmount()}</p>
                        </div>
                        <div className="extra-charges flex items-center justify-between py-1">
                            <p className='text-gray-500 text-sm'>Delivery charges</p>
                            <p className='text-gray-500 text-sm'>Free</p>
                        </div>
                        <div className="extra-charges flex items-center justify-between py-1">
                            <p className='text-gray-500 text-sm'>Discount</p>
                            <p className='text-gray-500 text-sm'>$ 00.00</p>
                        </div>
                        <div className="total flex items-center justify-between py-1">
                            <p className='text-gray-700 font-semibold text-base'>Total</p>
                            <p className='text-gray-700 font-semibold text-base'> $ {totalAmount()} </p>
                        </div>
                        <button onClick={handleCheckout} className='w-full rounded-[10px] bg-green-700 opacity-85 hover:opacity-100 px-4 py-2 text-white mt-5 mb-3'>
                            Buy
                        </button>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default page