import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Music, Mic, PartyPopper, ArrowRight, Star, Clock, Search, Navigation, CheckCircle2, Zap, Globe, Compass } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [discovering, setDiscovering] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [activeLocation, setActiveLocation] = useState('');
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const PLACEHOLDERS = [
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    'https://images.unsplash.com/photo-1514525253361-bee8718a300c?w=800&q=80',
    'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80',
    'https://images.unsplash.com/photo-1475721027185-404ece7741ec?w=800&q=80'
  ];

  const getFallbackImage = (id) => PLACEHOLDERS[id % PLACEHOLDERS.length];

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/events${activeLocation ? `?location=${activeLocation}` : ''}`);
        if (res.ok) {
          const data = await res.json();
          if (data.length === 0 && activeLocation) {
            setEvents([]);
            setDiscovering(true);
            const dRes = await fetch(`/api/discover?city=${encodeURIComponent(activeLocation)}`);
            if (dRes.ok) {
              const dData = await dRes.json();
              setEvents(dData);
            }
            setDiscovering(false);
          } else {
            setEvents(data);
            setDiscovering(false);
          }
        }
      } catch (err) {
        console.error("Discovery Engine Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [activeLocation]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchLocation.trim()) return;
    setEvents([]);
    setActiveLocation(searchLocation);
  };

  const categories = ['All', 'Music Festival', 'Sports', 'Arts & Culture', 'Conferences & Summits'];

  const handleBook = (event) => {
    navigate('/payment', { state: { event } });
  };

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="visible"
      className="space-y-12 pt-6 pb-24"
    >
      <header className="space-y-10">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-10">
          <motion.div variants={containerVars} className="space-y-4">
            <div className="flex items-center gap-3 bg-royal-500/10 border border-royal-500/20 px-4 py-1.5 rounded-full w-fit">
              <Compass size={14} className="text-royal-500 animate-spin-slow" />
              <span className="text-[10px] font-black text-royal-500 uppercase tracking-[0.3em]">Live Global Explorer</span>
            </div>
            <h1 className="text-7xl font-heading font-black tracking-tighter text-white leading-[0.9]">
              World <br /> <span className="premium-text-gradient">Experiences.</span>
            </h1>
            <p className="text-gray-500 text-xl font-medium max-w-xl">
              Access real-time events across 2,400+ cities. Every discovery is verified by our AI synchronization engine.
            </p>
          </motion.div>
          
          <div className="w-full xl:w-auto flex flex-col md:flex-row gap-4 items-stretch">
            <form onSubmit={handleSearch} className="relative group flex-1 md:w-[450px]">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-royal-500 transition-colors" size={24} />
              <input 
                type="text" 
                placeholder="Search any city (e.g. Dubai, Paris, Mumbai)..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full bg-white/[0.02] border-2 border-white/5 rounded-3xl py-6 pl-16 pr-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-royal-500 transition-all font-bold text-lg"
              />
              <button 
                type="submit"
                className="absolute right-3 top-3 bottom-3 bg-royal-500 hover:bg-royal-600 text-white px-8 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-glow-primary active:scale-95"
              >
                Explore
              </button>
            </form>

            <Button 
              onClick={async () => {
                setLoading(true);
                setDiscovering(true);
                const res = await fetch('/api/discover');
                if (res.ok) {
                  const data = await res.json();
                  setEvents(data);
                  setActiveLocation('Worldwide');
                }
                setLoading(false);
                setDiscovering(false);
              }}
              className="px-10 py-6 rounded-3xl bg-white/[0.02] border-2 border-white/5 hover:border-royal-500/50 flex items-center gap-4 group transition-all"
            >
              <Globe className="text-royal-500 group-hover:rotate-180 transition-transform duration-1000" size={24} />
              <span className="font-black uppercase tracking-widest text-xs">World Feed</span>
            </Button>
          </div>
        </div>
        
        <div className="flex bg-white/[0.02] p-2 rounded-3xl border border-white/5 overflow-x-auto no-scrollbar gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-500 ${
                filter === cat ? 'bg-royal-500 text-white shadow-glow-primary' : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {!activeLocation && (
          <div className="space-y-4 pt-4">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] ml-2">Trending Global Hubs</p>
            <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar">
              {['Andhra', 'Kerala', 'Madurai', 'Dubai', 'London', 'Singapore', 'Paris', 'New York', 'Tokyo', 'Mumbai', 'Chennai', 'Sydney', 'Berlin', 'Bangalore', 'Delhi', 'Hyderabad', 'Kolkata', 'San Francisco', 'Seoul', 'Shanghai'].map(city => (
                <button
                  key={city}
                  onClick={() => { setSearchLocation(city); setActiveLocation(city); }}
                  className="px-10 py-6 bg-white/[0.02] border border-white/5 rounded-[32px] whitespace-nowrap text-lg font-black text-gray-400 hover:text-white hover:border-royal-500 hover:bg-royal-500/10 transition-all active:scale-95 flex items-center gap-4 group"
                >
                  <MapPin size={20} className="text-royal-500 group-hover:animate-bounce" /> {city}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {activeLocation && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 bg-royal-500/10 px-6 py-3 rounded-2xl w-fit border border-royal-500/20"
        >
          <div className="w-2 h-2 bg-royal-500 rounded-full animate-ping"></div>
          <span className="font-black uppercase tracking-[0.2em] text-[10px] text-royal-500">Discovering Hub: {activeLocation}</span>
          <button onClick={() => {setActiveLocation(''); setSearchLocation('')}} className="ml-4 text-gray-500 hover:text-white transition-colors">✕</button>
        </motion.div>
      )}

      {loading || discovering ? (
        <div className="flex flex-col items-center justify-center py-40 space-y-10">
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border-4 border-royal-500/10 border-t-royal-500 rounded-full shadow-glow-primary"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="text-royal-500 animate-pulse" size={40} />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-heading font-black text-white">Synchronizing Data...</h3>
            <p className="text-gray-500 font-medium text-lg">Acquiring real-time resources from global providers.</p>
          </div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-40 bg-white/[0.01] rounded-[48px] border border-white/5 border-dashed">
          <Globe size={80} className="text-gray-800 mx-auto mb-8 opacity-20" />
          <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Zero Events Detected</h3>
          <p className="text-gray-500 text-lg">No verified experiences found in this quadrant. Try a major global hub.</p>
          <Button onClick={() => {setActiveLocation(''); setSearchLocation('')}} className="mt-10 px-12 py-5 bg-white/5 border-white/10 hover:bg-royal-500 hover:border-transparent transition-all font-black uppercase tracking-widest text-xs">
            Return to Base
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {events.filter(e => filter === 'All' || e.type === filter).map((event, i) => (
              <GlassCard key={event.id} delay={i * 0.05} className="p-0 border-white/5 flex flex-col h-auto min-h-[750px] group hover:border-royal-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-royal-500/10">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={event.image || getFallbackImage(i)} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt="" 
                    onError={(e) => e.target.src = getFallbackImage(i)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90"></div>
                  
                  <div className="absolute top-6 left-6 flex flex-col gap-3">
                    <span className="bg-royal-500 text-white px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-glow-primary">
                      {event.type}
                    </span>
                    <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">{event.source || 'Verified Source'}</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-6 right-8 text-4xl font-black text-white tracking-tighter drop-shadow-2xl">
                    ${event.price || 'Free'}
                  </div>
                </div>

                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-3xl font-black text-white group-hover:text-royal-500 transition-colors leading-[1.1] tracking-tight line-clamp-2">{event.title}</h3>
                  </div>

                  <div className="space-y-5 mb-10 flex-1">
                    <div className="flex items-center gap-4 text-gray-500">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-royal-500 border border-white/5">
                        <Calendar size={20} />
                      </div>
                      <span className="text-base font-bold text-gray-300">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-500">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-royal-500 border border-white/5">
                        <MapPin size={20} />
                      </div>
                      <span className="text-base font-bold text-gray-300 line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <Button 
                      onClick={() => handleBook(event)}
                      className="w-full py-8 bg-gradient-to-r from-royal-600 to-indigo-600 text-white font-black uppercase tracking-[0.3em] text-sm rounded-3xl shadow-glow-primary hover:from-royal-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-3 group/btn"
                    >
                      <Zap size={20} className="group-hover/btn:animate-pulse" />
                      Instant Booking
                    </Button>
                    {event.source_url && event.source_url !== '#' && (
                      <a href={event.source_url} target="_blank" rel="noreferrer" className="w-full">
                        <Button variant="secondary" className="w-full py-5 bg-white/[0.03] border-white/10 text-white font-black uppercase tracking-widest text-[9px] rounded-2xl">
                          Official Site
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Membership CTA */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="mt-20 p-[1px] rounded-[48px] bg-gradient-to-r from-royal-500 via-indigo-500 to-royal-500 overflow-hidden"
      >
        <div className="bg-[#05070a] p-16 rounded-[47px] flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
            <Zap size={300} className="text-royal-500" />
          </div>
          
          <div className="space-y-6 flex-1 text-center lg:text-left relative z-10">
            <h2 className="text-6xl font-heading font-black text-white tracking-tighter leading-[1]">Request <br /> <span className="premium-text-gradient">Universal Access.</span></h2>
            <p className="text-gray-500 text-xl font-medium max-w-xl mx-auto lg:mx-0">Our AI agents can secure admission and logistical support for any unlisted event worldwide. Simply authorize a search.</p>
          </div>
          
          <Button 
            onClick={() => navigate('/chat')}
            className="px-16 py-8 bg-white text-black font-black uppercase tracking-[0.3em] text-sm rounded-[32px] hover:bg-gray-200 transition-all shadow-[0_20px_60px_rgba(255,255,255,0.2)] whitespace-nowrap"
          >
            Initiate Agent
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Events;
