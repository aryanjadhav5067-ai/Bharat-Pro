// server.js - Node/Express Proxy Server for NewsAPI
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

const NEWSAPI_KEY = 'fb89d85615bf4b55a481da5a59575047';

const categories = {
  trading: 'business',
  technology: 'technology',
  science: 'science'
};

function buildNewsUrl(cat) {
  return `https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=${NEWSAPI_KEY}&pageSize=5`;
}

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// News endpoints, ex: /api/news/trading
app.get('/api/news/:topic', async (req, res) => {
  const cat = categories[req.params.topic];
  if (!cat) return res.status(400).json({ error: 'Invalid category' });
  try {
    const apiRes = await fetch(buildNewsUrl(cat));
    const data = await apiRes.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'NewsAPI fetch error' });
  }
});

// Dashboard summary: get top 2 from each
app.get('/api/news/dashboard', async (req, res) => {
  try {
    const results = {};
    for (const [k, v] of Object.entries(categories)) {
      const apiRes = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${v}&apiKey=${NEWSAPI_KEY}&pageSize=2`);
      const data = await apiRes.json();
      results[k] = data.articles || [];
    }
    res.json(results);
  } catch (e) {
    res.status(500).json({ error: 'Dashboard fetch error' });
  }
});

// Currency endpoint (no API key needed, for INR rates)
app.get('/api/currency', async (req, res) => {
  try {
    const apiRes = await fetch('https://api.exchangerate.host/latest?base=INR&symbols=USD,EUR,JPY,GBP,BTC');
    const data = await apiRes.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Currency fetch error' });
  }
});

// Fallback: index.html (for SPA)
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

app.listen(3000, () => 
  console.log('FuturesAI server running http://localhost:3000')
);
