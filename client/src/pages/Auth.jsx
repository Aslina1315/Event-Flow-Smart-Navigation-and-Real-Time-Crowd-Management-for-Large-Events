import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import EventFlowLogo from '../components/ui/EventFlowLogo';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password || (!isLogin && !name)) {
      setError("Authorization credentials missing.");
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin ? { email, password } : { name, email, password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Authentication sequence failed');

      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => onLogin(), 1000);
      } else {
        setIsLogin(true);
        setError('Registration successful. Access granted.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      if (isLogin) setIsLoading(false);
    }
  };

  const containerVars = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Mesh Background */}
      <div className="fixed inset-0 bg-[#05070a] z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-royal-500/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl relative z-10"
      >
        <div className="text-center mb-16 space-y-6">
          <motion.div 
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-royal-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <EventFlowLogo className="w-24 h-24 relative z-10 p-5 bg-white/[0.03] rounded-3xl border border-white/10" />
            </div>
          </motion.div>
          <div className="space-y-2">
            <h1 className="text-5xl font-heading font-black tracking-tighter text-white">
              Secure <span className="premium-text-gradient">Access.</span>
            </h1>
            <p className="text-gray-500 text-xl font-medium tracking-tight">Entry authorized for verified global agents.</p>
          </div>
        </div>

        <GlassCard hover={false} className="border-white/5 p-16 shadow-[0_40px_100px_rgba(0,0,0,0.6)] bg-[#05070a]/40 backdrop-blur-3xl rounded-[48px]">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black text-white tracking-tighter">
                {isLogin ? 'Initialize Session' : 'Register Protocol'}
              </h2>
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 bg-royal-500 rounded-full animate-ping"></div>
                <div className="w-1.5 h-1.5 bg-royal-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-5 rounded-2xl text-xs font-black uppercase tracking-widest text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative group"
                >
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-royal-500 transition-colors" size={24} />
                  <input
                    type="text"
                    placeholder="Global Agent Identifier (Full Name)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/[0.02] border-2 border-white/5 rounded-2xl py-6 pl-16 pr-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-royal-500 transition-all font-bold text-lg"
                  />
                </motion.div>
              )}

              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-royal-500 transition-colors" size={24} />
                <input
                  type="email"
                  placeholder="Neural Network Endpoint (Email)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.02] border-2 border-white/5 rounded-2xl py-6 pl-16 pr-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-royal-500 transition-all font-bold text-lg"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-royal-500 transition-colors" size={24} />
                <input
                  type="password"
                  placeholder="Encryption Key (Password)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.02] border-2 border-white/5 rounded-2xl py-6 pl-16 pr-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-royal-500 transition-all font-bold text-lg"
                />
              </div>
            </div>

            <div className="space-y-6">
              <Button type="submit" disabled={isLoading} className="w-full py-8 text-xl font-black bg-royal-500 shadow-glow-primary">
                {isLoading ? 'Synchronizing...' : (isLogin ? 'Establish Link' : 'Register Link')} 
                {!isLoading && <ArrowRight size={24} className="ml-2" />}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-6 bg-[#0c0e12] text-[10px] font-black text-gray-700 uppercase tracking-[0.4em]">Alternative Protocols</span>
                </div>
              </div>

              <Button 
                onClick={(e) => {
                  e.preventDefault();
                  setIsLoading(true);
                  setTimeout(() => {
                    localStorage.setItem('token', 'google-mock-token');
                    localStorage.setItem('user', JSON.stringify({ 
                      name: "Alex", 
                      email: "alex.v2026@gmail.com",
                      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
                    }));
                    onLogin();
                  }, 1200);
                }} 
                variant="secondary" 
                className="w-full py-6 flex items-center justify-center gap-4 group"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" className="opacity-60" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" className="opacity-40" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" className="opacity-80" />
                </svg>
                <span className="font-black uppercase tracking-widest text-xs">Authorize via Google Identity</span>
              </Button>
            </div>

            <div className="text-center pt-10 border-t border-white/5 flex flex-col gap-6">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-gray-500 hover:text-white transition-all text-sm font-black uppercase tracking-widest"
              >
                {isLogin ? "Requirement: New Clearance? " : "Requirement: Existing Link? "}
                <span className="text-royal-500 underline underline-offset-8 ml-2">{isLogin ? "Initiate Registration" : "Initiate Login"}</span>
              </button>
              
              <div className="flex justify-center gap-10 opacity-20">
                <div className="flex items-center gap-2 text-[8px] font-black text-white uppercase tracking-[0.4em]">
                  <ShieldCheck size={12} /> Biometric Ready
                </div>
                <div className="flex items-center gap-2 text-[8px] font-black text-white uppercase tracking-[0.4em]">
                  <Globe size={12} /> Global Discovery
                </div>
                <div className="flex items-center gap-2 text-[8px] font-black text-white uppercase tracking-[0.4em]">
                  <Zap size={12} /> Real-Time Hub
                </div>
              </div>
            </div>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Auth;
