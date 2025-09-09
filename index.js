const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch
const cors = require('cors');

const app = express();
app.use(cors()); // Permite requisições do frontend

const PORT = process.env.PORT || 3000;

// Configurações Pterodactyl
const PANEL_URL = 'https://backend.magmanode.com';
const SERVER_ID = 'a1f986de';
const API_KEY = 'ptlc_dRLWCxH30c28zGcGPtbccSRYG9QlXEqUVrMeNff1Znk';

// Endpoint que retorna dados do servidor + IP do cliente
app.get('/api/status', async (req, res) => {
  try {
    // Pega IP público do cliente
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Requisição para Pterodactyl
    const response = await fetch(`${PANEL_URL}/client/servers/${SERVER_ID}/resources`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'Application/json',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    res.json({
      server: data,
      ip: clientIp
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
