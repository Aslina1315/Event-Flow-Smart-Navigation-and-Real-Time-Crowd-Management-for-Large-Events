import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Moon, Sun, Shield, CreditCard, LogOut, Zap, Globe, Lock, Sliders, ChevronRight, X, AlertTriangle } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { toast } from '../components/ui/Toast';

const Settings = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

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

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="visible"
      className="space-y-12 pt-6 pb-24"
    >
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div variants={itemVars} className="space-y-2">
          <div className="flex items-center gap-3 text-royal-500 font-black text-xs uppercase tracking-[0.4em] mb-2">
            <div className="w-2 h-2 bg-royal-500 rounded-full animate-pulse shadow-glow-primary"></div>
            System Configuration
          </div>
          <h1 className="text-6xl font-heading font-black tracking-tighter text-white">
            Operational <span className="premium-text-gradient">Config.</span>
          </h1>
          <p className="text-gray-500 text-xl font-medium">Calibrate your neural experience and security protocols.</p>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <motion.div variants={itemVars}>
          <GlassCard className="p-10 border-white/5 bg-white/[0.01] shadow-2xl h-full">
            <div className="flex items-center gap-6 mb-12">
              <div className="p-4 bg-royal-500/10 rounded-[20px] text-royal-500 shadow-glow-primary">
                <Bell size={32} />
              </div>
              <h3 className="text-3xl font-black text-white tracking-tighter">Transmission Feed</h3>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center justify-between p-8 bg-white/[0.03] rounded-[32px] border border-white/5 hover:border-royal-500/20 transition-all duration-500">
                <div className="space-y-1">
                  <h4 className="font-black text-xl text-white tracking-tight">Push Protocol</h4>
                  <p className="text-gray-500 text-base font-medium">Real-time alerts via satellite broadcast.</p>
                </div>
                <div 
                  onClick={() => { setPushEnabled(!pushEnabled); toast.success(pushEnabled ? 'Push Link Terminated' : 'Push Link Established'); }}
                  className={`w-16 h-8 rounded-full relative p-1 cursor-pointer transition-all duration-500 ${pushEnabled ? 'bg-royal-500 shadow-glow-primary' : 'bg-white/10'}`}
                >
                  <motion.div 
                    animate={{ x: pushEnabled ? 32 : 0 }}
                    className="w-6 h-6 bg-white rounded-full shadow-2xl"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-8 bg-white/[0.03] rounded-[32px] border border-white/5 hover:border-royal-500/20 transition-all duration-500">
                <div className="space-y-1">
                  <h4 className="font-black text-xl text-white tracking-tight">Intelligence Log</h4>
                  <p className="text-gray-500 text-base font-medium">Weekly operational summaries via email.</p>
                </div>
                <div 
                  onClick={() => { setEmailEnabled(!emailEnabled); toast.success(emailEnabled ? 'Intelligence Log Paused' : 'Intelligence Log Active'); }}
                  className={`w-16 h-8 rounded-full relative p-1 cursor-pointer transition-all duration-500 ${emailEnabled ? 'bg-royal-500 shadow-glow-primary' : 'bg-white/10'}`}
                >
                  <motion.div 
                    animate={{ x: emailEnabled ? 32 : 0 }}
                    className="w-6 h-6 bg-white rounded-full shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVars}>
          <GlassCard className="p-10 border-white/5 bg-white/[0.01] shadow-2xl h-full">
            <div className="flex items-center gap-6 mb-12">
              <div className="p-4 bg-emerald-500/10 rounded-[20px] text-emerald-500 shadow-glow-primary">
                <Shield size={32} />
              </div>
              <h3 className="text-3xl font-black text-white tracking-tighter">Perimeter Security</h3>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <h4 className="font-black text-xl text-white tracking-tight">Access Token</h4>
                  <p className="text-gray-500 text-sm font-medium">Last rotated: 12 days ago</p>
                </div>
                <Button variant="secondary" className="px-8 py-3 bg-white/[0.05] border-white/10 text-[10px] font-black uppercase tracking-widest" onClick={() => toast.success('New Access Token Issued')}>Rotate Key</Button>
              </div>
              
              <div className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <h4 className="font-black text-xl text-white tracking-tight">Neural 2FA</h4>
                  <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest animate-pulse">Required Priority</p>
                </div>
                <Button variant="secondary" className="px-8 py-3 bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px] font-black uppercase tracking-widest" onClick={() => toast.success('Verification Hub Ready')}>Authorize</Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVars} className="xl:col-span-2">
          <GlassCard className="p-12 border-white/5 bg-white/[0.01] shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-glass-mesh opacity-10 pointer-events-none"></div>
            
            <div className="flex items-center gap-6 mb-12">
              <div className="p-4 bg-indigo-500/10 rounded-[20px] text-indigo-500 shadow-glow-primary">
                <Sliders size={32} />
              </div>
              <h3 className="text-3xl font-black text-white tracking-tighter">Neural Interface & Localization</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex items-center justify-between p-10 bg-white/[0.03] rounded-[40px] border border-white/5">
                <div className="space-y-2">
                  <h4 className="font-black text-xl text-white tracking-tight flex items-center gap-3">
                    Visual Aesthetic <Zap size={16} className="text-royal-500" />
                  </h4>
                  <p className="text-royal-500 text-[10px] font-black uppercase tracking-widest">Locked: Royal Dark Premium</p>
                </div>
                <div className="flex bg-[#05070a] rounded-2xl p-2 border border-white/5 opacity-50 cursor-not-allowed grayscale">
                  <button className="px-6 py-3 rounded-xl text-gray-700 flex items-center gap-3 font-black text-[10px] uppercase tracking-widest" disabled>
                    <Sun size={14} /> Classic
                  </button>
                  <button className="px-6 py-3 rounded-xl bg-white/[0.03] text-white flex items-center gap-3 shadow-2xl border border-white/5 font-black text-[10px] uppercase tracking-widest" disabled>
                    <Moon size={14} /> Neural
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-10 bg-white/[0.03] rounded-[40px] border border-white/5">
                <div className="space-y-2">
                  <h4 className="font-black text-xl text-white tracking-tight">Geospatial Language</h4>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest tracking-widest">Global Telemetry Support</p>
                </div>
                <select 
                  className="bg-background border-2 border-white/5 rounded-2xl px-8 py-4 text-white font-black text-xs uppercase tracking-widest focus:outline-none focus:border-royal-500 transition-all" 
                  onChange={(e) => toast.success(`Interface language synchronized to ${e.target.options[e.target.selectedIndex].text}`)}
                >
                  <option value="en">English (US)</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ae">Arabic (UAE)</option>
                </select>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <motion.div variants={itemVars} className="pt-16 border-t border-rose-500/20 space-y-8">
        <div className="flex items-center gap-4 px-2">
          <AlertTriangle className="text-rose-500" size={24} />
          <h3 className="text-2xl font-black text-rose-500 tracking-tight uppercase tracking-[0.2em] text-xs">Termination Zone</h3>
        </div>
        <GlassCard className="bg-rose-500/[0.02] border-rose-500/20 hover:border-rose-500/40 p-12 flex flex-col md:flex-row items-center justify-between gap-10 transition-all duration-700">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-black text-white text-3xl tracking-tighter leading-none">Scrub Identity Profile</h4>
            <p className="text-rose-500/60 text-lg font-medium">Permanently erase all neural telemetry and operational history.</p>
          </div>
          <Button variant="danger" className="px-16 py-6 bg-rose-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-glow-danger" onClick={() => toast.error('Identity Scrub Requested. Check secure terminal to authorize.')}>Execute Scrub</Button>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
