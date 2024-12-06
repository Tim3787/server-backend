require('dotenv').config();
const express = require('express');
const app = express();
// Leggi le variabili d'ambiente
const PORT = process.env.PORT || 3000; // Usa la porta dal file .env o 3000 di default
const DATABASE_URL = process.env.DATABASE_URL;
const helmet = require('helmet');


// Middleware per CORS (per permettere al frontend di accedere alle API)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permetti richieste da qualsiasi origine
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Endpoint API
const rugbyDayEndDate = new Date('2024-12-08T23:59:59');
app.get('/api/rugbyDayEnd', (req, res) => {
  res.json({ endDate: rugbyDayEndDate }); // Restituisce la data come JSON
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('API Backend is running!');
});

// Usa Helmet per configurare la CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // Permetti risorse dalla stessa origine
        scriptSrc: ["'self'", "'unsafe-inline'"], // Permetti script inline (se necessario)
        workerSrc: ["'self'", "blob:"], // Permetti workers
      },
    },
  })
);