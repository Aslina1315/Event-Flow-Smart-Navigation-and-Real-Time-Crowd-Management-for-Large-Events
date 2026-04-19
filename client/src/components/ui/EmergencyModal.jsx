import { motion, AnimatePresence } from 'framer-motion';
import { AlertOctagon, X, Phone, Navigation } from 'lucide-react';
import Button from './Button';

const EmergencyModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-950/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-red-900 border-2 border-red-500 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(239,68,68,0.5)]"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 text-red-200 hover:text-white bg-red-950/50 rounded-full hover:bg-red-800 transition-colors">
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-red-500 rounded-full mx-auto flex items-center justify-center mb-4 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.8)]">
                <AlertOctagon size={40} className="text-white" />
              </div>
              <h2 className="text-3xl font-heading font-bold text-white mb-2">EMERGENCY MODE</h2>
              <p className="text-red-200 text-lg">Stay calm. Follow instructions.</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-red-950/50 border border-red-500/30 rounded-2xl p-5 flex items-start gap-4">
                <Navigation className="text-red-400 shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Nearest Safe Exit: North Gate</h3>
                  <p className="text-red-200">Distance: 150m. Path is currently clear.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button className="bg-white text-red-600 hover:bg-red-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] border-none py-4 text-lg font-bold">
                <Navigation size={20} className="mr-2" /> Route to Exit
              </Button>
              <Button className="bg-red-600 text-white hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] border-red-400 py-4 text-lg font-bold">
                <Phone size={20} className="mr-2" /> Call Security
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EmergencyModal;
