# SBSC Workspace - Collaborative workspace for team collaboration

### Images
![Join community](/product-images/1.png)
![Collabrate](/product-images/2.png)

## Project Overview
This collaborative real-time editing platform enables seamless team collaboration. The project leverages a monorepo architecture using Nx workspace, featuring React frontend implementations and server implementaion in Node.js.

## Key Features
- Real-time collaborative editing
- Cross-platform support (Angular and React)
- Responsive and intuitive user interface
- Robust backend infrastructure

## Technologies Used
- Frontend: 
  - Angular
  - React
- Backend: Node.js
- Real-time Communication: WebSockets
- Monorepo Management: Nx Workspace

## Prerequisites
- Node.js (v18 or later)
- npm (v9 or later)
- Git

## Project Structure
```
sbsc-workspace/
│
├── angularapp/         # Angular application
│   └── ws-server/      # WebSocket server
├── reactapp/           # React application
├── angularapp-e2e/     # End-to-end tests for Angular app
├── reactapp-e2e/       # End-to-end tests for React app
```

## Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ehiremengold/sbsc-workspace.git
cd sbsc-workspace
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Servers

#### Angular Application
```bash
npx nx serve angularapp
```

#### React Application
```bash
npx nx serve reactapp
```

#### WebSocket Server
```bash
cd angularapp/ws-server
node ws-server.js
```

