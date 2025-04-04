const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Handle incoming WebSocket connections
wss.on('connection', (ws) => {
  console.log('A user connected');

  // Broadcast the message to all clients
  ws.on('message', (message) => {
    console.log('Received message:', message); // Log message received
    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('A user disconnected');
  });
});

// Start the Express server and WebSocket server on port 8000
server.listen(8000, () => {
  console.log('WebSocket server running on ws://localhost:8000');
});
