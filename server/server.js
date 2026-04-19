require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const crypto = require('crypto');
const axios = require('axios');
const app = express();
// Using 3006 to avoid EADDRINUSE
const PORT = process.env.PORT || 3006;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

let db;

// Initialize SQLite Database
async function initDb() {
  try {
    console.log('Connecting to database...');
    const dbPath = process.env.VERCEL ? path.join('/tmp', 'database.sqlite') : path.join(__dirname, 'database.sqlite');
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    console.log('Initializing tables...');
    
    // 1. Force Reset Events V2 (The most important part for the user)
    await db.exec('DROP TABLE IF EXISTS events_v2');
    await db.exec(`
      CREATE TABLE events_v2 (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        price REAL NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        location TEXT NOT NULL,
        image TEXT NOT NULL,
        source TEXT NOT NULL,
        source_url TEXT,
        lat REAL,
        lng REAL
      )
    `);

    await db.exec(`
      INSERT INTO events_v2 (title, type, price, date, time, location, image, source, source_url, lat, lng) VALUES 
      ('Margazhi Music & Dance Festival', 'Arts & Culture', 25.00, '2026-12-15', '17:00', 'The Music Academy, Chennai', 'https://images.unsplash.com/photo-1514525253361-bee8718a300c?w=800&q=80', 'Music Academy Official', 'https://musicacademymadras.in/', 13.0410, 80.2575),
      ('Chennai International Film Festival 2026', 'Arts & Culture', 10.00, '2026-12-18', '10:00', 'PVR Cinemas, Chennai', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80', 'CIFF Official', 'https://chennaifilmfest.com/', 13.0441, 80.2584),
      ('Great Indian Food Festival', 'Community Celebrations', 0.00, '2026-05-15', '12:00', 'Island Grounds, Chennai', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80', 'Chennai Tourism', 'https://www.tamilnadutourism.tn.gov.in/', 13.0789, 80.2831),
      ('Andhra Music & Arts Festival', 'Arts & Culture', 30.00, '2026-11-10', '18:00', 'Vizag, Andhra Pradesh', 'https://images.unsplash.com/photo-1514525253361-bee8718a300c?w=800&q=80', 'Andhra Tourism', 'https://www.tourism.ap.gov.in/', 17.6868, 83.2185),
      ('Madurai Chithirai Festival 2026', 'Arts & Culture', 0.00, '2026-04-28', '06:00', 'Meenakshi Temple, Madurai', 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80', 'Tamil Nadu Tourism', 'https://www.tamilnadutourism.tn.gov.in/', 9.9195, 78.1193),
      ('Kerala Boat Race & Carnival', 'Sports', 20.00, '2026-08-08', '14:00', 'Alappuzha, Kerala', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80', 'Kerala Tourism', 'https://www.keralatourism.org/', 9.4981, 76.3388),
      ('Kochi-Muziris Biennale 2026', 'Arts & Culture', 15.00, '2026-12-12', '10:00', 'Kochi, Kerala', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80', 'Biennale Foundation', 'https://www.kochimuzirisbiennale.org/', 9.9312, 76.2673),
      ('Paris Fashion Week (SS27)', 'Arts & Culture', 250.00, '2026-09-28', '10:00', 'Paris, France', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', 'FHCM.paris', 'https://www.fhcm.paris/en', 48.8566, 2.3522),
      ('Roland Garros 2026 Final', 'Sports', 145.00, '2026-06-07', '11:00', 'Paris, France', 'https://images.unsplash.com/photo-1542144557-f509c31811b2?w=800&q=80', 'RolandGarros.com', 'https://www.rolandgarros.com/', 48.8471, 2.2492),
      ('Tokyo Summer Sonic', 'Music Festival', 150.00, '2026-08-15', '10:00', 'Tokyo, Japan', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', 'SummerSonic.com', 'https://www.summersonic.com/', 35.6450, 140.0400),
      ('Cherry Blossom Festival (Late)', 'Community Celebrations', 0.00, '2026-04-25', '09:00', 'Tokyo, Japan', 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80', 'GoTokyo.jp', 'https://www.gotokyo.org/en/', 35.7148, 139.7732),
      ('New York Met Gala 2026', 'Arts & Culture', 35000.00, '2026-05-04', '18:00', 'New York, USA', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80', 'Vogue.com', 'https://www.vogue.com/tag/event/met-gala', 40.7794, -73.9632),
      ('US Open Tennis Final', 'Sports', 210.00, '2026-09-13', '16:00', 'New York, USA', 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=800&q=80', 'USOpen.org', 'https://www.usopen.org/', 40.7495, -73.8475),
      ('Mumbai International Jazz Festival', 'Music Festival', 45.00, '2026-11-20', '18:00', 'Gateway of India, Mumbai', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80', 'MumbaiJazz.in', 'https://mumbaijazzfestival.com/', 18.9220, 72.8347),
      ('Dubai Shopping Festival 2026', 'Community Celebrations', 0.00, '2026-12-15', '10:00', 'Dubai, UAE', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', 'VisitDubai.com', 'https://www.visitdubai.com/', 25.2048, 55.2708),
      ('Singapore Grand Prix 2026', 'Sports', 290.00, '2026-09-20', '20:00', 'Marina Bay, Singapore', 'https://images.unsplash.com/photo-1542332213-31f87348057f?w=800&q=80', 'SingaporeGP.sg', 'https://www.singaporegp.sg/', 1.2897, 103.8501),
      ('London Pride 2026', 'Community Celebrations', 0.00, '2026-07-04', '12:00', 'Trafalgar Square, London', 'https://images.unsplash.com/photo-1541344999736-83eca872977a?w=800&q=80', 'PrideInLondon.org', 'https://prideinlondon.org/', 51.5085, -0.1281),
      ('Sydney Vivid Lights', 'Arts & Culture', 0.00, '2026-05-22', '18:00', 'Circular Quay, Sydney', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80', 'VividSydney.com', 'https://www.vividsydney.com/', -33.8617, 151.2108),
      ('Berlin International Film Festival', 'Arts & Culture', 15.00, '2026-02-12', '09:00', 'Berlinale Palast, Berlin', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80', 'Berlinale.de', 'https://www.berlinale.de/en/home.html', 52.5074, 13.3734),
      ('FIFA World Cup 2026 - Opening', 'Sports', 450.00, '2026-06-11', '18:00', 'Mexico City, Mexico', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80', 'FIFA.com Official', 'https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/canadamexicousa2026', 19.4326, -99.1332),
      ('Wimbledon Championships Final', 'Sports', 180.00, '2026-07-12', '14:00', 'London, UK', 'https://images.unsplash.com/photo-1622279457486-62dcc4a4bd13?w=800&q=80', 'Wimbledon.com Official', 'https://www.wimbledon.com/', 51.4343, -0.2145),
      ('Bangalore Tech & Startup Expo 2026', 'Conferences & Summits', 50.00, '2026-10-15', '09:00', 'BIEC, Bangalore', 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80', 'Bangalore Startup Council', 'https://bangaloreexpo.com/', 12.9716, 77.5946),
      ('Delhi International Food Carnival', 'Community Celebrations', 0.00, '2026-11-05', '12:00', 'Jawaharlal Nehru Stadium, Delhi', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80', 'Delhi Tourism', 'https://www.delhitourism.gov.in/', 28.6139, 77.2090),
      ('Hyderabad Global AI Summit', 'Conferences & Summits', 120.00, '2026-09-18', '10:00', 'HICC, Hyderabad', 'https://images.unsplash.com/photo-1475721027185-404ece7741ec?w=800&q=80', 'Telangana IT Dept', 'https://www.telangana.gov.in/', 17.3850, 78.4867),
      ('Glastonbury Festival 2026', 'Music Festival', 355.00, '2026-06-24', '10:00', 'Somerset, UK', 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=800&q=80', 'GlastonburyFestivals.co.uk', 'https://www.glastonburyfestivals.co.uk/', 51.1551, -2.5855)

    `);

    console.log('Events V2 Ready.');

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        avatar TEXT
      );

      CREATE TABLE IF NOT EXISTS zones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        density INTEGER NOT NULL,
        status TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS alerts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        type TEXT NOT NULL,
        location TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS sales_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        sale_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Fix avatar column if missing
    const userInfo = await db.all("PRAGMA table_info(users)");
    if (!userInfo.some(c => c.name === 'avatar')) {
      await db.exec("ALTER TABLE users ADD COLUMN avatar TEXT");
    }

    const alertsInfo = await db.all("PRAGMA table_info(alerts)");
    if (!alertsInfo.some(c => c.name === 'location')) {
      await db.exec("ALTER TABLE alerts ADD COLUMN location TEXT DEFAULT 'Venue Wide'");
    }

    console.log('Core tables verified.');

    // Seed data if empty
    const zonesCount = await db.get('SELECT COUNT(*) as count FROM zones');
    if (zonesCount.count === 0) {
      await db.exec(`
        INSERT INTO zones (name, density, status) VALUES 
        ('Main Stage', 85, 'High'),
        ('Food Court A', 45, 'Medium'),
        ('North Gate', 15, 'Low'),
        ('VIP Lounge', 30, 'Low')
      `);
    }

    const alertsCount = await db.get('SELECT COUNT(*) as count FROM alerts');
    if (alertsCount.count === 0) {
      await db.exec(`
        INSERT INTO alerts (title, message, type, location) VALUES 
        ('Crowd Surge Warning', 'High density detected near Main Stage. Use North Gate for exit.', 'critical', 'Main Stage'),
        ('Parking Lot Full', 'South parking reached 100% capacity. Redirecting to East Lot.', 'warning', 'South Parking'),
        ('Weather Update', 'Partly cloudy. Perfect conditions for the event.', 'info', 'Venue Wide')
      `);
    }

    console.log('Database initialization complete.');
  } catch (err) {
    console.error('CRITICAL: Database initialization failed!', err);
    throw err;
  }
}

