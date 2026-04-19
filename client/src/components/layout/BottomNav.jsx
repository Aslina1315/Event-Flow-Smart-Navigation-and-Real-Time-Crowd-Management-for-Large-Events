import { NavLink } from 'react-router-dom';
import { Home, Map as MapIcon, Bell, MessageSquare, User } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  // Mobile only shows 5 primary tabs to avoid clutter
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Map', path: '/map', icon: MapIcon },
    { name: 'Chat', path: '/chat', icon: MessageSquare },
    { name: 'Alerts', path: '/alerts', icon: Bell },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 glass-effect border-t border-white/10 pb-safe">
      <div className="flex justify-around items-center p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-xl transition-all relative ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-active"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-xl -z-10"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -2 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={isActive ? 'text-primary-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' : ''}
                >
                  <item.icon size={22} />
                </motion.div>
                <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {item.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
