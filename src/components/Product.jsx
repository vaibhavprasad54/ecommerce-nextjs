"use client";

import React from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { useToast } from "./ui/use-toast";

const Product = ({ data }) => {
  
  const { toast } = useToast();

  const { addToCart } = useCartStore((state) => ({
    addToCart: state.addToCart,
  }));

  const addItem = (product) => {
    addToCart(product);
    toast({
      title: "Wohoo, item added to cart 🎉",
    })
  };

  console.log("jhg", data);

  return (
    <div className="flex items-center justify-center flex-wrap gap-5">
      {data?.map((item) => (
        <div key={item.id} className="bg-[#edebe2] group relative flex items-center justify-center flex-col w-60 px-5 py-5 rounded-[10px] cursor-pointer">
          <div className="flex items-center justify-center">
            <Image
              src={item.image}
              width={300}
              height={300}
              alt="product-img"
              className="mix-blend-multiply w-40 h-44 object-contain group-hover:scale-110 transition-all"
            />
          </div>
          <p className="w-full px-5 truncate text-center pt-3 text-sm font-semibold">
            {item.title}
          </p>
          <p className="font-semibold text-lg pb-1 group-hover:opacity-0">
            $ {item.price}
          </p>
          <button
            onClick={() => addItem(item)}
            className="addToCart w-full text-slate-200 text-base font-semibold py-2 absolute -bottom-5 opacity-0 bg-amber-950 group-hover:bottom-0 group-hover:opacity-95 rounded-b-[10px] transition-all"
          >
            <p>Add to cart</p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Product;
