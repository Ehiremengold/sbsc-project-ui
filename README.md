# SBSC Workspace - Collaborative workspace for team collaboration

### Images

![Join community](/product-images/1.png)
![Collaborate](/product-images/2.png)

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

## Features

- "User Registration" & Avatar Assignment
- WebSocket Real-time Messaging
  - Real-time chat is powered by WebSocket for instant message updates between users.
  - Users can send, edit, delete, and clear messages using WebSocket communication.
- Framer Motion is used to provide smooth entrance and transition animations.

## Project Structure

```
sbsc-workspace/
│
├── angularapp/         # Angular application
│   └── ws-server/ws-server.js      # WebSocket server
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

## For Testing Purpose

- For Local testing it is advisable to switch the "Env" variable to "Dev" in reactapp/src/pages/Collaboration.tsx. This with the fact that the node server is running

- For Production testing, user may experience a slight delay and have to reload page. Reason been where the server is deployed (Render - free tier).
