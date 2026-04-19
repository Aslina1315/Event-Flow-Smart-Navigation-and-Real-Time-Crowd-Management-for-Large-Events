import { motion } from 'framer-motion';

const EventFlowLogo = ({ className = "w-12 h-12" }) => {
  return (
    <motion.div 
      className={`relative flex items-center justify-center cursor-pointer ${className}`}
      whileHover="hover"
      initial="initial"
      animate="animate"
    >
      <motion.svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0052FF" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Background Glow */}
        <motion.circle 
          cx="50" cy="50" r="35" 
          fill="url(#logoGradient)" 
          opacity="0.1"
          variants={{
            animate: { scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05], transition: { repeat: Infinity, duration: 4 } }
          }}
        />

        {/* The 'Flow' Element - Sleek stylized 'E' / Wave */}
        <motion.path 
          d="M25 30 L75 30 L75 42 L38 42 L38 48 L65 48 L65 60 L38 60 L38 66 L75 66 L75 78 L25 78 Z" 
          fill="url(#logoGradient)"
          className="drop-shadow-glow-primary"
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            hover: { scale: 1.1, filter: "brightness(1.2)" }
          }}
        />

        {/* Orbital Ring */}
        <motion.circle 
          cx="50" cy="50" r="45" 
          fill="none" 
          stroke="url(#logoGradient)" 
          strokeWidth="0.5" 
          strokeDasharray="10 20"
          strokeOpacity="0.3"
          variants={{
            animate: { rotate: 360, transition: { repeat: Infinity, duration: 20, ease: "linear" } }
          }}
          style={{ transformOrigin: "50px 50px" }}
        />

        {/* Digital Pulse Nodes */}
        {[0, 1, 2, 3].map((i) => (
          <motion.circle 
            key={i}
            cx={50 + 45 * Math.cos(i * Math.PI / 2)} 
            cy={50 + 45 * Math.sin(i * Math.PI / 2)} 
            r="2"
            fill="white"
            variants={{
              animate: { 
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.8, 0.2],
                transition: { repeat: Infinity, duration: 2 + i, delay: i * 0.5 }
              }
            }}
          />
        ))}

        {/* Glowing Center Point */}
        <motion.circle 
          cx="50" cy="50" r="4" 
          fill="white" 
          filter="url(#glow)"
          variants={{
            animate: { opacity: [0.4, 1, 0.4], transition: { repeat: Infinity, duration: 2 } }
          }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default EventFlowLogo;