initDb().catch(err => {
  console.error('Failed to initialize database', err);
});

// --- AUTH API ---
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
  
  // Basic hash for demo purposes
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  
  try {
    await db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash]);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  
  const user = await db.get('SELECT id, name, email FROM users WHERE email = ? AND password = ?', [email, hash]);
  if (user) {
    // Generate simple token for demo
    const token = Buffer.from(`${user.id}-${Date.now()}`).toString('base64');
    res.json({ token, user });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// --- ZONES API ---
// Unified zones API below

// --- AI CHAT API ---
// Redundant /api/chat removed. Using unified implementation below.

// --- EVENT DISCOVERY HUB (Real-World Data Integration) ---
app.get('/api/discover', async (req, res) => {
  const { city } = req.query;
  // Make city optional for global discovery
  const TM_API_KEY = process.env.TICKETMASTER_API_KEY || 'RQirjGj2h50kPZ4N94P3uX323Z1M3H6C';
  
  console.log(`Discovery: Fetching ${city ? `events for ${city}` : 'global trending events'} via Ticketmaster...`);
  
  try {
    const params = {
      apikey: TM_API_KEY,
      size: city ? 8 : 20,
      sort: 'relevance,desc'
    };
    if (city) params.city = city;

    const tmRes = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json`, { params });

    let publicEvents = [];

    if (tmRes.data && tmRes.data._embedded && tmRes.data._embedded.events) {
      publicEvents = tmRes.data._embedded.events.map(event => ({
        id: `tm-${event.id}`,
        title: event.name,
        type: event.classifications?.[0]?.segment?.name || 'Other',
        price: event.priceRanges?.[0]?.min || Math.floor(Math.random() * 50) + 20,
        date: event.dates.start.localDate,
        time: event.dates.start.localTime || '19:00',
        location: `${event._embedded?.venues?.[0]?.name || 'Venue'}, ${event._embedded?.venues?.[0]?.city?.name || city || 'International'}`,
        image: event.images?.sort((a, b) => b.width - a.width)[0]?.url || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
        source: 'Ticketmaster Live',
        source_url: event.url,
        lat: parseFloat(event._embedded?.venues?.[0]?.location?.latitude) || 0,
        lng: parseFloat(event._embedded?.venues?.[0]?.location?.longitude) || 0
      }));
    } else {
      console.log(`No results for ${city || 'Global'}. Falling back to Smart Simulation...`);
      const genres = ['Music Festival', 'Sports', 'Arts & Culture', 'Conferences & Summits'];
      const targetCity = city || 'International';
      
      publicEvents = Array.from({ length: 10 }).map((_, i) => ({
        id: `sim-${targetCity}-${i}`,
        title: `${targetCity} ${['Summer', 'International', 'Global', 'Elite'][i % 4]} ${['Expo', 'Showcase', 'Summit', 'Gala'][i % 4]}`,
        type: genres[i % genres.length],
        price: Math.floor(Math.random() * 100) + 25,
        date: new Date(Date.now() + (i + 1) * 86400000 * 5).toISOString().split('T')[0],
        time: '18:00',
        location: `Central Arena, ${targetCity}`,
        image: `https://images.unsplash.com/photo-${1501281668745 + i}-f7f57925c3b4?w=800&q=80`,
        source: 'AI Predictive Discovery',
        source_url: '#',
        lat: 0,
        lng: 0
      }));
    }

    for (const e of publicEvents) {
      await db.run(
        'INSERT OR IGNORE INTO events_v2 (title, type, price, date, time, location, image, source, source_url, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [e.title, e.type, e.price, e.date, e.time, e.location, e.image, e.source, e.source_url || '#', e.lat, e.lng]
      );
    }
    res.json(publicEvents);
  } catch (err) {
    console.error(`Discovery Error:`, err.message);
    res.status(500).json({ error: 'Global discovery hub is temporarily unavailable.' });
  }
});

