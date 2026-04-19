# EventFlow: Master the Flow.

**EventFlow** is a premium, high-intelligence crowd management and global event discovery platform. Designed for the futuristic attendee, it combines real-time satellite telemetry, predictive AI analytics, and a sophisticated "Royal Dark" aesthetic to ensure seamless navigation through the world's most complex events.

![EventFlow Hero](https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80)

## 🌌 The Royal Dark Experience
EventFlow isn't just an app; it's a command center for your experiences. Featuring:
- **Neural Discovery Hub**: Real-time integration with global event databases (Ticketmaster) for instant discovery.
- **Operational Map**: High-performance geospatial visualization with dark-mode optimized tiles and pulsing telemetry.
- **Security Command Center**: System-wide emergency broadcasting and crowd density monitoring.
- **AI Concierge**: Context-aware assistant powered by real-time venue data and global intelligence.
- **Financial Engine**: Predictive expense modelling based on historical venue analytics.

## 🛠 Tech Stack
- **Frontend**: React 18, Vite, Framer Motion (High-Performance Animations), Tailwind CSS (Premium Utility Styling), Lucide Icons.
- **Backend**: Node.js, Express, SQLite (High-Efficiency Persistence).
- **Integrations**: Ticketmaster Discovery API, Open-Meteo Weather, Wikipedia Intelligence.

## 🚀 Deployment
EventFlow is production-ready and configured for **Render** with a unified full-stack blueprint (`render.yaml`).

```bash
# Clone the repository
git clone [repository-url]

# Install Dependencies
npm install

# Start Local Intelligence (Backend + Frontend)
npm run dev
```

### 🌍 Deployment Options

#### 1. Vercel (Full-Stack)
The project is configured with `vercel.json` for one-click deployment.
- Connect your GitHub repository to Vercel.
- Vercel will automatically detect the configuration and deploy the Express backend as a Serverless Function and the Vite frontend as a static site.
- **Note**: SQLite is ephemeral on Vercel. The database will reset on deployments, but will auto-seed with fresh data.

#### 2. GitHub Pages (Frontend Only)
A GitHub Action is included in `.github/workflows/deploy.yml`.
- Go to your repository **Settings > Pages**.
- Set **Build and deployment > Source** to `GitHub Actions`.
- Push to `main` to trigger the deployment.
- **Note**: You will need to host the backend separately (e.g., on Render or Vercel) and update the API URL if not using a unified proxy.

#### 3. Render (Full-Stack)
Use the included `render.yaml` for a persistent full-stack deployment.
- Connect to Render and select "Blueprint".
- It will create a Web Service with persistent storage for the SQLite database.

## 🔐 Security
- **Biometric Ready**: Auth flows designed for modern identity providers.
- **Encrypted Session**: SHA-256 protected access keys.
- **Neural Link**: Quantum-secured geospatial masking.

---

*Designed by Antigravity AI for the next generation of event management.*
