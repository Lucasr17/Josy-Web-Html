// Stockage : Redis (Upstash, via l'intégration Vercel) ou fichier JSON en local.
const fs = require('fs');
const os = require('os');
const path = require('path');

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(cmd) {
  const r = await fetch(URL_, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}

// ---- Fallback fichier (dev local uniquement) ----
const FILE = path.join(os.tmpdir(), 'starac-dev-db.json');
function readDb() {
  try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; }
}
function writeDb(db) { fs.writeFileSync(FILE, JSON.stringify(db)); }

const local = {
  async get(k) { const v = readDb()[k]; return v === undefined ? null : v; },
  async set(k, v) { const db = readDb(); db[k] = v; writeDb(db); },
  async hgetall(k) { return readDb()[k] || {}; },
  async hset(k, f, v) { const db = readDb(); (db[k] = db[k] || {})[f] = v; writeDb(db); },
  async hdel(k, f) { const db = readDb(); if (db[k]) delete db[k][f]; writeDb(db); },
  async smembers(k) { return readDb()[k] || []; },
  async sadd(k, m) { const db = readDb(); const s = new Set(db[k] || []); s.add(m); db[k] = [...s]; writeDb(db); },
};

const remote = {
  async get(k) { return redis(['GET', k]); },
  async set(k, v) { return redis(['SET', k, v]); },
  async hgetall(k) {
    const flat = (await redis(['HGETALL', k])) || [];
    const o = {};
    for (let i = 0; i < flat.length; i += 2) o[flat[i]] = flat[i + 1];
    return o;
  },
  async hset(k, f, v) { return redis(['HSET', k, f, v]); },
  async hdel(k, f) { return redis(['HDEL', k, f]); },
  async smembers(k) { return (await redis(['SMEMBERS', k])) || []; },
  async sadd(k, m) { return redis(['SADD', k, m]); },
};

const raw = URL_ && TOKEN ? remote : local;
const persistent = Boolean(URL_ && TOKEN);

// Helpers JSON
const store = {
  persistent,
  async getJSON(k) { const v = await raw.get(k); return v ? JSON.parse(v) : null; },
  async setJSON(k, v) { return raw.set(k, JSON.stringify(v)); },
  async hgetallJSON(k) {
    const h = await raw.hgetall(k);
    const o = {};
    for (const f of Object.keys(h)) o[f] = JSON.parse(h[f]);
    return o;
  },
  async hsetJSON(k, f, v) { return raw.hset(k, f, JSON.stringify(v)); },
  hdel: (k, f) => raw.hdel(k, f),
  smembers: (k) => raw.smembers(k),
  sadd: (k, m) => raw.sadd(k, m),
};

module.exports = store;
