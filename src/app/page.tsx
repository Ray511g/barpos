"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  Users, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  CheckCircle2,
  SmartphoneNfc,
  RefreshCw,
  Wine,
  BarChart3,
  Search,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBusinessStore } from '@/store/businessStore';
import Link from 'next/link';

export default function LiquorDashboard() {
  const { businessName, currency } = useBusinessStore();

  const kpis = [
    { label: 'Counter Sales', value: '142,500', trend: '+12.5%', trendUp: true, icon: ShoppingCart },
    { label: 'M-Pesa Match', value: '98.2%', trend: 'Highly Secure', trendUp: true, icon: SmartphoneNfc },
    { label: 'Asset Value', value: '54,200', trend: 'Returnable Empties', trendUp: true, icon: RefreshCw },
    { label: 'Staff Shift', value: 'Active', trend: 'Counter #1', trendUp: true, icon: Users },
  ];

  return (
    <div className="space-y-8 animate-in pb-12">
      {/* Premium Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-brand-blue mb-1">
            <ShieldCheck size={18} />
            <span className="text-[10px] font-black uppercase tracking-[4px]">Verified Security Layer</span>
          </div>
          <h1 className="text-5xl font-black text-white font-outfit tracking-tighter">
            {businessName.toUpperCase()} <span className="text-brand-blue">HQ</span>
          </h1>
          <p className="text-slate-400 mt-2 font-medium">Monitoring revenue, stock integrity, and M-Pesa audits in real-time.</p>
        </div>
        
        <div className="flex gap-4">
           <Link href="/pos" className="px-8 py-4 bg-white text-navy-950 rounded-2xl font-black text-sm shadow-xl shadow-white/5 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3">
             <ShoppingCart size={18} />
             OPEN COUNTER
           </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-[2rem] border-white/5 hover:border-brand-blue/20 transition-all relative group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl bg-white/5 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                <kpi.icon size={20} />
              </div>
              <div className={cn(
                "px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                kpi.trendUp ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
              )}>
                {kpi.trend}
              </div>
            </div>
            <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{kpi.label}</div>
            <div className="text-3xl font-black text-white font-outfit">
              {kpi.label.includes('Sales') || kpi.label.includes('Value') ? `${currency} ` : ''}{kpi.value}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart Section */}
        <div className="lg:col-span-2 glass-card p-10 rounded-[3rem] border-white/5 flex flex-col h-[450px]">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-black text-white font-outfit flex items-center gap-3">
              <BarChart3 className="text-brand-blue" />
              Volume Velocity
            </h3>
            <div className="flex bg-white/5 p-1 rounded-xl">
               <button className="px-4 py-2 text-xs font-black text-white bg-white/10 rounded-lg">DAILY</button>
               <button className="px-4 py-2 text-xs font-black text-slate-500 hover:text-white">WEEKLY</button>
            </div>
          </div>
          <div className="flex-1 flex items-end gap-3 lg:gap-6 px-2">
            {[45, 60, 35, 90, 55, 100, 75].map((h, i) => (
              <div key={i} className="flex-1 relative group">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.1, type: 'spring' }}
                  className="w-full bg-gradient-to-t from-brand-blue/10 to-brand-blue rounded-t-xl lg:rounded-t-2xl relative"
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl lg:rounded-t-2xl" />
                </motion.div>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-600 uppercase">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Side Panels */}
        <div className="space-y-8">
           {/* Top Sellers */}
           <div className="glass-card p-8 rounded-[3rem] border-white/5">
              <h3 className="text-xl font-black text-white font-outfit mb-6">High Movers</h3>
              <div className="space-y-4">
                 {[
                   { name: 'Tusker Lager', category: 'Beer', count: 145, color: '#f59e0b' },
                   { name: 'Johnnie Walker Red', category: 'Whiskey', count: 42, color: '#3b82f6' },
                   { name: 'White Cap', category: 'Beer', count: 88, color: '#10b981' },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                        <Wine size={18} />
                      </div>
                      <div className="flex-1">
                         <div className="text-sm font-bold text-white">{item.name}</div>
                         <div className="text-[10px] text-slate-500 font-black uppercase">{item.category} • {item.count} SOLD</div>
                      </div>
                      <ArrowUpRight size={18} className="text-emerald-400 opacity-50" />
                   </div>
                 ))}
              </div>
           </div>

           {/* Security Alert */}
           <div className="glass-card p-8 rounded-[3rem] border-orange-500/20 bg-orange-500/5 relative overflow-hidden group">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 text-orange-400 mb-4 font-black text-xs uppercase tracking-widest">
                   <AlertTriangle size={18} />
                   Stock Leakage Detected
                 </div>
                 <p className="text-slate-300 text-sm font-medium leading-relaxed">System found 14 beer bottles unaccounted for in Counter #1 shift.</p>
                 <button className="mt-6 w-full py-4 rounded-2xl bg-orange-500 text-white font-black text-xs tracking-widest hover:bg-orange-600 transition-colors">
                    INVESTIGATE DRIFT
                 </button>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform" />
           </div>
        </div>
      </div>
    </div>
  );
}
