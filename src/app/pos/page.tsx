"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  Trash2, 
  Minus, 
  Plus, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Scan,
  Printer,
  ChevronRight,
  User,
  X,
  CheckCircle,
  Clock,
  Wine,
  GlassWater,
  PackageCheck,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useBusinessStore } from '@/store/businessStore';
import ReceiptPreview from '@/components/ReceiptPreview';

// Specialized Liquor Mock Data
const LIQUOR_PRODUCTS = [
  { id: 'L1', name: 'Johnnie Walker Black 750ml', price: 4200, category: 'Whiskey', stock: 24, volume: '750ml' },
  { id: 'L2', name: 'Gilbeys Gin 750ml', price: 1450, category: 'Gin', stock: 112, volume: '750ml' },
  { id: 'L3', name: 'Tusker Lager 500ml', price: 230, category: 'Beer', stock: 450, volume: '500ml', type: 'Returnable' },
  { id: 'L4', name: 'White Cap 500ml', price: 240, category: 'Beer', stock: 320, volume: '500ml', type: 'Returnable' },
  { id: 'L5', name: 'Hennessy VS 700ml', price: 6800, category: 'Cognac', stock: 12, volume: '700ml' },
  { id: 'L6', name: 'Guinness 500ml', price: 250, category: 'Beer', stock: 180, volume: '500ml', type: 'Returnable' },
  { id: 'L7', name: 'Jameson Irish 750ml', price: 3200, category: 'Whiskey', stock: 48, volume: '750ml' },
  { id: 'M1', name: 'Coca Cola 1.25L', price: 140, category: 'Mixers', stock: 80, volume: '1.25L' },
  { id: 'M2', name: 'Schweppes Tonic 500ml', price: 90, category: 'Mixers', stock: 65, volume: '500ml' },
];

const CATEGORIES = ['All', 'Beer', 'Whiskey', 'Gin', 'Vodka', 'Cognac', 'Mixers'];

