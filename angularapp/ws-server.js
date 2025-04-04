const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Predefined list of avatars for demonstration purposes
const avatars = [
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
  "https://avatars.githubusercontent.com/u/59228569",
  "https://avatars.githubusercontent.com/u/59442788",
];

// Handle incoming WebSocket connections
wss.on('connection', (ws) => {
  console.log('A user connected');

  // Handle incoming messages from clients
  ws.on('message', (message) => {
    console.log('Received message:', message); // Log raw message received

    try {
      // Check if message is a Buffer, and convert it to string if it is
      const messageString = message instanceof Buffer ? message.toString() : message;

      // Parse the message string into an object
      const data = JSON.parse(messageString);

      // Select avatar based on the user's name (simple example)
      const avatarUrl = avatars[Math.floor(Math.random() * avatars.length)];

      // Broadcast the message to all connected clients along with the avatar URL
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          // Send the full message (including user, text, and avatar URL)
          client.send(JSON.stringify({
            user: data.user,
            message: data.message,
            avatar: avatarUrl,
          }));
        }
      });
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('A user disconnected');
  });
});

// Start the Express server and WebSocket server on port 8000
server.listen(8000, () => {
  console.log('WebSocket server running on ws://localhost:8000');
});
