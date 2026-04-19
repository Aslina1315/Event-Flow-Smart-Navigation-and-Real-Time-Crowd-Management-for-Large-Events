import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false, ...props }) => {
  const baseStyle = "px-8 py-4 rounded-2xl font-black uppercase tracking-[0.1em] text-xs transition-all duration-500 flex items-center justify-center gap-3 relative overflow-hidden group active:scale-95";
  
  const variants = {
    primary: "bg-royal-500 text-white shadow-glow-primary hover:bg-royal-600 border border-royal-400/30",
    secondary: "bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/10 backdrop-blur-3xl",
    danger: "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20",
    outline: "bg-transparent border-2 border-white/10 hover:border-royal-500 text-white",
  };

  return (
    <motion.button
      whileHover={!disabled ? { y: -2, boxShadow: variant === 'primary' ? "0 20px 40px -10px rgba(0, 82, 255, 0.4)" : "0 20px 40px -10px rgba(0, 0, 0, 0.5)" } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyle} 
        ${variants[variant]} 
        ${disabled ? 'opacity-30 cursor-not-allowed grayscale' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Dynamic Shine Layer */}
      {!disabled && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
      )}
      
      {/* Background Pulse for Primary */}
      {variant === 'primary' && !disabled && (
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
      )}

      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </motion.button>
  );
};

export default Button;
