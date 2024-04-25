import Banner from "@/components/Banner";
import Discount from "@/components/Discount";
import Navbar from "@/components/Navbar";
import ProductsPage from "@/components/Products";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center">
      <Discount />
      <Banner />
      <ProductsPage />
    </main>
  );
}
