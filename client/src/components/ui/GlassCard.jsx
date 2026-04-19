import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', delay = 0, hover = true, light = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { 
        y: -8, 
        scale: 1.01,
        boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 82, 255, 0.15)",
        borderColor: "rgba(255, 255, 255, 0.15)"
      } : {}}
      className={`
        ${light ? 'glass-effect-light' : 'glass-effect'} 
        rounded-[32px] p-8 transition-all duration-500 relative overflow-hidden group
        ${className}
      `}
    >
      {/* Dynamic Lighting Overlay */}
      <div className="absolute inset-0 bg-glass-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
