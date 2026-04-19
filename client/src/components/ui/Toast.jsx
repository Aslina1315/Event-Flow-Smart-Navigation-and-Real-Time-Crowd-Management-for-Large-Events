import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

// Singleton event emitter for toasts
export const toastEmitter = {
  listeners: [],
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },
  emit(message, type = 'success') {
    this.listeners.forEach(listener => listener({ id: Date.now(), message, type }));
  }
};

export const toast = {
  success: (msg) => toastEmitter.emit(msg, 'success'),
  error: (msg) => toastEmitter.emit(msg, 'error'),
  info: (msg) => toastEmitter.emit(msg, 'info')
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = toastEmitter.subscribe((newToast) => {
      setToasts(prev => [...prev, newToast]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, 3000);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`pointer-events-auto flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border ${
              t.type === 'success' ? 'bg-green-500/20 border-green-500/30 text-green-100 shadow-[0_0_20px_rgba(34,197,94,0.3)]' :
              t.type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.3)]' :
              'bg-primary-500/20 border-primary-500/30 text-primary-100 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
            }`}
          >
            {t.type === 'success' ? <CheckCircle size={20} className="text-green-400" /> : 
             t.type === 'error' ? <AlertTriangle size={20} className="text-red-400" /> : 
             <Info size={20} className="text-primary-400" />}
            <span className="font-medium text-sm">{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
