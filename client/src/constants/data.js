export const MOCK_EVENTS = [
  { id: 'm1', title: 'Margazhi Music Festival', type: 'Music Festival', price: 25, date: '2026-12-15', time: '18:00', location: 'Music Academy, Chennai', crowdStatus: 'High', image: 'https://images.unsplash.com/photo-1514525253361-bee8718a300c?w=800&q=80', source: 'Internal Link' },
  { id: 'm2', title: 'Global Tech Expo 2026', type: 'Conferences & Summits', price: 120, date: '2026-11-10', time: '09:00', location: 'BIEC, Bangalore', crowdStatus: 'Moderate', image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80', source: 'Internal Link' },
  { id: 'm3', title: 'Paris Fashion Week', type: 'Arts & Culture', price: 250, date: '2026-09-28', time: '10:00', location: 'Louvre, Paris', crowdStatus: 'Critical', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', source: 'Internal Link' },
  { id: 'm4', title: 'FIFA World Cup Opening', type: 'Sports', price: 450, date: '2026-06-11', time: '19:00', location: 'Azteca, Mexico City', crowdStatus: 'Extreme', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80', source: 'Internal Link' },
  { id: 'm5', title: 'Tokyo Sakura Gala', type: 'Community Celebrations', price: 0, date: '2026-04-25', time: '11:00', location: 'Ueno Park, Tokyo', crowdStatus: 'High', image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80', source: 'Internal Link' },
  { id: 'm6', title: 'Dubai Shopping Fest', type: 'Community Celebrations', price: 0, date: '2026-12-15', time: '10:00', location: 'Dubai Mall, UAE', crowdStatus: 'Moderate', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', source: 'Internal Link' },
  { id: 'm7', title: 'Wimbledon Final', type: 'Sports', price: 180, date: '2026-07-12', time: '14:00', location: 'London, UK', crowdStatus: 'High', image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a4bd13?w=800&q=80', source: 'Internal Link' },
  { id: 'm8', title: 'Vivid Sydney Lights', type: 'Arts & Culture', price: 0, date: '2026-05-22', time: '18:00', location: 'Circular Quay, Sydney', crowdStatus: 'High', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80', source: 'Internal Link' }
];

export const MOCK_ZONES = [
  { id: 1, name: 'Main Stage', density: 85, trend: 'increasing' },
  { id: 2, name: 'Food Court A', density: 45, trend: 'stable' },
  { id: 3, name: 'North Gate', density: 15, trend: 'decreasing' },
  { id: 4, name: 'VIP Lounge', density: 30, trend: 'stable' },
  { id: 5, name: 'Merchandise Hub', density: 60, trend: 'increasing' }
];

export const MOCK_EXPENSES = [
  { name: 'VIP Lounge Access', category: 'Merch', predictedPrice: 150, range: { low: 120, high: 200 } },
  { name: 'Official Jersey', category: 'Merch', predictedPrice: 85, range: { low: 75, high: 95 } },
  { name: 'Premium Beverage', category: 'Drinks', predictedPrice: 12, range: { low: 8, high: 15 } },
  { name: 'Gourmet Platter', category: 'Food', predictedPrice: 35, range: { low: 25, high: 45 } },
  { name: 'Priority Parking', category: 'Merch', predictedPrice: 50, range: { low: 40, high: 70 } },
  { name: 'Event Guide', category: 'Merch', predictedPrice: 15, range: { low: 10, high: 20 } }
];

export const MOCK_ALERTS = [
  { id: 1, type: 'warning', message: 'Heavy crowd surge at North Gate. Please use South Entrance.', timestamp: Date.now() - 300000 },
  { id: 2, type: 'info', message: 'Main Stage performance starting in 15 minutes.', timestamp: Date.now() - 600000 }
];
