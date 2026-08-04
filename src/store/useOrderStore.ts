import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SavedOrder {
  id: string;
  user_id?: string | null;
  paystack_reference: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  delivery_address?: string;
  delivery_state?: string;
  total_amount: number;
  status: string;
  items: any[];
  created_at: string;
}

interface OrderStore {
  orders: SavedOrder[];
  addOrder: (order: SavedOrder) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (newOrder) =>
        set((state) => ({
          orders: [
            newOrder,
            ...state.orders.filter(
              (o) => o.paystack_reference !== newOrder.paystack_reference
            ),
          ],
        })),
      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "beginars-order-history-storage",
    }
  )
);
