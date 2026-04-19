import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Activity, TrendingUp, AlertTriangle, MapPin, ArrowRight, ShieldCheck, DoorOpen, Cloud, Thermometer, Globe, Zap, Radio } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Helper to fix map rendering inside dynamic containers
const ResizeFix = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 250);
  }, [map]);
  return null;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [crowdLevel, setCrowdLevel] = useState({ label: 'Calibrating', color: 'text-slate-500', bg: 'bg-slate-500/10' });
  const [zones, setZones] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [weather, setWeather] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [zRes, aRes, wRes, eRes] = await Promise.all([
          fetch('/api/zones'),
          fetch('/api/alerts'),
          fetch('/api/weather?lat=51.5074&lng=-0.1278'),
          fetch('/api/events')
        ]);

        if (zRes.ok) {
          const zData = await zRes.json();
          setZones(zData);
          if (zData.length > 0) {
            const highest = zData.reduce((prev, current) => (prev.density > current.density) ? prev : current, { density: 0 });
            if (highest.density > 70) setCrowdLevel({ label: 'Critical', color: 'text-red-500', bg: 'bg-red-500/10' });
            else if (highest.density > 40) setCrowdLevel({ label: 'Moderate', color: 'text-amber-500', bg: 'bg-amber-500/10' });
            else setCrowdLevel({ label: 'Optimal', color: 'text-emerald-500', bg: 'bg-emerald-500/10' });
          }
        }

        if (aRes.ok) setAlerts(await aRes.json());
        if (wRes.ok) setWeather((await wRes.json()).current);
        if (eRes.ok) setEvents((await eRes.json()).slice(0, 8));
      } catch (err) {
        console.error("Dashboard Sync Error:", err);
      }
    };

    fetchAll();
    const interval = setInterval(fetchAll, 10000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Real-Time Pulse', value: zones.reduce((acc, z) => acc + (z.density * 180), 0).toLocaleString(), icon: Radio, color: 'text-royal-500', bg: 'bg-royal-500/10', isLive: true },
    { label: 'Operational Hubs', value: zones.length.toString(), icon: Activity, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Flow Velocity', value: `${Math.max(...zones.map(z => z.density), 0)}%`, icon: TrendingUp, color: crowdLevel.color, bg: crowdLevel.bg },
    { label: 'Active Alerts', value: alerts.length.toString(), icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 20, stiffness: 100 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12 pb-24"
    >
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="flex items-center gap-3 text-royal-500 font-black text-xs uppercase tracking-[0.4em] mb-2">
            <span className="w-2 h-2 bg-royal-500 rounded-full animate-ping"></span>
            System Live Status
          </div>
          <h1 className="text-6xl font-heading font-black tracking-tighter text-white">
            Executive <span className="premium-text-gradient">Dashboard</span>
          </h1>
          <p className="text-gray-500 text-xl font-medium">Global venue intelligence & crowd synchronization.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-4">
          <Button onClick={() => navigate('/map')} className="bg-white/5 border-white/10 hover:bg-white/10 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs">
            Operational Map
          </Button>
          <Button onClick={() => navigate('/events')} className="bg-royal-500 shadow-glow-primary px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs">
            Global Discovery
          </Button>
        </motion.div>
      </header>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (stat &&
          <GlassCard key={stat.label} delay={i * 0.1} className="relative overflow-hidden group border-white/5">
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">{stat.label}</p>
                <h3 className="text-4xl font-black text-white tracking-tighter">{stat.value}</h3>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:rotate-[360deg] ${stat.bg} ${stat.color}`}>
                <stat.icon size={28} />
              </div>
            </div>
            {stat.isLive && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-royal-500 to-transparent opacity-50"></div>
            )}
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-10">
          <motion.div variants={itemVariants}>
            <GlassCard className="p-0 border-white/5 overflow-hidden h-[500px]">
              <div className="absolute top-8 left-8 z-20">
                <div className="glass-effect bg-black/80 px-10 py-8 rounded-[40px] border border-white/20 flex flex-col gap-8 shadow-[0_30px_60px_rgba(0,0,0,0.8)] min-w-[320px] backdrop-blur-3xl">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.9)]"></div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-[0.4em] text-white/50">Operational Signal</span>
                        <h4 className="text-2xl font-black text-white tracking-tighter">Flow Synthesis</h4>
                      </div>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Active Link</span>
                    </div>
                  </div>

                  {/* Large Custom SVG Area Chart (Linked to Real-World Zone Data) */}
                  <div className="h-32 w-full relative">
                    <svg viewBox="0 0 400 100" className="w-full h-full preserve-3d overflow-visible">
                      <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Background Area */}
                      <motion.path
                        initial={{ d: "M0 100 L400 100 L400 100 L0 100 Z" }}
                        animate={{
                          d: `M0 100 L0 ${100 - (zones[0]?.density || 20)} 
                             L100 ${100 - (zones[1]?.density || 45)} 
                             L200 ${100 - (zones[2]?.density || 30)} 
                             L300 ${100 - (zones[3]?.density || 60)} 
                             L400 ${100 - (zones[4]?.density || 25)} 
                             L400 100 Z`
                        }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        fill="url(#areaGradient)"
                      />

                      {/* Main Stroke Line */}
                      <motion.path
                        initial={{ d: "M0 100 L400 100" }}
                        animate={{
                          d: `M0 ${100 - (zones[0]?.density || 20)} 
                             L100 ${100 - (zones[1]?.density || 45)} 
                             L200 ${100 - (zones[2]?.density || 30)} 
                             L300 ${100 - (zones[3]?.density || 60)} 
                             L400 ${100 - (zones[4]?.density || 25)}`
                        }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                      />

                      {/* Live Scanning Head */}
                      <motion.circle
                        animate={{ x: [0, 400] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        r="3"
                        fill="#fff"
                        className="shadow-glow-primary"
                      />
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Synthesis Velocity</span>
                      <span className="text-xl font-black text-white">{Math.round(zones.reduce((acc, z) => acc + z.density, 0) / (zones.length || 1))}% <span className="text-[10px] text-emerald-500 ml-1">↑ 2.4%</span></span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Data Throughput</span>
                      <span className="text-xl font-black text-royal-400">1.2 GB/s</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-full contrast-[1.1] brightness-[0.9]">
                <MapContainer
                  center={[13.0827, 80.2707]}
                  zoom={12}
                  zoomControl={false}
                  style={{ height: '100%', width: '100%', background: '#05070a' }}
                >
                  <ResizeFix />
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {zones.map(zone => (
                    <Circle
                      key={zone.id}
                      center={[13.0827 + (Math.random() - 0.5) * 0.05, 80.2707 + (Math.random() - 0.5) * 0.05]}
                      radius={400}
                      pathOptions={{
                        color: zone.density > 70 ? '#ef4444' : zone.density > 40 ? '#f59e0b' : '#10b981',
                        fillColor: zone.density > 70 ? '#ef4444' : zone.density > 40 ? '#f59e0b' : '#10b981',
                        fillOpacity: 0.3,
                        stroke: false
                      }}
                    />
                  ))}
                </MapContainer>

                {/* Synthesis Grid Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

                {/* Synthesis Scanning Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-royal-500 to-transparent z-30 shadow-[0_0_25px_#0052FF] animate-scan-line"></div>

                {/* Data Synthesis Nodes (Floating particles) */}
                <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: 0,
                        scale: 0
                      }}
                      animate={{
                        y: [null, "-30%"],
                        opacity: [0, 0.8, 0],
                        scale: [0, 2, 0]
                      }}
                      transition={{
                        duration: 2 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "easeOut"
                      }}
                      className="w-1.5 h-1.5 bg-royal-400 rounded-full blur-[1px] absolute shadow-[0_0_8px_rgba(0,82,255,0.6)]"
                    />
                  ))}
                </div>

                {/* Dashboard Scanning Radar */}
                <div className="absolute inset-0 pointer-events-none z-20 opacity-40">
                  <div className="radar-sweep-dashboard"></div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard className="border-white/5">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-4 text-white">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                Zone Intelligence
              </h3>
              <div className="space-y-4 max-h-[320px] overflow-y-auto no-scrollbar">
                {zones.map(zone => (
                  <div key={zone.id} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/5 group hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${zone.density > 70 ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                      <span className="font-bold text-white text-lg tracking-tight">{zone.name}</span>
                    </div>
                    <span className="font-black text-indigo-400 text-xl">{zone.density}%</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="border-white/5">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-4 text-white">
                <div className="w-1.5 h-6 bg-rose-500 rounded-full"></div>
                Security Protocol
              </h3>
              <div className="space-y-6">
                {alerts.length > 0 ? alerts.slice(0, 3).map(alert => (
                  <div key={alert.id} className="flex gap-5 p-5 rounded-2xl bg-rose-500/[0.03] border border-rose-500/10 group hover:bg-rose-500/10 transition-all">
                    <AlertTriangle className="text-rose-500 shrink-0" size={24} />
                    <div>
                      <h4 className="font-black text-white uppercase text-xs tracking-widest mb-1">{alert.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{alert.message}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-12 space-y-4">
                    <ShieldCheck size={48} className="text-emerald-500/30 mx-auto" />
                    <p className="text-xs font-black text-gray-600 uppercase tracking-widest">System Perimeter Secure</p>
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Sidebar Info Area */}
        <div className="lg:col-span-4 space-y-10">
          <motion.div variants={itemVariants}>
            <GlassCard className="bg-royal-500/5 border-royal-500/20 shadow-glow-primary">
              <div className="flex justify-between items-start mb-10">
                <h3 className="text-2xl font-black text-white tracking-tighter">Climate Sync</h3>
                <div className="p-3 rounded-xl bg-royal-500/20 text-royal-500">
                  <Cloud size={24} />
                </div>
              </div>

              {weather ? (
                <div className="space-y-10">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-6xl font-black text-white tracking-tighter">{weather.temperature_2m}°</p>
                      <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Surface Temp • London</p>
                    </div>
                    <Thermometer className="text-royal-500 mb-2" size={40} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Humidity</p>
                      <p className="text-xl font-black text-white">{weather.relative_humidity_2m}%</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Wind</p>
                      <p className="text-xl font-black text-white">{weather.wind_speed_10m} <span className="text-xs">km/h</span></p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center animate-pulse text-gray-600 uppercase text-[10px] font-black tracking-widest">Synchronizing Satellites...</div>
              )}
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlassCard className="border-white/5 bg-white/[0.01]">
              <h3 className="text-2xl font-black mb-8 text-white tracking-tighter">Global Hub Discovery</h3>
              <div className="space-y-4">
                {events.length > 0 ? events.slice(0, 4).map(event => (
                  <div key={event.id} className="group cursor-pointer">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 group-hover:border-royal-500 transition-all">
                        <img src={event.image} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm truncate group-hover:text-royal-500 transition-colors">{event.title}</h4>
                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{event.location.split(',')[0]}</p>
                      </div>
                      <ArrowRight size={16} className="text-gray-700 group-hover:text-royal-500 transition-all group-hover:translate-x-1" />
                    </div>
                  </div>
                )) : (
                  <div className="py-12 text-center text-gray-600 font-black uppercase text-[10px] tracking-widest">Scanning Global Hubs...</div>
                )}

                <Button
                  onClick={() => navigate('/events')}
                  className="w-full py-5 mt-6 rounded-2xl bg-white/[0.03] border border-white/5 text-white font-black uppercase tracking-widest text-[10px] hover:bg-royal-500 hover:border-transparent transition-all"
                >
                  View All Hubs
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
