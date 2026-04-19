import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, AlertTriangle, Activity, Map, Send, ShieldCheck, Clock, TrendingUp, BarChart3, Radio, Zap, Globe, ShieldAlert } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { toast } from '../components/ui/Toast';

const Admin = () => {
  const [zones, setZones] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAlert, setNewAlert] = useState({ title: '', location: '', type: 'info', message: '' });
  const [broadcasting, setBroadcasting] = useState(false);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [zonesRes, alertsRes] = await Promise.all([
        fetch('/api/zones'),
        fetch('/api/alerts')
      ]);
      if (zonesRes.ok && alertsRes.ok) {
        setZones(await zonesRes.json());
        setAlerts(await alertsRes.json());
      }
    } catch (err) {
      console.error("Global Link Failure:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBroadcast = async (e) => {
    e.preventDefault();
    if (!newAlert.title || !newAlert.location) return toast.error("Operational fields incomplete.");

    setBroadcasting(true);
    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newAlert, message: newAlert.title })
      });
      if (res.ok) {
        toast.success("Broadcast Authorized: Satellite Sync Complete");
        setNewAlert({ title: '', location: '', type: 'info', message: '' });
        fetchData();
      }
    } catch (err) {
      toast.error("Broadcast Authorization Failure.");
    } finally {
      setBroadcasting(false);
    }
  };

  const totalScans = zones.reduce((acc, z) => acc + (z.density * 450), 0);
  const peakDensity = Math.max(...zones.map(z => z.density), 0);

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
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <motion.div variants={itemVars} className="space-y-2">
          <div className="flex items-center gap-3 text-rose-500 font-black text-xs uppercase tracking-[0.4em] mb-2">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping shadow-glow-danger"></div>
            Global Oversight Terminal
          </div>
          <h1 className="text-6xl font-heading font-black tracking-tighter text-white">
            Command <span className="premium-text-gradient">Center.</span>
          </h1>
          <p className="text-gray-500 text-xl font-medium">Verified intelligence and system-wide emergency protocols.</p>
        </motion.div>
        
        <motion.div variants={itemVars} className="flex gap-4">
          <div className="glass-effect bg-white/[0.03] border-white/5 px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-glow-primary"></div>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Core Synchronized</span>
          </div>
        </motion.div>
      </header>

      {/* Analytics Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {[
          { label: 'Total Telemetry', val: totalScans.toLocaleString(), icon: Users, color: 'text-royal-500', bg: 'bg-royal-500/10' },
          { label: 'Peak Density', val: `${peakDensity}%`, icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
          { label: 'Active Alerts', val: alerts.length, icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-500/10' },
          { label: 'Safety Index', val: '98.4%', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' }
        ].map((stat, i) => ( stat &&
          <motion.div key={i} variants={itemVars}>
            <GlassCard className="p-8 border-white/5 bg-white/[0.01] hover:border-white/10 transition-all duration-500 group relative overflow-hidden h-full">
              <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                <stat.icon size={160} />
              </div>
              <div className="flex justify-between items-start relative z-10">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-5xl font-black text-white tracking-tighter leading-none">{stat.val}</h3>
                </div>
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-xl group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 mt-12">
        {/* Real-time Zone Monitoring */}
        <motion.div variants={itemVars} className="xl:col-span-7">
          <GlassCard className="p-12 border-white/5 bg-white/[0.01] shadow-2xl relative overflow-hidden h-full">
            <div className="absolute inset-0 bg-glass-mesh opacity-10 pointer-events-none"></div>
            <div className="flex items-center justify-between mb-16 relative z-10">
              <h3 className="text-3xl font-black text-white tracking-tighter flex items-center gap-6">
                <BarChart3 className="text-royal-500" />
                Live Hub Dynamics
              </h3>
              <div className="flex items-center gap-2 px-4 py-2 bg-royal-500/10 rounded-full border border-royal-500/20">
                <span className="text-[10px] font-black text-royal-500 uppercase tracking-widest">Satellite Refresh: 8s</span>
              </div>
            </div>
            
            <div className="space-y-12 relative z-10">
              {zones.map((zone, i) => (
                <motion.div key={zone.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="group">
                  <div className="flex justify-between items-end mb-4 px-2 transition-all group-hover:translate-x-2">
                    <div className="space-y-1">
                      <h4 className="text-2xl font-black text-white tracking-tight">{zone.name}</h4>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Sector 0{i+1} • Online</p>
                    </div>
                    <span className={`text-4xl font-black tracking-tighter ${
                      zone.status === 'High' ? 'text-rose-500 shadow-glow-danger' : 
                      zone.status === 'Medium' ? 'text-amber-500' : 'text-emerald-500 shadow-glow-primary'
                    }`}>{zone.density}%</span>
                  </div>
                  <div className="w-full h-4 bg-white/[0.03] rounded-full overflow-hidden border border-white/5 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${zone.density}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className={`h-full rounded-full transition-all duration-1000 ${
                        zone.status === 'High' ? 'bg-rose-500' : 
                        zone.status === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Emergency Broadcast Form */}
        <motion.div variants={itemVars} className="xl:col-span-5">
          <GlassCard className="p-12 border-rose-500/30 bg-rose-500/[0.02] shadow-[0_40px_100px_rgba(244,63,94,0.15)] relative overflow-hidden h-full">
            <div className="absolute -top-20 -right-20 p-20 opacity-5 pointer-events-none">
              <Radio size={400} className="text-rose-500" />
            </div>
            
            <h3 className="text-3xl font-black text-white tracking-tighter mb-12 flex items-center gap-6 relative z-10">
              <div className="w-12 h-12 bg-rose-500/20 rounded-2xl flex items-center justify-center text-rose-500 shadow-glow-danger animate-pulse">
                <Radio size={28} />
              </div>
              Neural Broadcast
            </h3>

            <form onSubmit={handleBroadcast} className="space-y-10 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Payload Message</label>
                <textarea 
                  rows="4"
                  value={newAlert.title}
                  onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                  placeholder="EX: CRITICAL CONGESTION AT NORTH PERIMETER. EXECUTE REROUTE TO SECTOR 4."
                  className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-rose-500 transition-all resize-none font-bold text-lg placeholder:text-gray-800"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Target Hub</label>
                  <input 
                    type="text" 
                    value={newAlert.location}
                    onChange={(e) => setNewAlert({...newAlert, location: e.target.value})}
                    placeholder="EX: Sector 04"
                    className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-rose-500 transition-all font-bold text-lg"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Priority Auth</label>
                  <select 
                    value={newAlert.type}
                    onChange={(e) => setNewAlert({...newAlert, type: e.target.value})}
                    className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-rose-500 transition-all font-black text-xs uppercase tracking-widest appearance-none"
                  >
                    <option value="info">Status Update (Blue)</option>
                    <option value="warning">Level 2 Warning (Amber)</option>
                    <option value="critical">Critical Protocol (Red)</option>
                  </select>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={broadcasting}
                className="w-full py-8 text-2xl font-black bg-rose-500 shadow-glow-danger flex items-center justify-center gap-6"
              >
                {broadcasting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-8 h-8 border-4 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Send size={28} /> AUTHORIZE BROADCAST
                  </>
                )}
              </Button>
            </form>

            <div className="mt-12 pt-10 border-t border-white/5 relative z-10">
              <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-6">Recent Transmissions</h4>
              <div className="space-y-4">
                {alerts.slice(0, 3).map(alert => (
                  <motion.div key={alert.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between p-6 bg-white/[0.02] rounded-[24px] border border-white/5 hover:bg-white/[0.05] transition-all duration-500">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${alert.type === 'critical' ? 'bg-rose-500 shadow-glow-danger' : alert.type === 'warning' ? 'bg-amber-500' : 'bg-royal-500 shadow-glow-primary'}`}></div>
                      <span className="text-base font-black text-white truncate max-w-[250px] tracking-tight">{alert.title}</span>
                    </div>
                    <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest bg-white/[0.03] px-3 py-1 rounded-lg">{alert.location}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Admin;
