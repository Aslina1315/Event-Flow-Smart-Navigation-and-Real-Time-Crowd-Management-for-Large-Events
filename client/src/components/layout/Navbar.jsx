import { NavLink } from 'react-router-dom';
import { Home, Map as MapIcon, Bell, User, Settings, LogOut, MessageSquare, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ setIsAuthenticated }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Map', path: '/map', icon: MapIcon },
    { name: 'Alerts', path: '/alerts', icon: Bell },
    { name: 'Chat', path: '/chat', icon: MessageSquare },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Payment', path: '/payment', icon: CreditCard },
  ];

  return (
    <>
      {/* Desktop Top Navbar */}
      <nav className="hidden md:flex fixed top-0 w-full z-50 glass-effect border-b border-white/10 px-8 py-4 justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-500 to-secondary-500 flex items-center justify-center">
            <span className="font-bold text-white text-xl">E</span>
          </div>
          <span className="text-xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
            EventFlow
          </span>
        </div>

        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive ? 'bg-white/10 text-primary-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon size={18} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all"
          >
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 glass-effect border-t border-white/10 pb-safe">
        <div className="flex justify-around items-center p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                  isActive ? 'text-primary-400' : 'text-gray-400 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    animate={{ scale: isActive ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <item.icon size={24} />
                  </motion.div>
                  <span className="text-[10px] font-medium">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
