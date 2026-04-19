import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Bell, Info, ShieldAlert, Plus, X, MapPin, Clock, Radio, ShieldCheck, Zap } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { toast } from '../components/ui/Toast';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', message: '', type: 'info', location: '' });

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch('/api/alerts');
      if (response.ok) {
        const data = await response.json();
        setAlerts(data);
      }
    } catch (error) {
      console.error('Operational Sync Failure:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const newAlert = await response.json();
        setAlerts([newAlert, ...alerts]);
        setFormData({ title: '', message: '', type: 'info', location: '' });
        setShowForm(false);
        toast.success('System-Wide Broadcast Authorized');
      }
    } catch (error) {
      toast.error('Authorization Failed');
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - alertTime) / 1000);
    if (diffInSeconds < 30) return 'Just Now';
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    return `${Math.floor(diffInSeconds / 60)}m ago`;
  };

  const getAlertConfig = (type) => {
    switch (type) {
      case 'critical':
        return {
          icon: <ShieldAlert className="text-rose-500" size={32} />,
          border: 'border-l-4 border-l-rose-500',
          bg: 'bg-rose-500/[0.03]',
          label: 'CRITICAL SECURITY BREACH',
          color: 'text-rose-500'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="text-amber-500" size={32} />,
          border: 'border-l-4 border-l-amber-500',
          bg: 'bg-amber-500/[0.03]',
          label: 'OPERATIONAL WARNING',
          color: 'text-amber-500'
        };
      default:
        return {
          icon: <Radio className="text-royal-500" size={32} />,
          border: 'border-l-4 border-l-royal-500',
          bg: 'bg-royal-500/[0.03]',
          label: 'SYSTEM INTELLIGENCE',
          color: 'text-royal-500'
        };
    }
  };

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="visible"
      className="space-y-12 pt-6 pb-24"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.div variants={itemVars} className="space-y-2">
          <div className="flex items-center gap-3 text-rose-500 font-black text-xs uppercase tracking-[0.4em] mb-2">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></div>
            Satellite Security Hub
          </div>
          <h1 className="text-6xl font-heading font-black tracking-tighter text-white">
            Security <span className="premium-text-gradient">Alerts.</span>
          </h1>
          <p className="text-gray-500 text-xl font-medium">Real-time venue perimeter and crowd flow monitoring.</p>
        </motion.div>
        
        <motion.div variants={itemVars}>
          <Button onClick={() => setShowForm(true)} className="bg-royal-500 shadow-glow-primary px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-4 group">
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" /> New Broadcast
          </Button>
        </motion.div>
      </header>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.98 }}
            className="mb-12"
          >
            <GlassCard className="border-royal-500/30 bg-royal-500/[0.02] shadow-glow-primary p-12">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black text-white tracking-tight">Authorization Panel</h3>
                <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white p-3 bg-white/5 rounded-full transition-all">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-600 tracking-widest ml-1">Alert Title</label>
                    <input
                      type="text"
                      placeholder="e.g. HIGH CONGESTION AT GATE B"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-royal-500 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-600 tracking-widest ml-1">Target Hub</label>
                    <input
                      type="text"
                      placeholder="e.g. North Perimeter"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-royal-500 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-600 tracking-widest ml-1">Security Level</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-royal-500 transition-all font-bold appearance-none"
                    >
                      <option value="info">System Info</option>
                      <option value="warning">Level 2 Warning</option>
                      <option value="critical">Critical Emergency</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-6 flex flex-col">
                  <div className="space-y-2 flex-1">
                    <label className="text-[10px] font-black uppercase text-gray-600 tracking-widest ml-1">Transmission Message</label>
                    <textarea
                      placeholder="Detailed security intelligence..."
                      required
                      rows="6"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-royal-500 transition-all font-medium resize-none h-full"
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full py-6 bg-royal-500 font-black text-xl shadow-glow-primary">Initiate Broadcast</Button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-8">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-4 border-royal-500 border-t-transparent rounded-full shadow-glow-primary" />
            <p className="text-gray-600 font-black uppercase tracking-widest text-xs animate-pulse">Syncing Perimeter Data...</p>
          </div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-40 bg-white/[0.01] rounded-[48px] border border-white/5 border-dashed">
            <ShieldCheck size={80} className="text-emerald-500/20 mx-auto mb-8" />
            <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Perimeter Secure</h3>
            <p className="text-gray-500 text-lg font-medium">No active security anomalies detected.</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {alerts.map((alert, i) => {
              const config = getAlertConfig(alert.type);
              return (
                <motion.div
                  key={alert.id}
                  variants={itemVars}
                  layout
                  whileHover={{ x: 10 }}
                  className="relative group"
                >
                  <GlassCard className={`${config.border} ${config.bg} border-white/5 p-10 hover:border-white/10 transition-all duration-500`}>
                    <div className="flex flex-col md:flex-row items-start gap-10">
                      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-2xl bg-background border border-white/5 ${config.color}`}>
                        {config.icon}
                      </div>
                      <div className="flex-1 space-y-6 w-full">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                          <div className="space-y-2">
                            <span className={`text-[10px] font-black tracking-[0.3em] ${config.color}`}>{config.label}</span>
                            <h3 className="text-4xl font-black text-white tracking-tighter leading-none">{alert.title}</h3>
                          </div>
                          <div className="flex gap-4">
                            <div className="flex items-center gap-2 bg-white/[0.03] px-4 py-2 rounded-xl text-[10px] font-black text-gray-500 border border-white/5">
                              <Clock size={14} className="text-royal-500" /> {getTimeAgo(alert.timestamp)}
                            </div>
                            <div className="flex items-center gap-2 bg-white/[0.03] px-4 py-2 rounded-xl text-[10px] font-black text-gray-500 border border-white/5">
                              <MapPin size={14} className="text-indigo-500" /> {alert.location}
                            </div>
                          </div>
                        </div>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-4xl">{alert.message}</p>
                        
                        <div className="pt-6 flex gap-4">
                          <Button className="px-8 py-4 bg-white/5 border-white/10 hover:bg-royal-500 hover:border-transparent text-xs font-black uppercase tracking-widest transition-all">Intercept Flow</Button>
                          <Button className="px-8 py-4 bg-white/5 border-white/10 hover:bg-white/10 text-xs font-black uppercase tracking-widest transition-all">Acknowledge</Button>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default Alerts;
