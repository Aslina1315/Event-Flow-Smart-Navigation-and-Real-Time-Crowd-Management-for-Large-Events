# EventFlow – Smart Crowd Management & Event Planning System

## Vertical

Smart Cities and Public Safety

## Live Application

https://eventflow-53196192067.asia-south1.run.app/

## Repository

[(Add your GitHub repository link here)](https://github.com/Aslina1315/Event-Flow-Smart-Navigation-and-Real-Time-Crowd-Management-for-Large-Events)


## Problem Statement

Managing large crowds during events such as concerts, sports matches, and public gatherings is a challenging task due to:

- High crowd density and congestion  
- Difficulty in navigation within event spaces  
- Lack of real-time alerts and guidance  
- Inefficient planning of resources such as food and entry points  

These challenges impact both **user experience and safety**.


## Solution Overview

EventFlow is a web-based application designed to provide an integrated platform for:

- Crowd awareness and visualization  
- Event navigation  
- Alert-based safety systems  
- Event planning support  

The application is built as a **functional frontend system with working features**, designed to simulate and represent a real-world crowd management solution.


## Approach and Logic

The system follows a modular and component-based frontend architecture.

- OpenStreetMap (Leaflet) is used for real-world map visualization  
- Crowd levels and alerts are dynamically simulated to represent real-time behavior  
- UI components are interconnected to mimic a full system workflow  
- The structure is designed to support backend integration and scalability  

The application demonstrates how a **full-stack system would behave**, even though backend connectivity is partially implemented.


## How the Solution Works

### Dashboard
Provides a centralized view of crowd conditions, alerts, and system insights.

### Map System
Displays event locations and crowd zones using real map data. Visual elements help users understand crowd density and navigation paths.

### Alert System
Shows alerts with priority levels (critical, medium, low) to indicate crowd situations and risks.

### Notification System
Displays alerts and updates through a notification interface.

### Chat Interface
Provides a conversational UI representing an assistant to guide users.

### Budget Planner
Allows users to estimate event expenses based on:
- Number of people  
- Food selection  

Displays:
- Minimum cost  
- Maximum cost  
- Average cost  

### Food Price Predictor
Simulates pricing variations based on demand and crowd size, helping in better planning.

### Payment Interface
Provides a simulated payment experience with:
- Input validation  
- Payment summary  
- Confirmation flow  

### Profile Management
Allows users to view and update profile details.

### Settings Panel
Provides user customization options such as:
- Theme preferences  
- Notification settings  

### Analytics Dashboard
Displays insights such as:
- Crowd trends  
- Event statistics  
- Planning data  


## Features Implemented

- Interactive dashboard  
- Map-based visualization (OpenStreetMap)  
- Alert system with priority levels  
- Notification system  
- Chat interface  
- Budget planner (UI + logic)  
- Food price predictor (simulated)  
- Payment interface (UI-based)  
- Profile management (UI-based)  
- Settings panel  
- Analytics dashboard  
- Responsive and animated UI  
- Simulated real-time system behavior  


## Features Requiring Further Integration

The following features are implemented at the UI/logic level but require backend or real data integration:

- Real-time crowd data updates  
- Live API-based event data  
- Persistent user data (profile, settings)  
- Payment gateway integration  
- AI-based prediction models  



## Assumptions Made

- Crowd data is simulated and not sourced from real-time APIs  
- Alerts are generated using predefined logic  
- Payment system is UI-based and not connected to real transactions  
- Profile and settings data are not persistently stored  
- Real-time behavior is simulated for demonstration purposes


## Tech Stack

Frontend:
- React (Vite)  
- Tailwind CSS  
- Framer Motion  

Map Integration:
- OpenStreetMap (Leaflet)  

Backend (Partially Structured):
- Node.js  
- Express.js  
- SQLite  


## Deployment

The frontend application has been successfully deployed using Google Cloud after resolving multiple build and deployment issues.

Live Application:
https://eventflow-53196192067.asia-south1.run.app/


## Development Experience

This project was developed as part of Virtual Prompt Wars using the Antigravity AI tool.

While AI significantly helped in generating structure and components, building a working system required:

- Continuous prompt refinement  
- Debugging multiple errors during development and deployment  
- Handling routing and build issues  
- Structuring components and features manually  

Developing a fully functional frontend within a limited time was challenging, but it resulted in a working prototype with multiple integrated features.


## Project Insight

The idea behind EventFlow exists across different platforms in separate forms, but this project aims to combine them into a **single unified system**.

The features are designed based on **real-world problems**, focusing on improving crowd safety and event planning.


## Conclusion

EventFlow is a **feature-rich frontend implementation** with a clear roadmap toward becoming a fully integrated full-stack system.

It demonstrates:

- Strong understanding of the problem  
- Practical implementation of features  
- A scalable system design  

This project serves as a solid foundation for developing a real-time intelligent crowd management platform.
