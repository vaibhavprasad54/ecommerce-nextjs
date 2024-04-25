import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

//============== Creating Zustand Store ==============
export const useCartStore= create(
    persist(
        (set) => ({
            cart: [],   
            addToCart: (product) => set((state) => ({ 
                cart: [...state.cart, product] 
            })),
            removeFromCart: (productId) => set((state) => ({ 
                cart: [...state.cart.filter((product) => product.id !== productId)] 
            })),
            clearCart: () => set({ cart: [] }),
            searchProduct: (product) => set((state) => ({
                
            }))
        }),
        {
            name: 'cart-items', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
          },
    ),
);