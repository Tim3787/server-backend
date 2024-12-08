require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const WebSocket = require('ws');

// Leggi le variabili d'ambiente
const PORT = process.env.PORT || 3000;

// Crea l'app Express
const app = express();

// Usa Helmet per configurare la CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "https:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https:"],
        workerSrc: ["'self'", "blob:"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);

// Middleware per CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Data dinamica di inizio evento
const rugbyDayStartDate = new Date('2024-12-08T06:00:00'); // Data di inizio evento anno-mese-giornoTore:minuti:secondi (mettere 1 ora in meno)

app.get('/api/rugbyDayEnd', (req, res) => {
  // Calcola la data di fine aggiungendo 24 ore alla data di inizio
  const rugbyDayEndDate = new Date(rugbyDayStartDate.getTime() + 24 * 60 * 60 * 1000);
  res.json({
    startDate: rugbyDayStartDate.toISOString(),
    endDate: rugbyDayEndDate.toISOString(),
  });
});

// Crea il server HTTP
const server = http.createServer(app);

// Crea il server WebSocket utilizzando il server HTTP
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    console.log('Received:', message);
    ws.send('Hello from server');
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Avvia il server HTTP e WebSocket sulla stessa porta
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
