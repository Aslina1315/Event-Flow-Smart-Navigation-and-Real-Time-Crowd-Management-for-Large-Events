import { motion, AnimatePresence } from 'framer-motion';
import { AlertOctagon, X, Phone, Navigation, ShieldAlert, Zap, Radio } from 'lucide-react';
import Button from './Button';

const EmergencyModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-2xl bg-[#0a0505] border-2 border-rose-500/50 rounded-[48px] overflow-hidden shadow-[0_0_100px_rgba(225,29,72,0.4)]"
          >
            {/* Background Hazard Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[repeating-linear-gradient(45deg,#e11d48_0,#e11d48_20px,transparent_20px,transparent_40px)]"></div>
            
            <button 
              onClick={onClose} 
              className="absolute top-8 right-8 z-20 p-4 text-rose-200 hover:text-white bg-rose-950/50 rounded-2xl hover:bg-rose-800 transition-all border border-rose-500/20 active:scale-90"
            >
              <X size={24} />
            </button>

            <div className="relative z-10 p-10 md:p-16">
              <div className="flex flex-col items-center text-center mb-12">
                <div className="relative mb-8">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-rose-500 blur-3xl rounded-full"
                  ></motion.div>
                  <div className="w-24 h-24 bg-rose-600 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_40px_rgba(225,29,72,0.8)] border-4 border-white/20">
                    <AlertOctagon size={48} className="text-white animate-pulse" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3 text-rose-500 font-black text-xs uppercase tracking-[0.5em]">
                    <Radio size={14} className="animate-pulse" />
                    Priority Broadcast
                  </div>
                  <h2 className="text-5xl font-heading font-black text-white tracking-tighter leading-none">
                    EMERGENCY <span className="text-rose-500">MODE.</span>
                  </h2>
                  <p className="text-rose-200/60 text-lg font-medium">Protocol activated. Real-time guidance enabled.</p>
                </div>
              </div>

              <div className="space-y-6 mb-12">
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-[32px] p-8 flex items-start gap-6 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Navigation size={80} className="text-rose-500" />
                  </div>
                  <div className="w-14 h-14 bg-rose-500/20 rounded-2xl flex items-center justify-center shrink-0 border border-rose-500/30">
                    <Navigation className="text-rose-500" size={28} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white tracking-tight">Nearest Safe Exit: North Gate</h3>
                    <p className="text-rose-200/80 font-medium leading-relaxed">
                      Distance: <span className="text-white font-black">150m</span>. 
                      Route is clear of high-density surges. Estimated arrival: <span className="text-white font-black">2.4 mins</span>.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
                    <ShieldAlert size={20} className="text-rose-500" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Medical Hub: 400m</span>
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
                    <Zap size={20} className="text-amber-500" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">System Link: Active</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Button className="py-8 bg-white text-rose-600 hover:bg-gray-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] border-none text-sm font-black uppercase tracking-[0.3em] rounded-3xl">
                  Route to Safety
                </Button>
                <Button className="py-8 bg-rose-600 text-white hover:bg-rose-500 hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] border-rose-400/50 text-sm font-black uppercase tracking-[0.3em] rounded-3xl flex items-center justify-center gap-3">
                  <Phone size={20} />
                  Security Link
                </Button>
              </div>
            </div>

            {/* Scanning Bottom Bar */}
            <div className="h-2 w-full bg-rose-950 relative">
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-rose-500 to-transparent"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EmergencyModal;
