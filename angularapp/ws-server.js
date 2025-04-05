const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const { v4: uuidv4 } = require('uuid'); // For unique IDs

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const avatars = [
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
  "https://avatars.githubusercontent.com/u/59228569",
  "https://avatars.githubusercontent.com/u/59442788"
];

let messages = []; // In-memory store

wss.on('connection', (ws) => {
  console.log('User connected');

  // Send all past messages
  ws.send(JSON.stringify({ type: 'INIT', messages }));

  ws.on('message', (message) => {
    console.log('Raw incoming message:', message);
    try {
      const data = JSON.parse(message);
      console.log('Received:', data);

      switch (data.type) {
        case 'SEND': {
          const newMessage = {
            id: uuidv4(),
            user: data.user,
            text: data.message,
            avatar: data.avatar || avatars[Math.floor(Math.random() * avatars.length)],
            timestamp: Date.now(),
          };
          messages.push(newMessage);
          broadcast({ type: 'NEW_MESSAGE', message: newMessage });
          break;
        }

        case 'EDIT':
          messages = messages.map((msg) =>
            msg.id === data.id ? { ...msg, text: data.newText } : msg
          );
          broadcast({
            type: 'EDIT_MESSAGE',
            id: data.id,
            newText: data.newText,
          });
          break;

        case 'DELETE':
          messages = messages.filter((msg) => msg.id !== data.id);
          broadcast({ type: 'DELETE_MESSAGE', id: data.id });
          break;

        case 'CLEAR_ALL':
          messages = [];
          broadcast({ type: 'CLEAR_ALL' });
          break;

        default:
          console.warn('Unknown type:', data.type);
      }
    } catch (error) {
      console.error('Message parse error:', error);
    }
  });

  ws.on('close', () => {
    console.log('User disconnected');
  });
});

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

server.listen(8000, () => {
  console.log('WebSocket server running on ws://localhost:8000');
});
