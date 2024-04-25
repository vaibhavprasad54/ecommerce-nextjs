import { create } from "zustand";
import { products } from "../../productsData";


export const useProductStore = create((set) => ({
    products: [products],
    searchQuery: '',
    filteredProducts: [], 
    setSearchQuery: (query) => set({ searchQuery: query }),
}))