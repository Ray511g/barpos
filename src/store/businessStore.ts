import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BusinessType = 'LIQUOR_STORE' | 'BAR_RESTAURANT' | 'WHOLESALE';

export interface Order {
  id: string;
  waiterId: string;
  waiterName: string;
  items: any[];
  total: number;
  status: 'PENDING' | 'DISPATCHED' | 'PAID' | 'VOID';
  timestamp: string;
}

interface BusinessState {
  businessName: string;
  businessType: BusinessType;
  currency: string;
  taxRate: number;
  activeOrders: Order[];
  completedOrders: Order[];
  
  // Configuration Functions
  updateSettings: (settings: Partial<{ businessName: string; businessType: BusinessType; currency: string; taxRate: number }>) => void;
  
  // Order Management
  createOrder: (order: Order) => void;
  dispatchOrder: (orderId: string) => void;
  completeOrder: (orderId: string) => void;
  voidOrder: (orderId: string) => void;
  
  // Reporting Logic
  getSalesByWaiter: () => Record<string, number>;
}

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set, get) => ({
      businessName: 'Kenya Liquor Master',
      businessType: 'LIQUOR_STORE',
      currency: 'KES',
      taxRate: 16,
      activeOrders: [],
      completedOrders: [],

      updateSettings: (settings) => set((state) => ({ ...state, ...settings })),

      createOrder: (order) => set((state) => ({ 
        activeOrders: [...state.activeOrders, order] 
      })),

      dispatchOrder: (orderId) => set((state) => ({
        activeOrders: state.activeOrders.map(o => o.id === orderId ? { ...o, status: 'DISPATCHED' } : o)
      })),

      completeOrder: (orderId) => {
        const order = get().activeOrders.find(o => o.id === orderId);
        if (order) {
          set((state) => ({
            activeOrders: state.activeOrders.filter(o => o.id !== orderId),
            completedOrders: [...state.completedOrders, { ...order, status: 'PAID' }]
          }));
        }
      },

      voidOrder: (orderId) => set((state) => ({
        activeOrders: state.activeOrders.filter(o => o.id !== orderId)
      })),

      getSalesByWaiter: () => {
        const completed = get().completedOrders;
        const sales: Record<string, number> = {};
        completed.forEach(o => {
          sales[o.waiterName] = (sales[o.waiterName] || 0) + o.total;
        });
        return sales;
      }
    }),
    { name: 'business-storage' }
  )
);