export default function LiquorPOS() {
  const { items, addItem, removeItem, updateQuantity, subtotal, taxTotal, total, clearCart } = useCartStore();
  const { businessName, currency } = useBusinessStore();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'MPESA' | 'CARD' | null>(null);
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);
  
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const filteredProducts = LIQUOR_PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleCheckout = () => {
    if (items.length === 0) return;
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setOrderComplete(true);
    }, 1200);
  };

  return (
    <div className="h-[calc(100dvh-64px)] lg:h-[calc(100vh-64px)] overflow-hidden flex flex-col -m-4 lg:-m-8">
      {/* Dynamic Header */}
      <div className="bg-navy-900 border-b border-white/10 px-4 lg:px-8 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-4 flex-1 max-w-2xl pl-12 lg:pl-0">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              ref={searchRef}
              type="text"
              placeholder="Fast search / Scan barcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all font-semibold text-sm"
            />
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-white">
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <PackageCheck size={16} />
            <span>KRA E-TIMS ACTIVE</span>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
            <User size={16} className="text-slate-500" />
            <span className="font-bold text-xs">Counter: Main</span>
          </div>
        </div>
      </div>

      {/* Category Bar - Horizontal Scroll on Mobile */}
      <div className="bg-navy-950 border-b border-white/5 px-4 lg:px-8 py-2 overflow-x-auto no-scrollbar flex items-center gap-2 whitespace-nowrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-black transition-all border",
              activeCategory === cat 
                ? "bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/20" 
                : "bg-white/5 border-white/5 text-slate-400 hover:text-white"
            )}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Product Catalog */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addItem(product as any)}
                  className="glass-card group cursor-pointer relative overflow-hidden flex flex-col h-[180px] lg:h-auto"
                >
                  <div className="p-3 lg:p-5 flex-1">
                    <div className="flex justify-between items-start mb-2 lg:mb-4">
                      <span className="text-[9px] font-black uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded">
                        {product.category}
                      </span>
                      {product.stock < 50 && (
                        <AlertCircle size={14} className="text-orange-500" />
                      )}
                    </div>
                    <h3 className="text-white font-bold text-xs lg:text-base leading-tight mb-1 group-hover:text-brand-blue transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-slate-500 text-[10px] font-semibold">Ready Stock: {product.stock}</p>
                  </div>
                  <div className="p-3 lg:p-5 border-t border-white/5 bg-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                       <span className="text-xs lg:text-lg font-black text-white">{currency} {product.price.toLocaleString()}</span>
                       {product.type === 'Returnable' && (
                         <span className="text-[8px] text-emerald-400 font-bold">+ {currency} 25 Bottle</span>
                       )}
                    </div>
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-brand-blue text-white flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      <Plus size={18} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Sidebar Cart */}
        <div className="hidden lg:flex w-[400px] bg-navy-950 border-l border-white/10 flex-col">
          {/* Reuse standard Cart Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue">
                 <ShoppingCart size={20} />
               </div>
               <h2 className="text-xl font-black text-white font-outfit uppercase tracking-tight">Billing Queue</h2>
             </div>
             <button onClick={clearCart} className="text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {items.map((item) => (
              <div key={item.id} className="glass-card p-4 rounded-2xl flex items-center gap-4 group border-white/5">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-brand-blue font-black shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-bold text-xs truncate uppercase">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-brand-blue font-black text-xs">{currency} {item.price.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-3 py-1 rounded-xl">
                  <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-500 hover:text-white"><Minus size={12}/></button>
                  <span className="text-xs font-black text-white w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="text-slate-500 hover:text-white"><Plus size={12}/></button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 border-t border-white/5 bg-navy-900/50 space-y-6">
            <div className="flex justify-between items-end">
               <span className="text-slate-400 font-bold text-sm">TOTAL PAYABLE</span>
               <span className="text-3xl font-black text-white font-outfit">{currency} {total.toLocaleString()}</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={items.length === 0}
              className="w-full py-5 rounded-2xl font-black text-lg premium-gradient text-white shadow-xl flex items-center justify-center gap-3 disabled:grayscale disabled:opacity-50"
            >
              <CreditCard size={24} />
              COLLECT PAYMENT
            </button>
          </div>
        </div>

        {/* Floating Mobile Cart Trigger */}
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
           <button 
             onClick={() => setShowMobileCart(true)}
             className="w-16 h-16 rounded-full premium-gradient text-white shadow-2xl flex items-center justify-center relative scale-110 active:scale-95 transition-transform"
           >
             <ShoppingCart size={28} />
             {items.length > 0 && (
               <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-navy-950">
                 {items.length}
               </span>
             )}
           </button>
        </div>
      </div>

      {/* Mobile Cart Overlay */}
      <AnimatePresence>
        {showMobileCart && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 z-50 bg-navy-950 flex flex-col"
          >
             <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-2xl font-black text-white">Cart ({items.length})</h2>
                <button onClick={() => setShowMobileCart(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white">
                  <X size={24} />
                </button>
             </div>
             <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.map(item => (
                  <div key={item.id} className="glass-card p-4 rounded-2xl flex items-center gap-4">
                    <div className="flex-1">
                      <h4 className="text-white font-bold">{item.name}</h4>
                      <p className="text-brand-blue font-black text-sm">{currency} {item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 p-2 rounded-xl">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-white"><Minus size={18}/></button>
                      <span className="text-white font-black">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-white"><Plus size={18}/></button>
                    </div>
                  </div>
                ))}
             </div>
             <div className="p-8 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center text-white">
                   <span className="font-bold text-slate-400">GRAND TOTAL</span>
                   <span className="text-3xl font-black font-outfit">{currency} {total.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => { setShowMobileCart(false); handleCheckout(); }}
                  className="w-full py-5 rounded-3xl premium-gradient text-white font-black text-xl flex items-center justify-center gap-3"
                >
                  <CreditCard size={24} />
                  CHECKOUT NOW
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && !orderComplete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPaymentModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-xl glass-card rounded-[2.5rem] p-6 lg:p-10 overflow-hidden">
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">Final Settlement</h2>
                  <button onClick={() => setShowPaymentModal(false)} className="text-slate-500"><X /></button>
               </div>

               <div className="bg-white/5 rounded-3xl p-6 mb-8 text-center border border-white/5">
                  <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest block mb-1">Amount Due</span>
                  <div className="text-5xl font-black text-white font-outfit">{currency} {total.toLocaleString()}</div>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { id: 'MPESA', label: 'Lipa na M-Pesa', icon: Smartphone, color: 'text-brand-blue', description: 'Immediate STK Push' },
                    { id: 'CASH', label: 'Cash Payment', icon: Banknote, color: 'text-emerald-500', description: 'Standard KES bill' },
                  ].map(method => (
                    <button 
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={cn(
                        "p-6 rounded-[2rem] border-2 transition-all text-left group",
                        paymentMethod === method.id ? "bg-brand-blue/10 border-brand-blue" : "bg-white/5 border-transparent hover:bg-white/10"
                      )}
                    >
                      <div className={cn("w-12 h-12 rounded-2xl bg-navy-950 flex items-center justify-center mb-4 transition-transform group-hover:scale-110", paymentMethod === method.id ? "text-brand-blue shadow-lg shadow-brand-blue/20" : method.color)}>
                        <method.icon size={28} />
                      </div>
                      <h4 className="text-white font-black text-sm uppercase">{method.label}</h4>
                      <p className="text-[10px] text-slate-500 font-bold">{method.description}</p>
                    </button>
                  ))}
               </div>

               <button 
                disabled={!paymentMethod || processing}
                onClick={processPayment}
                className="w-full py-5 rounded-[2rem] premium-gradient text-white font-black text-lg flex items-center justify-center gap-3 disabled:grayscale disabled:opacity-50"
               >
                 {processing ? (
                   <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    PROCESSING...
                   </>
                 ) : (
                   <>
                    {paymentMethod === 'MPESA' ? 'INITIATE STK PUSH' : 'COMPLETE TRANSACTION'}
                    <ChevronRight size={20} />
                   </>
                 )}
               </button>
            </motion.div>
          </div>
        )}

        {orderComplete && (
          <ReceiptPreview 
            items={[...items]} 
            total={total} 
            subtotal={subtotal} 
            tax={taxTotal} 
            onClose={() => {
              setOrderComplete(false);
              setShowPaymentModal(false);
              setPaymentMethod(null);
              clearCart();
            }}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
}
