import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BusinessType = 'LIQUOR_STORE' | 'RETAIL' | 'PHARMACY' | 'RESTAURANT' | 'HARDWARE';

export interface BusinessModule {
  id: string;
  name: string;
  enabled: boolean;
  requiredFor: BusinessType[];
}

interface BusinessState {
  businessName: string;
  businessType: BusinessType;
  currency: string;
  taxRate: number;
  modules: BusinessModule[];
  
  // Actions
  setBusinessType: (type: BusinessType) => void;
  toggleModule: (moduleId: string) => void;
  updateSettings: (settings: Partial<BusinessState>) => void;
}

const defaultModules: BusinessModule[] = [
  { id: 'inventory', name: 'Smart Inventory', enabled: true, requiredFor: ['LIQUOR_STORE', 'RETAIL'] },
  { id: 'empties', name: 'Empties & Crates', enabled: true, requiredFor: ['LIQUOR_STORE'] },
  { id: 'etims', name: 'KRA eTIMS Sync', enabled: true, requiredFor: ['LIQUOR_STORE'] },
  { id: 'mpesa', name: 'M-Pesa Reconciliation', enabled: true, requiredFor: ['LIQUOR_STORE'] },
  { id: 'analytics', name: 'Margin Analysis', enabled: true, requiredFor: [] },
  { id: 'staff', name: 'Shift Management', enabled: true, requiredFor: [] },
];

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set) => ({
      businessName: 'Kenya Liquor Master',
      businessType: 'LIQUOR_STORE',
      currency: 'KES',
      taxRate: 16,
      modules: defaultModules,

      setBusinessType: (type) => set((state) => ({
        businessType: type,
        modules: state.modules.map(m => ({
          ...m,
          enabled: m.requiredFor.includes(type) || m.enabled
        }))
      })),

      toggleModule: (id) => set((state) => ({
        modules: state.modules.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m)
      })),

      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
    }),
    {
      name: 'smart-pos-business-config',
    }
  )
);
