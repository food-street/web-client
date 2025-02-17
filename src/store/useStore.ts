import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Restaurant, Order, FoodCourt, User } from '../types';

interface StoreState {
  foodCourt: string | null;
  foodCourts: FoodCourt[];
  restaurants: Restaurant[];
  cart: CartItem[];
  orders: Order[];
  user: User | null;
  imageCache: Record<string, string>;
  setFoodCourt: (id: string) => void;
  setRestaurants: (restaurants: Restaurant[]) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  setUser: (user: User | null) => void;
  cacheImage: (url: string, blob: string) => void;
  getCachedImage: (url: string) => string | null;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      foodCourt: null,
      foodCourts: [],
      restaurants: [],
      cart: [],
      orders: [],
      user: null,
      imageCache: {},
      setFoodCourt: (id) => set({ foodCourt: id }),
      setRestaurants: (restaurants) => set({ restaurants }),
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),
      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        })),
      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          cart: quantity === 0
            ? state.cart.filter((item) => item.id !== itemId)
            : state.cart.map((item) =>
                item.id === itemId ? { ...item, quantity } : item
              ),
        })),
      clearCart: () => set({ cart: [] }),
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders]
        })),
      setUser: (user) => set({ user }),
      cacheImage: (url, blob) => 
        set((state) => ({
          imageCache: { ...state.imageCache, [url]: blob }
        })),
      getCachedImage: (url) => get().imageCache[url] || null,
    }),
    {
      name: 'food-court-storage'
    }
  )
);