// --- ALERTS API ---
app.get('/api/alerts', async (req, res) => {
  try {
    const alerts = await db.all('SELECT * FROM alerts ORDER BY timestamp DESC');
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ZONES API ---
app.get('/api/zones', async (req, res) => {
  try {
    const zones = await db.all('SELECT * FROM zones');
    res.json(zones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- CHAT API (AI CONCIERGE - Universal Keyless Intelligence) ---
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log(`CHAT REQUEST: "${message}"`);
  const msgLower = message ? message.toLowerCase() : "";
  
  try {
    const [events, zones] = await Promise.all([
      db.all('SELECT * FROM events_v2 ORDER BY date ASC LIMIT 5'),
      db.all('SELECT * FROM zones')
    ]);

    let reply = "";

    // 1. Check for Event-Specific Context
    if (msgLower.includes('event') || msgLower.includes('happen') || msgLower.includes('show')) {
      const titles = events.map(e => `**${e.title}** (${e.location})`).join(', ');
      reply = `Based on my real-time schedule, we have some incredible experiences coming up, including ${titles}. Would you like me to help you book a ticket for any of these?`;
    } 
    // 2. Check for Crowd/Safety Context
    else if (msgLower.includes('crowd') || msgLower.includes('density') || msgLower.includes('safe') || msgLower.includes('busy')) {
      const highZones = zones.filter(z => z.density > 70);
      if (highZones.length > 0) {
        reply = `I'm currently monitoring high crowd density in **${highZones.map(z => z.name).join(' and ')}**. For your safety and comfort, I recommend heading towards the ${zones.find(z => z.density < 40)?.name || 'North Plaza'} which is much clearer right now.`;
      } else {
        reply = "Current telemetry shows safe crowd levels across all zones. You can navigate the venue freely and comfortably!";
      }
    }
    // 3. General Knowledge / Fallback
    else {
      try {
        const words = msgLower.split(' ').filter(w => w.length > 3);
        const subject = words.length > 0 ? words[words.length - 1] : "Events";
        const formattedSubject = subject.charAt(0).toUpperCase() + subject.slice(1);

        const wikiRes = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(formattedSubject)}`);
        if (wikiRes.status === 200 && wikiRes.data.extract) {
          reply = `Interesting query! Regarding **${formattedSubject}**: ${wikiRes.data.extract} \n\nHow can I help you integrate this with your current event logistics?`;
        } else {
          reply = "I'm analyzing your request. My systems are optimized for real-time venue navigation, safety protocols, and global discovery. Could you specify an event or city you'd like me to investigate?";
        }
      } catch (err) {
        reply = "I'm currently processing your request. As your AI Concierge, I can assist with route optimization, crowd safety, and event discovery. What would you like to explore next?";
      }
    }

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'Concierge is processing a large amount of data. Please try again.' });
  }
});

// --- EXPENSES API ---
app.get('/api/expenses', async (req, res) => {
  const { eventId } = req.query;
  try {
    const history = await db.all('SELECT item_name, category, AVG(price) as avg_price, MIN(price) as min_price, MAX(price) as max_price FROM sales_history GROUP BY item_name');
    
    let multiplier = 1.0;
    if (eventId) {
      const event = await db.get('SELECT type FROM events WHERE id = ?', [eventId]);
      if (event) {
        if (event.type === 'Festival') multiplier = 1.25; // 25% markup for festivals
        else if (event.type === 'Sports') multiplier = 1.15; // 15% markup for sports
        else if (event.type === 'Speech') multiplier = 0.90; // 10% discount for educational
      }
    }

    const predictions = history.map(item => {
      const fluctuation = (Math.random() * 2) - 1; 
      const basePrice = item.avg_price * multiplier;
      const predicted = Math.max(item.min_price * 0.8, Math.min(item.max_price * 1.5, basePrice + fluctuation));
      
      return {
        name: item.item_name,
        category: item.category,
        predictedPrice: parseFloat(predicted.toFixed(2)),
        range: {
          low: parseFloat((item.min_price * multiplier * 0.9).toFixed(2)),
          high: parseFloat((item.max_price * multiplier * 1.1).toFixed(2))
        }
      };
    });
    
    res.json(predictions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- PROFILE API ---
app.get('/api/profile', async (req, res) => {
  try {
    const user = await db.get('SELECT id, name, email FROM users LIMIT 1');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/profile', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    await db.run('UPDATE users SET name = ?, email = ? WHERE id = (SELECT id FROM users LIMIT 1)', [name, email]);
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/profile/password', async (req, res) => {
  const { newPassword } = req.body;
  try {
    await db.run('UPDATE users SET password = ? WHERE id = (SELECT id FROM users LIMIT 1)', [newPassword]);
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/profile/avatar', async (req, res) => {
  const { avatar } = req.body;
  try {
    await db.run('UPDATE users SET avatar = ? WHERE id = (SELECT id FROM users LIMIT 1)', [avatar]);
    res.json({ message: 'Avatar updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- WEATHER API (Secure Free Resource: Open-Meteo) ---
app.get('/api/weather', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'Lat and Lng required' });
  
  try {
    const weatherRes = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=auto`);
    res.json(weatherRes.data);
  } catch (err) {
    res.status(500).json({ error: 'Weather service unavailable' });
  }
});

// --- EVENTS API ---
app.get('/api/events', async (req, res) => {
  const { location } = req.query;
  try {
    let query = 'SELECT * FROM events_v2 WHERE date >= date(\'now\')';
    let params = [];
    if (location) {
      query += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }
    const events = await db.all(query, params);
    console.log(`API FETCH: Found ${events.length} events for location: ${location || 'ALL'}`);
    res.json(events);
  } catch (err) {
    console.error("API ERROR /api/events:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/alerts', async (req, res) => {
  const { title, message, type, location } = req.body;
  if (!title || !message || !type || !location) return res.status(400).json({ error: 'Missing fields' });
  try {
    const result = await db.run('INSERT INTO alerts (title, message, type, location) VALUES (?, ?, ?, ?)', [title, message, type, location]);
    const newAlert = await db.get('SELECT * FROM alerts WHERE id = ?', result.lastID);
    res.status(201).json(newAlert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Backend Server successfully running on http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is in use. Try killing the old node process or change the port.`);
    process.exit(1);
  }
});

module.exports = app;
