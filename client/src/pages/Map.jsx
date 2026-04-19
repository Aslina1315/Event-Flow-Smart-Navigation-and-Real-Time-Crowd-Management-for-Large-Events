import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

// Fix Leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createCustomIcon = (color) => {
  return new L.DivIcon({
    className: 'custom-div-icon',
    html: `
      <div class="marker-container">
        <div class="marker-pulse" style="background-color: ${color}"></div>
        <div class="marker-core" style="background-color: ${color}"></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
};

// Helper to fix map rendering inside dynamic containers
const ResizeFix = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 250);
  }, [map]);
  return null;
};

const MapView = () => {
  const [zones, setZones] = useState([]);
  const [events, setEvents] = useState([]);
  const center = [13.0827, 80.2707];

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [zRes, eRes] = await Promise.all([fetch('/api/zones'), fetch('/api/events')]);
        if (zRes.ok) setZones(await zRes.json());
        if (eRes.ok) setEvents(await eRes.json());
      } catch (err) {
        console.error("Map Data Fetch Error:", err);
      }
    };
    fetchAll();
    const interval = setInterval(fetchAll, 8000);
    return () => clearInterval(interval);
  }, []);

  const safeRoute = [
    [13.0410, 80.2575],
    [13.0441, 80.2584],
    [13.0789, 80.2831]
  ];

  const zoneCoordinates = {
    'Main Stage': [13.0410, 80.2575],
    'Food Court A': [13.0441, 80.2584],
    'North Gate': [13.0789, 80.2831],
    'VIP Lounge': [13.0400, 80.2500]
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <header className="shrink-0 px-2">
        <div className="flex items-center gap-3 text-royal-500 font-black text-xs uppercase tracking-[0.4em] mb-2">
          <div className="w-2 h-2 bg-royal-500 rounded-full animate-pulse shadow-glow-primary"></div>
          Live Operational View
        </div>
        <h1 className="text-5xl font-heading font-black tracking-tighter text-white">
          Global <span className="premium-text-gradient">Map.</span>
        </h1>
      </header>

      <div style={{ height: '800px', width: '100%', position: 'relative', border: '2px solid #0052FF', borderRadius: '40px', overflow: 'hidden', background: '#05070a' }}>
        <div style={{ height: '100%', width: '100%' }}>
          <MapContainer 
            center={center} 
            zoom={12} 
            zoomControl={false}
            style={{ height: '100%', width: '100%', background: '#05070a' }}
          >
            <ResizeFix />
            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            
            <Polyline 
              positions={safeRoute} 
              pathOptions={{ 
                color: '#0052FF', 
                weight: 6, 
                opacity: 0.8, 
                dashArray: '15, 20'
              }} 
            />
            
            {zones.map((zone) => (
              <Circle
                key={zone.id}
                center={zoneCoordinates[zone.name] || center}
                radius={150}
                pathOptions={{
                  color: zone.density > 70 ? '#ef4444' : zone.density > 40 ? '#f59e0b' : '#10b981',
                  fillColor: zone.density > 70 ? '#ef4444' : zone.density > 40 ? '#f59e0b' : '#10b981',
                  fillOpacity: 0.2,
                  stroke: false
                }}
              />
            ))}

            {events.map((event) => (
              <Marker 
                key={event.id} 
                position={[event.lat || center[0], event.lng || center[1]]} 
                icon={createCustomIcon('#0052FF')}
              >
                <Popup className="premium-popup">
                  <div className="p-4 bg-white rounded-2xl w-64 shadow-2xl overflow-hidden text-black">
                    <img src={event.image} className="w-full h-32 object-cover rounded-xl mb-4" alt="" />
                    <h4 className="font-black text-lg mb-1 leading-tight">{event.title}</h4>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{event.location}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-royal-500 font-black text-xl">${event.price}</span>
                      <Button className="px-4 py-2 text-[10px] bg-black text-white">Book Now</Button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        {/* Scanning Radar Effect */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-30 overflow-hidden">
          <div className="radar-sweep"></div>
        </div>

        {/* Overlay Controls */}
        <div className="absolute top-8 left-8 z-[1000] flex flex-col gap-4">
          <div className="bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 flex items-center gap-3">
            <div className="w-2 h-2 bg-royal-500 rounded-full animate-ping"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Live System Sync</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
