"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  ArrowUpRight, 
  ArrowDownRight,
  Edit2,
  Trash2,
  Eye,
  AlertTriangle,
  History,
  FileText,
  Wine,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBusinessStore } from '@/store/businessStore';

export default function LiquorInventory() {
  const { businessType, currency } = useBusinessStore();
  const [activeTab, setActiveTab] = useState<'all' | 'low' | 'categories'>('all');

  // Specialized Liquor Inventory Data
  const liquorStock = [
    { id: '1', name: 'Johnnie Walker Red', category: 'Whiskey', size: '750ml', stock: 45, price: 2800, stamp: 'VERIFIED' },
    { id: '2', name: 'Tusker Lager', category: 'Beer', size: '500ml', stock: 1240, price: 230, stamp: 'BATCH OK' },
    { id: '3', name: 'Smirnoff Vodka', category: 'Vodka', size: '1L', stock: 18, price: 1850, stamp: 'VERIFIED' },
    { id: '4', name: 'Baileys Irish Cream', category: 'Liquor', size: '750ml', stock: 8, price: 3400, stamp: 'LOW STOCK' },
    { id: '5', name: 'Ciroc Ultra Premium', category: 'Vodka', size: '700ml', stock: 12, price: 5500, stamp: 'VERIFIED' },
  ];

  return (
    <div className="space-y-8 animate-in pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black text-white font-outfit mb-2">Liquor <span className="text-brand-blue">Vault</span></h1>
          <p className="text-slate-400">Managing <span className="text-white font-bold">{liquorStock.length}</span> high-value alcohol lines and government excise compliance.</p>
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white font-bold hover:bg-white/10 transition-all text-sm">
            <ShieldCheck size={18} className="text-emerald-400" />
            STAMP SCANNER
          </button>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-3 premium-gradient px-8 py-4 rounded-2xl text-white font-black shadow-xl shadow-brand-blue/20 hover:scale-[1.02] transition-all text-sm">
            <Plus size={20} />
            ADD NEW PRODUCT
          </button>
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'In Stock', icon: Wine },
            { id: 'low', label: 'Out of Stock', icon: AlertTriangle },
            { id: 'categories', label: 'By Category', icon: Filter },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-3 px-6 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap",
                activeTab === tab.id ? "bg-brand-blue text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <tab.icon size={16} />
              {tab.label.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search vault (e.g. Whiskey)..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white font-semibold outline-none focus:ring-2 focus:ring-brand-blue/50 text-sm"
          />
        </div>
      </div>

      {/* Modern Table */}
      <div className="glass-card rounded-[3rem] overflow-hidden border-white/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5">
              <th className="px-8 py-6 text-slate-500 text-[10px] font-black uppercase tracking-[2px]">Product & Size</th>
              <th className="px-8 py-6 text-slate-500 text-[10px] font-black uppercase tracking-[2px]">Unit Price</th>
              <th className="px-8 py-6 text-slate-500 text-[10px] font-black uppercase tracking-[2px]">On Hand</th>
              <th className="px-8 py-6 text-slate-500 text-[10px] font-black uppercase tracking-[2px]">Compliance</th>
              <th className="px-8 py-6 text-center text-slate-500 text-[10px] font-black uppercase tracking-[2px]">Manage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {liquorStock.map((item) => (
              <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                      <Wine size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{item.name}</h4>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{item.category} • {item.size}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-white font-black">{currency} {item.price.toLocaleString()}</span>
                  <p className="text-slate-500 text-[10px]">Margin: 12%</p>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className={cn(
                      "font-black text-lg",
                      item.stock < 20 ? "text-orange-500" : "text-white"
                    )}>{item.stock}</span>
                    <span className="text-slate-500 text-[10px] font-bold">REORDER AT 15</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={cn(
                    "flex items-center gap-2 font-black text-[9px] uppercase tracking-tighter px-3 py-1 rounded-full w-fit",
                    item.stamp.includes('VERIFIED') || item.stamp.includes('OK') 
                      ? "text-emerald-400 bg-emerald-400/10" 
                      : "text-orange-500 bg-orange-500/10"
                  )}>
                    <div className={cn("w-1.5 h-1.5 rounded-full", item.stamp.includes('VERIFIED') ? "bg-emerald-400" : "bg-orange-500")} />
                    {item.stamp}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2.5 rounded-xl text-slate-600 hover:bg-brand-blue/20 hover:text-brand-blue transition-all">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2.5 rounded-xl text-slate-600 hover:bg-red-500/10 hover:text-red-500 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Advanced Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-10 rounded-[3rem] border-white/5 bg-navy-900 border-2 border-brand-blue/20">
           <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black text-white font-outfit mb-2 uppercase tracking-tight">KRA e-TIMS Status</h3>
                <p className="text-slate-400 text-sm">Compliance heartbeat for VAT & Excise validation.</p>
              </div>
              <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-2xl">
                 <ShieldCheck size={28} />
              </div>
           </div>
           <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                 <span>SYNC COMPLETION</span>
                 <span className="text-emerald-400">ONLINE</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 w-[94%]" />
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-right">LAST SYNC: 2 MINUTES AGO</p>
           </div>
        </div>

        <div className="glass-card p-10 rounded-[3rem] border-white/5 bg-navy-900 flex items-center justify-between">
           <div className="space-y-2">
              <h4 className="text-xl font-bold text-white">Stock Health Index</h4>
              <p className="text-slate-400 text-xs">Based on current movement vs. lead times.</p>
              <div className="flex items-center gap-2 pt-4">
                <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-xl font-black text-xl tracking-tighter">GOOD</span>
                <span className="text-slate-500 text-xs font-bold">OPTIMAL LEVELS</span>
              </div>
           </div>
           <div className="w-24 h-24 rounded-full border-8 border-brand-blue border-r-white/5 flex items-center justify-center text-white font-black">
              82%
           </div>
        </div>
      </div>
    </div>
  );
}
