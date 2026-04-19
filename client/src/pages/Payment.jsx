import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CreditCard, Wallet, Smartphone, Globe, Lock, CheckCircle2, ChevronLeft, Building2, Apple, Zap, Fingerprint } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { toast } from '../components/ui/Toast';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event || { title: 'Global Tech Summit 2026', price: 299.00 };
  
  const [method, setMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      toast.success('Transaction Authorized');
    }, 3000);
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard size={24} />, description: 'Secure Bank Transfer', color: 'text-royal-500' },
    { id: 'upi', name: 'Google Pay', icon: (
      <div className="flex items-center justify-center h-full">
        <img src="https://www.gstatic.com/lamda/images/google_pay_logo_24dp.svg" className="h-6 w-auto brightness-0 invert" alt="Google Pay" />
      </div>
    ), description: 'Instant UPI Auth', color: 'text-green-400' },
    { id: 'apple', name: 'Apple Pay', icon: <Apple size={24} />, description: 'Touch ID / Face ID', color: 'text-white' },
    { id: 'paypal', name: 'PayPal Express', icon: <Globe size={24} />, description: 'International Gateway', color: 'text-blue-500' },
  ];

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (completed) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 100 }}
            className="w-32 h-32 bg-royal-500/10 rounded-full flex items-center justify-center mx-auto border border-royal-500/30 shadow-[0_0_80px_rgba(0,82,255,0.2)]"
          >
            <CheckCircle2 size={64} className="text-royal-500" />
          </motion.div>
          
          <div className="space-y-3">
            <h2 className="text-5xl font-heading font-black tracking-tight text-white">Authorized.</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Your digital admission for <span className="text-white font-bold">{event.title}</span> has been securely generated and encrypted.
            </p>
          </div>

          <GlassCard className="p-6 border-white/5 bg-white/[0.02]">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
              <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Confirmation ID</span>
              <span className="text-white font-mono font-bold">EVF-99281-XQ</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Status</span>
              <span className="px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-black rounded-full uppercase tracking-tighter border border-green-500/20">Secured</span>
            </div>
          </GlassCard>

          <Button onClick={() => navigate('/dashboard')} className="w-full py-5 text-lg font-black bg-royal-500 shadow-glow-primary">
            Access My Pass
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto pt-6 pb-24 px-4"
    >
      <motion.button 
        variants={itemVars}
        onClick={() => navigate(-1)} 
        className="flex items-center gap-3 text-gray-500 hover:text-white transition-all mb-10 group text-sm font-bold uppercase tracking-widest"
      >
        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform text-royal-500" /> 
        Return to Discovery
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Payment Selection */}
        <div className="lg:col-span-8 space-y-12">
          <motion.div variants={itemVars}>
            <h1 className="text-6xl font-heading font-black mb-4 flex items-center gap-6 text-white tracking-tighter">
              Checkout
              <div className="h-1 flex-1 bg-gradient-to-r from-royal-500/50 to-transparent rounded-full ml-4 hidden md:block"></div>
            </h1>
            <p className="text-gray-400 text-xl font-medium max-w-2xl">
              Complete your transaction using our multi-layer encrypted payment gateway.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map(pm => (
              <motion.button
                key={pm.id}
                variants={itemVars}
                whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMethod(pm.id)}
                className={`p-8 rounded-[32px] border-2 text-left transition-all duration-500 relative overflow-hidden group ${
                  method === pm.id 
                  ? 'bg-royal-500/5 border-royal-500 shadow-glow-primary' 
                  : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-all duration-700 ${
                  method === pm.id ? 'bg-royal-500 text-white shadow-glow-primary' : 'bg-surfaceLight text-gray-500'
                }`}>
                  {pm.icon}
                </div>
                <h4 className="font-black text-2xl text-white mb-2 tracking-tight">{pm.name}</h4>
                <p className="text-base text-gray-500 font-medium">{pm.description}</p>
                
                {method === pm.id && (
                  <motion.div layoutId="paymentActive" className="absolute top-8 right-8 text-royal-500">
                    <div className="w-2 h-2 bg-royal-500 rounded-full animate-ping"></div>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          <motion.div variants={itemVars}>
            <GlassCard className="p-10 border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <ShieldCheck size={120} className="text-royal-500" />
              </div>
              
              <h3 className="text-3xl font-heading font-black mb-10 flex items-center gap-4 text-white">
                <div className="w-1.5 h-8 bg-royal-500 rounded-full"></div>
                Transaction Authorization
              </h3>
              
              <AnimatePresence mode="wait">
                {method === 'card' && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] ml-1">Secure Card Information</label>
                      <div className="relative group">
                        <input 
                          type="text" 
                          placeholder="0000 0000 0000 0000" 
                          className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-royal-500 transition-all font-mono text-2xl tracking-widest group-hover:border-white/10"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
                          <img src="https://www.gstatic.com/autofill/visual_forms/images/google_pay/mc_64dp.svg" className="h-8 grayscale group-focus-within:grayscale-0 transition-all" alt="Card" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] ml-1">Validation Date</label>
                        <input type="text" placeholder="MM / YY" className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-royal-500 transition-all text-xl font-mono" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] ml-1">Security Code</label>
                        <div className="relative">
                          <input type="password" placeholder="•••" className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-royal-500 transition-all text-xl font-mono" />
                          <Lock size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {method === 'upi' && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div className="flex justify-center gap-8">
                      <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[24px] shadow-2xl cursor-pointer w-32 flex items-center justify-center">
                        <img src="https://www.gstatic.com/lamda/images/google_pay_logo_24dp.svg" alt="GPay" className="h-8" />
                      </motion.div>
                      <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[24px] shadow-2xl cursor-pointer w-32 flex items-center justify-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="h-8" />
                      </motion.div>
                    </div>
                    <div className="relative flex items-center gap-6">
                      <div className="flex-1 h-px bg-white/5"></div>
                      <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">Integrated UPI ID</span>
                      <div className="flex-1 h-px bg-white/5"></div>
                    </div>
                    <div className="max-w-md mx-auto relative">
                      <input 
                        type="text" 
                        placeholder="yourname@axisbank" 
                        className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-royal-500 transition-all text-center text-2xl font-bold tracking-tight" 
                      />
                      <Zap size={24} className="absolute right-6 top-1/2 -translate-y-1/2 text-royal-500 animate-pulse" />
                    </div>
                  </motion.div>
                )}

                {method === 'apple' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="text-center py-10 space-y-8"
                  >
                    <div className="bg-white w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto shadow-[0_20px_60px_rgba(255,255,255,0.1)]">
                      <Apple size={56} className="text-black" />
                    </div>
                    <div className="space-y-4">
                      <p className="text-xl font-bold text-white">Double-Click to Pay</p>
                      <div className="flex items-center justify-center gap-3 text-royal-500 animate-bounce">
                        <Fingerprint size={28} />
                        <span className="text-sm font-black uppercase tracking-widest">Awaiting Biometric Auth</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-4">
          <motion.div variants={itemVars} className="sticky top-28">
            <GlassCard className="border-royal-500/20 bg-royal-500/[0.03] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-glass-mesh opacity-50 pointer-events-none"></div>
              
              <h3 className="text-4xl font-heading font-black mb-10 text-white tracking-tighter">Summary</h3>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-white font-black text-lg">{event.title}</p>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Standard Entry • 1 Person</p>
                  </div>
                  <span className="text-white font-black text-xl">${event.price.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center py-4 border-y border-white/5">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Service Fee</span>
                  <span className="text-white font-bold">${(event.price * 0.08).toFixed(2)}</span>
                </div>

                <div className="pt-8 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-2">Total Amount</p>
                    <span className="text-xl font-black text-white/40">USD</span>
                  </div>
                  <span className="text-6xl font-black text-royal-500 drop-shadow-[0_0_15px_rgba(0,82,255,0.4)] tracking-tighter">
                    ${(event.price * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button 
                disabled={processing}
                onClick={handlePayment}
                className="w-full py-6 flex items-center justify-center gap-4 text-2xl font-black uppercase tracking-widest group relative overflow-hidden bg-royal-500 hover:bg-royal-600 transition-all shadow-glow-primary"
              >
                {processing ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-4 border-white border-t-transparent rounded-full"
                    />
                    Authorizing...
                  </>
                ) : (
                  <>
                    Authorize Payment
                  </>
                )}
              </Button>

              <div className="mt-12 flex items-center justify-center gap-10 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                <Building2 size={32} />
                <ShieldCheck size={32} />
                <Globe size={32} />
              </div>
            </GlassCard>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-[9px] text-gray-600 text-center uppercase font-black tracking-[0.3em] leading-relaxed px-4"
            >
              Secured by EventFlow Quantum Encryption <br /> PCI-DSS Compliant • Level 1 Service Provider
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Payment;
