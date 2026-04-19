import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Sidebar from './components/layout/Sidebar';
import BottomNav from './components/layout/BottomNav';
import PageWrapper from './components/layout/PageWrapper';

import Dashboard from './pages/Dashboard';
import MapView from './pages/Map';
import Alerts from './pages/Alerts';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Expenses from './pages/Expenses';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Payment from './pages/Payment';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import EmergencyModal from './components/ui/EmergencyModal';
import ToastContainer from './components/ui/Toast';
import { WifiOff, AlertTriangle, Menu } from 'lucide-react';
import Home from './pages/Home';

const AnimatedRoutes = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/auth" element={<PageWrapper><Auth onLogin={() => setIsAuthenticated(true)} /></PageWrapper>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
            <Route path="/map" element={<PageWrapper><MapView /></PageWrapper>} />
            <Route path="/alerts" element={<PageWrapper><Alerts /></PageWrapper>} />
            <Route path="/chat" element={<PageWrapper><Chat /></PageWrapper>} />
            <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
            <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
            <Route path="/expenses" element={<PageWrapper><Expenses /></PageWrapper>} />
            <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
            <Route path="/events/:id" element={<PageWrapper><EventDetails /></PageWrapper>} />
            <Route path="/payment" element={<PageWrapper><Payment /></PageWrapper>} />
            <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));
  const [isOffline] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  // Simulate offline network toggle for demonstration
  useEffect(() => {
    // Simulated offline mode disabled for production stability
    /*
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsOffline(true);
        setTimeout(() => setIsOffline(false), 5000);
      }
    }, 15000);
    return () => clearInterval(interval);
    */
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background text-white font-sans overflow-x-hidden selection:bg-primary-500/30">
        {/* Background gradients for premium feel */}
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="fixed top-[40%] left-[30%] w-[30%] h-[30%] bg-accent-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        {isAuthenticated && (
          <>
            <Sidebar 
              setIsAuthenticated={handleLogout} 
              isOpen={isSidebarOpen} 
              setIsOpen={setIsSidebarOpen} 
            />
            <BottomNav />
            
            {/* Mobile/Floating Menu Toggle for Desktop when closed */}
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="fixed top-6 left-6 z-40 p-3 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors hidden md:block"
              >
                <Menu size={24} />
              </button>
            )}
          </>
        )}
        
        <main className={`relative z-10 w-full min-h-screen flex flex-col overflow-y-auto transition-all duration-700 ease-[0.16, 1, 0.3, 1] ${
          isAuthenticated 
            ? (isSidebarOpen ? 'md:pl-80' : 'md:pl-28') + ' pb-24 md:pb-12 pt-10 md:pt-16 px-6 md:px-12' 
            : 'flex items-center justify-center p-6'
        }`}>
          <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
            <AnimatedRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          </div>
        </main>

        {/* Global Features */}
        {isAuthenticated && (
          <>
            {/* Offline Badge */}
            <AnimatePresence>
              {isOffline && (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-orange-500 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-[0_0_15px_rgba(249,115,22,0.5)] border border-orange-400"
                >
                  <WifiOff size={16} /> Offline Mode: Using cached data
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating SOS Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowEmergency(true)}
              className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40 w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] border-2 border-red-400 hover:bg-red-600 transition-colors"
            >
              <AlertTriangle size={24} />
            </motion.button>

            <EmergencyModal isOpen={showEmergency} onClose={() => setShowEmergency(false)} />
            <ToastContainer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
