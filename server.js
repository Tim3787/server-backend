require('dotenv').config();
const express = require('express');
const app = express();
// Leggi le variabili d'ambiente
const PORT = process.env.PORT || 3000; 
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
        defaultSrc: ["'self'", "https:"], // Permetti risorse dalla stessa origine e HTTPS
        scriptSrc: ["'self'", "'unsafe-inline'", "https:"], // Aggiungi domini di script sicuri
        workerSrc: ["'self'", "blob:"], // Permetti blob workers
        imgSrc: ["'self'", "data:", "https:"], // Permetti immagini inline e da HTTPS
      },
    },
  })
);
