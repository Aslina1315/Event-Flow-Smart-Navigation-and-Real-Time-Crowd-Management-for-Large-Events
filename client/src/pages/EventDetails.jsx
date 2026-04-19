import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Star, ShieldCheck, Ticket, ArrowLeft, Info, Users, Utensils, Zap, ChevronRight, Cloud, Thermometer, Wind, Droplets } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const res = await fetch(`/api/events`);
        if (res.ok) {
          const data = await res.json();
          const found = data.find(e => e.id === parseInt(id));
          setEvent(found);
          
          // Fetch Real-World Weather if coordinates exist
          if (found && found.lat && found.lng) {
            const wRes = await fetch(`/api/weather?lat=${found.lat}&lng=${found.lng}`);
            if (wRes.ok) {
              const wData = await wRes.json();
              setWeather(wData.current);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching event details/weather", err);
      } finally {
        setLoading(false);
        setWeatherLoading(false);
      }
    };
    fetchEventData();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-[80vh]"><div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!event) return <div className="text-center py-20"><h2 className="text-2xl font-bold">Event not found</h2><Button onClick={() => navigate('/events')} className="mt-4">Back to Events</Button></div>;

  return (
    <div className="space-y-10 pt-4 pb-20">
      <button 
        onClick={() => navigate('/events')}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group mb-4"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Global Explorer
      </button>

      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] rounded-[40px] overflow-hidden group">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent"></div>
        
        <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex gap-3">
              <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-glow-primary">
                {event.type}
              </span>
              <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck size={12} /> Verified Source
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-tight">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-gray-300">
              <span className="flex items-center gap-2 font-medium"><MapPin size={20} className="text-primary-400" /> {event.location}</span>
              <span className="flex items-center gap-2 font-medium"><Calendar size={20} className="text-secondary-400" /> {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-2 font-medium"><Clock size={20} className="text-accent-400" /> {event.time}</span>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[30px] border border-white/10 text-center min-w-[220px] shadow-2xl">
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Price per Ticket</p>
            <h2 className="text-5xl font-black text-white mb-6">
              {event.price === 0 ? <span className="text-green-400">FREE</span> : `$${event.price}`}
            </h2>
            <Button onClick={() => navigate('/payment', { state: { event } })} className="w-full py-4 text-lg font-black shadow-glow-primary">BOOK NOW</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <GlassCard className="p-10 border-white/5">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Info className="text-primary-400" /> Event Intelligence
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              This iconic {event.type.toLowerCase()} is verified by <strong>{event.source}</strong>. 
              Our AI crowd monitoring will be active during the event to ensure seamless navigation 
              through {event.location}. You can use the Live Map for real-time traffic updates.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-primary-500/30 transition-all group">
                <div className="w-12 h-12 bg-primary-500/20 rounded-2xl flex items-center justify-center text-primary-400 mb-4 group-hover:scale-110 transition-transform">
                  <Users size={24} />
                </div>
                <h4 className="font-bold text-white mb-2">Expected Attendance</h4>
                <p className="text-sm text-gray-400">Estimated 25k - 40k attendees. AI routing suggested.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-secondary-500/30 transition-all group">
                <div className="w-12 h-12 bg-secondary-500/20 rounded-2xl flex items-center justify-center text-secondary-400 mb-4 group-hover:scale-110 transition-transform">
                  <Utensils size={24} />
                </div>
                <h4 className="font-bold text-white mb-2">Smart Food Planning</h4>
                <p className="text-sm text-gray-400">Pre-calculate your expenses based on local venue pricing.</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-10 border-white/5">
            <h3 className="text-2xl font-bold mb-8">Official Schedule</h3>
            <div className="space-y-6">
              {[
                { time: '10:00 AM', title: 'Main Gates Opening', icon: <Zap /> },
                { time: '01:00 PM', title: 'Opening Ceremony', icon: <Star /> },
                { time: '04:00 PM', title: 'Headliner Performance', icon: <Ticket /> },
                { time: '08:00 PM', title: 'Closing Ceremony', icon: <Clock /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-4 hover:bg-white/5 rounded-2xl transition-colors cursor-pointer group">
                  <span className="text-primary-400 font-bold w-20">{item.time}</span>
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-500 group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-lg font-medium text-white flex-1">{item.title}</span>
                  <ChevronRight size={18} className="text-gray-700 group-hover:text-white" />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="space-y-10">
          <GlassCard className="p-8 border-secondary-500/30 bg-secondary-500/5 shadow-glow-secondary">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-secondary-400">
              <Zap size={20} /> AI Planning Actions
            </h3>
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/expenses', { state: { eventId: event.id, eventTitle: event.title } })}
                className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-base font-bold"
              >
                Plan My Budget <ChevronRight size={18} />
              </Button>
              <Button 
                variant="secondary"
                onClick={() => navigate('/map', { state: { eventLocation: event.location } })}
                className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-base font-bold bg-white/5 border-white/10"
              >
                View Venue Map <ChevronRight size={18} />
              </Button>
            </div>
          </GlassCard>

          <GlassCard className="p-8 border-white/5 relative overflow-hidden group">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Cloud size={20} className="text-blue-400" /> Weather Intelligence
            </h3>
            
            {weatherLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-white/5 rounded-2xl w-full"></div>
                <div className="h-20 bg-white/5 rounded-2xl w-full"></div>
              </div>
            ) : weather ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400">
                      <Thermometer size={32} />
                    </div>
                    <div>
                      <p className="text-3xl font-black text-white">{weather.temperature_2m}°C</p>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Atmospheric Temp</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-300">Feels like {weather.apparent_temperature}°</p>
                    <span className="text-[10px] bg-white/10 px-3 py-1 rounded-full text-gray-400 font-black tracking-widest">LIVE DATA</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
                    <Wind size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-bold text-white">{weather.wind_speed_10m} km/h</p>
                      <p className="text-[9px] text-gray-500 uppercase font-black">Wind</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
                    <Droplets size={20} className="text-blue-400" />
                    <div>
                      <p className="text-sm font-bold text-white">{weather.relative_humidity_2m}%</p>
                      <p className="text-[9px] text-gray-500 uppercase font-black">Humidity</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-400 text-center pt-2 italic">
                  Powered by real-time atmospheric sensors at {event.location}.
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Weather data temporarily unavailable for this region.</p>
            )}
          </GlassCard>

          <GlassCard className="p-8 border-white/5">
            <h3 className="text-xl font-bold mb-6">Venue Support</h3>
            <div className="p-4 bg-primary-500/10 rounded-2xl border border-primary-500/20 mb-6">
              <p className="text-sm text-primary-400 font-medium leading-relaxed">
                Need immediate help? Ask our AI assistant about {event.title} navigation and security.
              </p>
            </div>
            <Button 
              onClick={() => navigate('/chat')}
              className="w-full py-4 bg-white text-[#0f172a] hover:bg-gray-200 font-bold rounded-2xl"
            >
              Open AI Chat
            </Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
