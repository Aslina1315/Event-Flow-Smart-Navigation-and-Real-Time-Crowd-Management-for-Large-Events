import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Coffee, Pizza, Shirt, TrendingUp, Wallet, Calculator, Info, Plus, Minus, CreditCard, PieChart, ArrowUpRight } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

const Expenses = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState({});
  const [budget, setBudget] = useState(250);

  const MOCK_ITEMS = [
    { name: 'VIP Lounge Access', category: 'Merch', predictedPrice: 150, range: { low: 120, high: 200 } },
    { name: 'Official Jersey', category: 'Merch', predictedPrice: 85, range: { low: 75, high: 95 } },
    { name: 'Premium Beverage', category: 'Drinks', predictedPrice: 12, range: { low: 8, high: 15 } },
    { name: 'Gourmet Platter', category: 'Food', predictedPrice: 35, range: { low: 25, high: 45 } },
    { name: 'Priority Parking', category: 'Merch', predictedPrice: 50, range: { low: 40, high: 70 } },
    { name: 'Event Guide', category: 'Merch', predictedPrice: 15, range: { low: 10, high: 20 } }
  ];

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch('/api/expenses');
        if (res.ok) {
          const data = await res.json();
          setItems(data.length > 0 ? data : MOCK_ITEMS);
        } else {
          setItems(MOCK_ITEMS);
        }
      } catch (err) {
        setItems(MOCK_ITEMS);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  const updateQuantity = (name, delta) => {
    setSelectedItems(prev => {
      const current = prev[name] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [name]: next };
    });
  };

  const totalEstimated = Object.keys(selectedItems).reduce((sum, name) => {
    const item = items.find(i => i.name === name);
    return sum + (item ? item.predictedPrice * selectedItems[name] : 0);
  }, 0);

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const categories = ['Food', 'Drinks', 'Merch'];

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="visible"
      className="space-y-12 pt-6 pb-24"
    >
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div variants={itemVars} className="space-y-2">
          <div className="flex items-center gap-3 text-emerald-500 font-black text-xs uppercase tracking-[0.4em] mb-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            Financial Analytics Engine
          </div>
          <h1 className="text-6xl font-heading font-black tracking-tighter text-white">
            Finance <span className="premium-text-gradient">Hub.</span>
          </h1>
          <p className="text-gray-500 text-xl font-medium">Predictive expense modelling for global event logistics.</p>
        </motion.div>
        
        <motion.div variants={itemVars} className="flex gap-4">
          <div className="glass-effect bg-white/[0.03] border-white/5 px-8 py-5 rounded-[24px] flex items-center gap-6 shadow-2xl">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Total Projection</p>
              <p className="text-3xl font-black text-white tracking-tighter">${totalEstimated.toFixed(2)}</p>
            </div>
          </div>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-12">
          {categories.map((cat, catIdx) => (
            <motion.div key={cat} variants={itemVars} className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-4">
                  <div className="w-1.5 h-6 bg-royal-500 rounded-full"></div>
                  {cat} Inventory
                </h3>
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Prediction Status: Verified</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.filter(i => i.category === cat).map((item, i) => (
                  <GlassCard key={item.name} delay={i * 0.05} className="p-8 border-white/5 group hover:border-royal-500/30">
                    <div className="flex justify-between items-start mb-8">
                      <div className="space-y-1">
                        <h4 className="font-black text-xl text-white tracking-tight group-hover:text-royal-500 transition-colors">{item.name}</h4>
                        <div className="flex items-center gap-2">
                          <TrendingUp size={12} className="text-emerald-500" />
                          <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Venue Prediction</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black text-white tracking-tighter">${item.predictedPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="bg-gradient-to-r from-royal-500 to-indigo-500 h-full"
                        ></motion.div>
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">
                        <span>Range: ${item.range.low.toFixed(0)}</span>
                        <span>${item.range.high.toFixed(0)}</span>
                      </div>
                    </div>

                    <div className="mt-10 flex items-center justify-between pt-6 border-t border-white/5">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Inventory Load</span>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => updateQuantity(item.name, -1)}
                          className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center hover:bg-rose-500/20 text-gray-400 hover:text-rose-500 transition-all border border-white/5"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="w-6 text-center font-black text-xl text-white tracking-tighter">{selectedItems[item.name] || 0}</span>
                        <button 
                          onClick={() => updateQuantity(item.name, 1)}
                          className="w-10 h-10 rounded-xl bg-royal-500/10 flex items-center justify-center hover:bg-royal-500 text-royal-500 hover:text-white transition-all border border-royal-500/20"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-10">
          <motion.div variants={itemVars} className="sticky top-28">
            <GlassCard className="border-emerald-500/20 bg-emerald-500/[0.02] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-glass-mesh opacity-30 pointer-events-none"></div>
              
              <h3 className="text-3xl font-black mb-10 text-white tracking-tighter flex items-center gap-4">
                <Calculator className="text-emerald-500" />
                Trip Allocation
              </h3>
              
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Daily Cap</label>
                    <span className="text-3xl font-black text-white tracking-tighter">${budget}</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="1000" 
                    step="50"
                    value={budget} 
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-emerald-500 transition-all"
                  />
                </div>

                <div className="bg-black/40 rounded-[28px] p-8 space-y-6 border border-white/5 relative overflow-hidden">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Inventory Subtotal</span>
                    <span className="text-xl font-black text-white tracking-tighter">${totalEstimated.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Operational Fees</span>
                    <span className="text-xl font-black text-white tracking-tighter">$45.00</span>
                  </div>
                  
                  <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-2">Total Exposure</p>
                      <span className="text-xl font-black text-white/40">USD</span>
                    </div>
                    <span className={`text-5xl font-black tracking-tighter drop-shadow-2xl transition-colors duration-500 ${totalEstimated + 45 > budget ? 'text-rose-500 shadow-glow-danger' : 'text-emerald-500 shadow-glow-primary'}`}>
                      ${(totalEstimated + 45).toFixed(2)}
                    </span>
                  </div>
                </div>

                <AnimatePresence>
                  {(totalEstimated + 45) > budget && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 flex items-start gap-4"
                    >
                      <Info className="text-rose-500 shrink-0 mt-1" size={20} />
                      <p className="text-xs text-rose-200 font-bold leading-relaxed uppercase tracking-wider">
                        Budget Limit Exceeded. Re-calibrate inventory selection to maintain fiscal compliance.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button className="w-full py-6 bg-emerald-500 shadow-glow-primary text-xl font-black">
                  Authorize Budget Plan
                </Button>
              </div>
            </GlassCard>
            
            <motion.div variants={itemVars} className="mt-8 p-8 rounded-[32px] bg-royal-500/5 border border-royal-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 text-royal-500 opacity-20 group-hover:opacity-40 transition-opacity">
                <PieChart size={64} />
              </div>
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                <ArrowUpRight size={16} className="text-royal-500" /> Insight: Optimal Timing
              </h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Venue analytics suggest merchandise prices peak 2 hours before the final act. Secure your inventory during the mid-session lull for maximum efficiency.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Expenses;
