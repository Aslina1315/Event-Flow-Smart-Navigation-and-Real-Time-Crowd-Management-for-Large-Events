import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Map as MapIcon, Users, Zap, Globe, Sparkles } from 'lucide-react';
import EventFlowLogo from '../components/ui/EventFlowLogo';

const Home = () => {
  const navigate = useNavigate();

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVars = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", damping: 20, stiffness: 80 }
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center relative z-10 px-4 pt-10 pb-20 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-royal-500/10 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
      
      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="text-center max-w-5xl mx-auto relative z-20"
      >
        <motion.div variants={itemVars} className="flex justify-center mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-royal-500 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000 animate-pulse-slow"></div>
            <EventFlowLogo className="w-32 h-32 md:w-44 md:h-44 shadow-glow-primary rounded-[40px] bg-[#05070a]/80 backdrop-blur-3xl p-8 border border-white/10 relative z-10 transform group-hover:rotate-12 transition-transform duration-700" />
          </div>
        </motion.div>
        
        <motion.div variants={itemVars} className="space-y-6 mb-16">
          <div className="flex items-center justify-center gap-3 bg-white/[0.03] border border-white/10 px-6 py-2 rounded-full w-fit mx-auto">
            <Sparkles size={16} className="text-royal-500" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Next-Generation Crowd Intelligence</span>
          </div>
          <h1 className="text-6xl md:text-[100px] font-heading font-black tracking-tighter text-white leading-[0.85] py-4">
            Master the <br /> <span className="premium-text-gradient">Flow.</span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium">
            AI-powered navigation and real-time synchronization for the world's largest experiences.
          </p>
        </motion.div>

        <motion.div variants={itemVars}>
          <motion.button
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/auth')}
            className="group relative inline-flex items-center justify-center gap-6 px-16 py-8 bg-royal-500 text-white rounded-[32px] font-black text-xl uppercase tracking-widest overflow-hidden transition-all shadow-glow-primary hover:shadow-[0_0_80px_rgba(0,82,255,0.4)]"
          >
            <span className="relative z-10">Enter Ecosystem</span>
            <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" size={24} />
            <div className="absolute inset-0 bg-gradient-to-r from-royal-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div 
        variants={containerVars}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto w-full relative z-20"
      >
        {[
          { icon: Shield, title: "Quantum Security", desc: "Military-grade encryption for all user telemetry and payment authorizations.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { icon: MapIcon, title: "Predictive Routing", desc: "Advanced AI models forecast congestion 30 minutes in advance for clear paths.", color: "text-royal-500", bg: "bg-royal-500/10" },
          { icon: Zap, title: "Real-Time Sync", desc: "Latency-free data synchronization across 2,400+ global event hubs.", color: "text-amber-500", bg: "bg-amber-500/10" }
        ].map((feature, i) => (
          <motion.div
            key={i}
            variants={itemVars}
            className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
              <feature.icon size={200} />
            </div>
            <div className={`w-16 h-16 rounded-[24px] ${feature.bg} ${feature.color} flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl`}>
              <feature.icon size={32} />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase text-xs tracking-[0.2em]">{feature.title}</h3>
            <p className="text-gray-500 leading-relaxed font-medium text-lg">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
