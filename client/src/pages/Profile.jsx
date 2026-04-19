import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Ticket, MapPin, Edit3, Shield, Bell, Save, Camera, Mail, Phone, Lock, ChevronRight, CheckCircle2, X, Upload, Zap, Globe, Award } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { toast } from '../components/ui/Toast';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const fileInputRef = useRef(null);
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    avatar: null,
    phone: '+1 (555) 123-4567',
    bio: 'Global Experience Architect. Explorer of mega-events and high-intelligence crowd systems.'
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          setProfileData(prev => ({ 
            ...prev, 
            name: data.name, 
            email: data.email,
            avatar: data.avatar 
          }));
        }
      } catch (err) {
        console.error("Operational Identity Failure:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: profileData.name, email: profileData.email })
      });
      if (res.ok) {
        setIsEditing(false);
        toast.success('Identity profile updated successfully.');
      }
    } catch (err) {
      toast.error('Identity sync failed.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) return toast.error("Encryption keys do not match.");
    setLoading(true);
    try {
      const res = await fetch('/api/profile/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: passwords.new })
      });
      if (res.ok) {
        setPasswords({ current: '', new: '', confirm: '' });
        toast.success('Access keys rotated successfully.');
      }
    } catch (err) {
      toast.error('Security rotation failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      setProfileData(prev => ({ ...prev, avatar: base64String }));
      setLoading(true);
      try {
        await fetch('/api/profile/avatar', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ avatar: base64String })
        });
        toast.success('Visual ID updated.');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const tabs = [
    { id: 'overview', name: 'Identity', icon: <User size={18} /> },
    { id: 'security', name: 'Security Hub', icon: <Shield size={18} /> },
    { id: 'preferences', name: 'Neural Config', icon: <Zap size={18} /> }
  ];

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="visible"
      className="space-y-12 pt-6 pb-24"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <motion.div variants={itemVars} className="space-y-2">
          <div className="flex items-center gap-3 text-royal-500 font-black text-xs uppercase tracking-[0.4em] mb-2">
            <div className="w-2 h-2 bg-royal-500 rounded-full animate-pulse shadow-glow-primary"></div>
            Authenticated Identity Hub
          </div>
          <h1 className="text-6xl font-heading font-black tracking-tighter text-white">
            Operational <span className="premium-text-gradient">Identity.</span>
          </h1>
          <p className="text-gray-500 text-xl font-medium">Manage your verified presence and neural preferences.</p>
        </motion.div>
        
        <motion.div variants={itemVars} className="flex bg-white/[0.03] p-2 rounded-3xl border border-white/5">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-3 ${
                activeTab === tab.id ? 'bg-royal-500 text-white shadow-glow-primary' : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </motion.div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Left: Avatar Card */}
        <motion.div variants={itemVars} className="xl:col-span-4 space-y-10">
          <GlassCard className="text-center p-12 border-white/5 bg-white/[0.01] flex flex-col items-center group relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-glass-mesh opacity-20 pointer-events-none"></div>
            
            <div className="relative mb-10 group z-10">
              <div className="w-56 h-56 rounded-[48px] bg-royal-500 p-[2px] shadow-glow-primary overflow-hidden">
                <div className="w-full h-full rounded-[46px] bg-[#05070a] flex items-center justify-center overflow-hidden">
                  <img 
                    src={profileData.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80"} 
                    alt="Profile" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-4 -right-4 p-5 bg-royal-500 text-white rounded-2xl hover:bg-royal-600 transition-all shadow-glow-primary active:scale-90"
              >
                <Camera size={24} />
              </button>
            </div>
            
            <div className="space-y-3 z-10">
              <h2 className="text-4xl font-black text-white tracking-tighter">{profileData.name || 'Synchronizing...'}</h2>
              <div className="flex items-center justify-center gap-3 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
                <Award size={14} className="text-emerald-500" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Global Elite Member</span>
              </div>
            </div>
            
            <div className="w-full space-y-6 pt-10 mt-10 border-t border-white/5 z-10">
              <div className="flex justify-between items-center px-2">
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Registration Hub</span>
                <span className="text-sm font-black text-white tracking-tight">MAR 2024</span>
              </div>
              <div className="flex justify-between items-center px-2">
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Experiences Logged</span>
                <span className="text-sm font-black text-white tracking-tight">1,242</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="border-royal-500/20 bg-royal-500/[0.03] p-10 shadow-2xl">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-royal-500/20 rounded-xl flex items-center justify-center text-royal-500 shadow-glow-primary">
                <Shield size={24} />
              </div>
              <div className="space-y-2">
                <h4 className="font-black text-white uppercase tracking-widest text-[10px]">Biometric Status</h4>
                <p className="text-gray-500 text-base font-medium leading-relaxed">Identity confirmed via satellite telemetry. Access granted to all Tier 1 venues.</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Right: Tab Content */}
        <motion.div variants={itemVars} className="xl:col-span-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="space-y-12"
              >
                <GlassCard className="p-12 border-white/5 bg-white/[0.01] shadow-2xl">
                  <div className="flex justify-between items-center mb-12">
                    <h3 className="text-3xl font-black text-white tracking-tight">Identity Metadata</h3>
                    <Button 
                      variant="secondary" 
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-8 bg-white/[0.03] border-white/10 text-xs font-black uppercase tracking-widest"
                    >
                      {isEditing ? <X size={18} /> : <Edit3 size={18} />} 
                      {isEditing ? 'Terminate' : 'Update Profile'}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <User size={12} className="text-royal-500" /> Full Identity Name
                        </label>
                        {isEditing ? (
                          <input 
                            type="text" 
                            value={profileData.name} 
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-royal-500 font-bold transition-all"
                          />
                        ) : (
                          <div className="w-full bg-white/[0.02] border-2 border-transparent rounded-2xl p-6 text-white font-black text-xl tracking-tight">{profileData.name}</div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <Mail size={12} className="text-royal-500" /> Authorized Network
                        </label>
                        {isEditing ? (
                          <input 
                            type="email" 
                            value={profileData.email} 
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-royal-500 font-bold transition-all"
                          />
                        ) : (
                          <div className="w-full bg-white/[0.02] border-2 border-transparent rounded-2xl p-6 text-white font-black text-xl tracking-tight">{profileData.email}</div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <Phone size={12} className="text-royal-500" /> Secure Terminal Link
                        </label>
                        {isEditing ? (
                          <input 
                            type="text" 
                            value={profileData.phone} 
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-royal-500 font-bold transition-all"
                          />
                        ) : (
                          <div className="w-full bg-white/[0.02] border-2 border-transparent rounded-2xl p-6 text-white font-black text-xl tracking-tight">{profileData.phone}</div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <Edit3 size={12} className="text-royal-500" /> Operational Bio
                        </label>
                        {isEditing ? (
                          <textarea 
                            rows="1"
                            value={profileData.bio} 
                            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                            className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-royal-500 font-medium transition-all resize-none"
                          />
                        ) : (
                          <div className="w-full bg-white/[0.02] border-2 border-transparent rounded-2xl p-6 text-white font-medium text-lg leading-relaxed line-clamp-1">{profileData.bio}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-12 pt-10 border-t border-white/5 flex justify-end"
                    >
                      <Button 
                        disabled={loading}
                        onClick={handleSave}
                        className="px-12 py-6 bg-royal-500 shadow-glow-primary text-xl font-black"
                      >
                        {loading ? 'Committing...' : 'Synchronize Identity'}
                      </Button>
                    </motion.div>
                  )}
                </GlassCard>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="space-y-12"
              >
                <GlassCard className="p-12 border-white/5 bg-white/[0.01] shadow-2xl">
                  <h3 className="text-3xl font-black text-white tracking-tight mb-12">Security Configuration</h3>
                  <div className="space-y-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 p-10 bg-white/[0.03] rounded-[32px] border border-white/5 hover:border-royal-500/20 transition-all duration-500">
                      <div className="flex items-start gap-8">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 shadow-glow-primary">
                          <Shield size={32} />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-black text-white text-2xl tracking-tighter">Satellite 2FA Encryption</h4>
                          <p className="text-base text-gray-500 font-medium">Secondary verification hub active for all global transactions.</p>
                        </div>
                      </div>
                      <span className="px-8 py-3 bg-emerald-500 text-white font-black uppercase tracking-widest text-[10px] rounded-full shadow-glow-primary">Protocol Active</span>
                    </div>

                    <form onSubmit={handlePasswordUpdate} className="space-y-10">
                      <div className="flex items-center gap-4 px-2">
                        <h4 className="text-xl font-black text-white uppercase tracking-widest text-[10px]">Rotate Access Credentials</h4>
                        <div className="flex-1 h-[1px] bg-white/5"></div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Current Key</label>
                          <input 
                            type="password" 
                            required
                            value={passwords.current}
                            onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                            placeholder="••••••••" 
                            className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-royal-500 font-bold transition-all" 
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">New Neural Key</label>
                          <input 
                            type="password" 
                            required
                            value={passwords.new}
                            onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                            placeholder="••••••••" 
                            className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-royal-500 font-bold transition-all" 
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Confirm Sync</label>
                          <input 
                            type="password" 
                            required
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                            placeholder="••••••••" 
                            className="w-full bg-background border-2 border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-royal-500 font-bold transition-all" 
                          />
                        </div>
                      </div>
                      <div className="flex justify-end pt-6">
                        <Button type="submit" disabled={loading} className="px-12 py-6 font-black bg-royal-500 shadow-glow-primary text-xl">
                          {loading ? 'Encrypting...' : 'Rotate Security Access'}
                        </Button>
                      </div>
                    </form>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === 'preferences' && (
              <motion.div
                key="preferences"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="space-y-12"
              >
                <GlassCard className="p-12 border-white/5 bg-white/[0.01] shadow-2xl">
                  <h3 className="text-3xl font-black text-white tracking-tight mb-12">Neural Configuration</h3>
                  <div className="space-y-8">
                    {[
                      { title: 'Predictive Flow Modeling', desc: 'Authorize AI to optimize your venue experience via satellite telemetry.', icon: <MapPin size={24} />, color: 'text-royal-500' },
                      { title: 'Security Broadcast Hub', desc: 'Real-time neural link to venue perimeter safety and crowd alerts.', icon: <Bell size={24} />, color: 'text-amber-500' },
                      { title: 'Quantum Identity Mask', desc: 'Hide your geospatial presence from unauthorized global attendees.', icon: <Shield size={24} />, color: 'text-indigo-500' }
                    ].map((pref, i) => (
                      <div key={i} className="flex items-center justify-between p-10 bg-white/[0.03] rounded-[32px] border border-white/5 hover:border-white/20 transition-all duration-500 group">
                        <div className="flex items-start gap-8">
                          <div className={`w-16 h-16 bg-white/[0.03] rounded-2xl flex items-center justify-center ${pref.color} shadow-2xl border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
                            {pref.icon}
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-black text-white text-2xl tracking-tighter">{pref.title}</h4>
                            <p className="text-base text-gray-500 font-medium">{pref.desc}</p>
                          </div>
                        </div>
                        <div className="w-16 h-8 bg-royal-500 rounded-full relative p-1 cursor-pointer shadow-glow-primary">
                          <motion.div 
                            initial={false}
                            animate={{ x: 32 }}
                            className="w-6 h-6 bg-white rounded-full shadow-2xl"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
