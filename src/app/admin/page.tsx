"use client";

import React from 'react';
import { useBusinessStore, BusinessType } from '@/store/businessStore';
import { 
  Settings2, 
  Store, 
  Stethoscope, 
  Utensils, 
  Box, 
  CheckCircle2,
  Circle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const businessTypes: { type: BusinessType; label: string; icon: any; description: string }[] = [
  { type: 'RETAIL', label: 'Retail / General Store', icon: Store, description: 'Standard sales and inventory flow for general commerce.' },
  { type: 'PHARMACY', label: 'Pharmacy / Health', icon: Stethoscope, description: 'Adds expiry tracking, batch management, and prescription logs.' },
  { type: 'RESTAURANT', label: 'Restaurant / Cafe', icon: Utensils, description: 'Table management, KOT, and recipe-based inventory.' },
  { type: 'HARDWARE', label: 'Hardware Store', icon: Box, description: 'Support for bulk items, multi-unit measurements, and credit bills.' },
];

export default function AdminEnginePage() {
  const { businessType, setBusinessType, modules, toggleModule } = useBusinessStore();

  return (
    <div className="space-y-10 animate-in">
      <div>
        <h1 className="text-4xl font-black text-white font-outfit mb-2">Business <span className="text-brand-blue">Engine</span></h1>
        <p className="text-slate-400">Configure core system logic and business-specific modules.</p>
      </div>

      <section>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Settings2 size={24} className="text-brand-blue" />
          Select Business Model
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessTypes.map((biz) => {
            const active = businessType === biz.type;
            return (
              <button
                key={biz.type}
                onClick={() => setBusinessType(biz.type)}
                className={cn(
                  "p-6 rounded-3xl text-left transition-all relative overflow-hidden group",
                  active 
                    ? "glass-card border-brand-blue ring-2 ring-brand-blue/20" 
                    : "glass-card hover:border-white/20"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                  active ? "bg-brand-blue text-white" : "bg-white/5 text-slate-400"
                )}>
                  <biz.icon size={24} />
                </div>
                <h4 className="font-black text-white mb-2">{biz.label}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{biz.description}</p>
                {active && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 size={20} className="text-brand-blue" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-6">Active Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((mod) => (
            <div
              key={mod.id}
              onClick={() => toggleModule(mod.id)}
              className="flex items-center justify-between p-4 rounded-2xl glass-card cursor-pointer hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={cn("text-brand-blue", mod.enabled ? "opacity-100" : "opacity-30")}>
                  {mod.enabled ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">{mod.name}</h5>
                  <p className="text-xs text-slate-500">
                    {mod.requiredFor.includes(businessType) ? `Required for ${businessType}` : 'Optional module'}
                  </p>
                </div>
              </div>
              <div className={cn(
                "w-12 h-6 rounded-full relative transition-colors",
                mod.enabled ? "bg-brand-blue" : "bg-slate-700"
              )}>
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                  mod.enabled ? "right-1" : "left-1"
                )} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
