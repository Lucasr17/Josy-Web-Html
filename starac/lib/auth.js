const crypto = require('crypto');

const SECRET = process.env.SESSION_SECRET || 'dev-secret-change-me';
const MAX_AGE = 60 * 60 * 24 * 90; // 90 jours

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { salt, hash };
}

function verifyPassword(password, salt, hash) {
  const test = crypto.scryptSync(password, salt, 64);
  const ref = Buffer.from(hash, 'hex');
  return test.length === ref.length && crypto.timingSafeEqual(test, ref);
}

const sign = (data) => crypto.createHmac('sha256', SECRET).update(data).digest('base64url');

function makeToken(username) {
  const payload = Buffer.from(JSON.stringify({ u: username, e: Date.now() + MAX_AGE * 1000 })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function readToken(token) {
  if (!token || !token.includes('.')) return null;
  const [payload, sig] = token.split('.');
  const good = sign(payload);
  if (sig.length !== good.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good))) return null;
  try {
    const { u, e } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return e > Date.now() ? u : null;
  } catch { return null; }
}

function parseCookies(req) {
  const out = {};
  for (const part of (req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function sessionCookie(token) {
  const secure = process.env.VERCEL || process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `starac_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${token ? MAX_AGE : 0}${secure}`;
}

const currentUser = (req) => readToken(parseCookies(req).starac_session);

module.exports = { hashPassword, verifyPassword, makeToken, sessionCookie, currentUser };
