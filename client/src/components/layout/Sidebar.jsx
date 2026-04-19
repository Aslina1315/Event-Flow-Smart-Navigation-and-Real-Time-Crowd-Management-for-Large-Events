import { NavLink, useLocation } from 'react-router-dom';
import { Home, Map as MapIcon, Bell, User, Settings, LogOut, MessageSquare, CreditCard, ChevronRight, Menu, X, TrendingUp, Clock, Calendar, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import EventFlowLogo from '../ui/EventFlowLogo';

const Sidebar = ({ setIsAuthenticated, isOpen, setIsOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setShowNotifications(false);
  }, [location.pathname]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch('/api/alerts');
        if (res.ok) setAlerts(await res.json());
      } catch (err) {}
    };
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, []);
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Global Hubs', path: '/events', icon: Calendar },
    { name: 'Operational Map', path: '/map', icon: MapIcon },
    { name: 'Security Center', path: '/alerts', icon: Bell },
    { name: 'AI Assistant', path: '/chat', icon: MessageSquare },
    { name: 'Finance Hub', path: '/expenses', icon: TrendingUp },
    { name: 'Checkout', path: '/payment', icon: CreditCard },
  ];

  const containerVars = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav 
      variants={containerVars}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 h-screen bg-[#05070a]/90 backdrop-blur-3xl border-r border-white/5 hidden md:flex flex-col z-50 transition-all duration-700 ease-[0.16, 1, 0.3, 1] shadow-[40px_0_80px_rgba(0,0,0,0.4)] ${isOpen ? 'w-80 p-10' : 'w-28 p-6 items-center'}`}
    >
      <div className={`flex items-center w-full mb-16 ${isOpen ? 'justify-between' : 'justify-center'}`}>
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-royal-500 blur-xl opacity-20"></div>
                <EventFlowLogo className="w-10 h-10 relative z-10" />
              </div>
              <span className="text-3xl font-heading font-black tracking-tighter text-white">EventFlow</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] text-gray-500 hover:text-white transition-all duration-500 border border-white/5 active:scale-90"
        >
          {isOpen ? <X size={20} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-10">
        <div className={`flex flex-col gap-4 ${!isOpen && 'items-center'}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center rounded-[24px] transition-all duration-700 relative group overflow-hidden ${
                  isOpen ? 'px-6 py-4' : 'justify-center p-4 w-16 h-16'
                } ${
                  isActive
                    ? 'bg-royal-500/10 text-royal-500 font-bold shadow-glow-primary border border-royal-500/20'
                    : 'text-gray-600 hover:text-white hover:bg-white/[0.03] border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <motion.div 
                    className={`relative z-10 transition-all duration-500 ${isActive ? 'scale-110 rotate-12' : 'group-hover:scale-110'}`}
                  >
                    <item.icon size={isActive ? 24 : 22} />
                  </motion.div>
                  
                  {isOpen && (
                    <span className={`ml-4 text-base font-black uppercase tracking-widest transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-60 translate-x-0 group-hover:opacity-100'}`}>
                      {item.name}
                    </span>
                  )}
                  
                  {item.name === 'Security Center' && alerts.length > 0 && (
                    <span className={`absolute bg-rose-500 text-white font-black rounded-full flex items-center justify-center animate-pulse shadow-glow-danger ${
                      isOpen ? 'right-6 px-2 py-0.5 text-[9px]' : 'top-2 right-2 w-2 h-2'
                    }`}>
                      {isOpen ? alerts.length : ''}
                    </span>
                  )}

                  {isActive && (
                    <motion.div 
                      layoutId="navPulse"
                      className="absolute left-0 w-1 h-6 bg-royal-500 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className={`pt-10 space-y-6 ${!isOpen && 'flex flex-col items-center w-full'}`}>
        <div className="p-[1px] rounded-[24px] bg-gradient-to-r from-royal-500/20 to-transparent">
          <button
            onClick={() => setIsAuthenticated(false)}
            className={`flex items-center transition-all duration-500 group bg-[#05070a] hover:bg-rose-500/10 ${
              isOpen ? 'gap-6 px-6 py-4 rounded-[23px] w-full text-gray-500 hover:text-rose-500' : 'justify-center p-4 w-16 h-16 rounded-[24px]'
            }`}
          >
            <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
            {isOpen && <span className="font-black uppercase tracking-widest text-xs">Terminate Session</span>}
          </button>
        </div>
        
        {isOpen && (
          <div className="px-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <ShieldCheck size={14} className="text-royal-500" />
              <span className="text-[9px] font-black uppercase tracking-widest">Quantum Secured</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Zap size={14} className="text-amber-500" />
              <span className="text-[9px] font-black uppercase tracking-widest">Global Sync Active</span>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Sidebar;
