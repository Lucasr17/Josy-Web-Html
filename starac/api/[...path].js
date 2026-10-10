const store = require('../lib/store');
const auth = require('../lib/auth');

const K = {
  user: (u) => `starac:user:${u}`,
  users: 'starac:users',
  cands: 'starac:candidates',
  primes: 'starac:primes',
  adjs: 'starac:adjectives',
  ratings: (p) => `starac:ratings:${p}`,
};

const clamp15 = (n) => {
  n = Math.round(Number(n));
  return n >= 1 && n <= 5 ? n : 0;
};
const str = (s, max) => String(s ?? '').trim().slice(0, max);
const id = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
const userKey = (name) => name.toLowerCase();

class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

module.exports = async (req, res) => {
  const send = (status, body) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify(body));
  };

  try {
    const seg = [].concat(req.query.path || []);
    const method = req.method;
    const body = req.body && typeof req.body === 'object' ? req.body : {};
    const route = seg[0];

    // ---------- Auth ----------
    if (route === 'auth') {
      if (seg[1] === 'logout') {
        res.setHeader('Set-Cookie', auth.sessionCookie(''));
        return send(200, { ok: true });
      }
      const name = str(body.username, 24);
      const password = String(body.password || '');
      if (!/^[\p{L}\p{N}_. -]{2,24}$/u.test(name)) throw new HttpError(400, 'Pseudo invalide (2 à 24 caractères).');
      if (password.length < 6) throw new HttpError(400, 'Mot de passe trop court (6 caractères min).');

      if (seg[1] === 'register' && method === 'POST') {
        if (process.env.INVITE_CODE && str(body.code, 64) !== process.env.INVITE_CODE) {
          throw new HttpError(403, "Code d'invitation incorrect.");
        }
        if (await store.getJSON(K.user(userKey(name)))) throw new HttpError(409, 'Ce pseudo existe déjà.');
        const { salt, hash } = auth.hashPassword(password);
        await store.setJSON(K.user(userKey(name)), { name, salt, hash, createdAt: Date.now() });
        await store.sadd(K.users, name);
        res.setHeader('Set-Cookie', auth.sessionCookie(auth.makeToken(userKey(name))));
        return send(200, { me: name });
      }
      if (seg[1] === 'login' && method === 'POST') {
        const u = await store.getJSON(K.user(userKey(name)));
        if (!u || !auth.verifyPassword(password, u.salt, u.hash)) throw new HttpError(401, 'Pseudo ou mot de passe incorrect.');
        res.setHeader('Set-Cookie', auth.sessionCookie(auth.makeToken(userKey(name))));
        return send(200, { me: u.name });
      }
      throw new HttpError(404, 'Introuvable');
    }

    // ---------- Tout le reste nécessite une session ----------
    const uid = auth.currentUser(req);
    const meRec = uid ? await store.getJSON(K.user(uid)) : null;
    if (!meRec) throw new HttpError(401, 'Non connecté');
    const me = meRec.name;

    if (route === 'bootstrap' && method === 'GET') {
      const [cands, primes, adjs, users] = await Promise.all([
        store.hgetallJSON(K.cands), store.hgetallJSON(K.primes), store.smembers(K.adjs), store.smembers(K.users),
      ]);
      return send(200, {
        me,
        persistent: store.persistent,
        candidates: Object.values(cands).sort((a, b) => a.name.localeCompare(b.name, 'fr')),
        primes: Object.values(primes).sort((a, b) => (a.date || '').localeCompare(b.date || '') || a.order - b.order),
        adjectives: adjs,
        users,
      });
    }

    if (route === 'candidates') {
      if (method === 'PUT') {
        const c = {
          id: seg[1] || id(),
          name: str(body.name, 60),
          age: body.age === '' || body.age == null ? null : Math.max(0, Math.min(99, Math.round(Number(body.age)) || 0)),
          city: str(body.city, 80),
          sex: ['F', 'M', 'X'].includes(body.sex) ? body.sex : '',
          photo: typeof body.photo === 'string' && body.photo.startsWith('data:image/') && body.photo.length < 200000 ? body.photo : '',
          eliminated: Boolean(body.eliminated),
        };
        if (!c.name) throw new HttpError(400, 'Le nom est obligatoire.');
        await store.hsetJSON(K.cands, c.id, c);
        return send(200, c);
      }
      if (method === 'DELETE' && seg[1]) {
        await store.hdel(K.cands, seg[1]);
        return send(200, { ok: true });
      }
    }

    if (route === 'primes') {
      if (method === 'PUT') {
        const existing = seg[1] ? (await store.hgetallJSON(K.primes))[seg[1]] : null;
        const p = {
          id: seg[1] || id(),
          title: str(body.title, 60) || 'Prime',
          date: /^\d{4}-\d{2}-\d{2}$/.test(body.date) ? body.date : '',
          time: /^\d{2}:\d{2}$/.test(body.time) ? body.time : '20:00',
          ended: Boolean(body.ended),
          order: Number.isFinite(Number(body.order)) ? Number(body.order) : (existing ? existing.order : 0),
        };
        await store.hsetJSON(K.primes, p.id, p);
        return send(200, p);
      }
      if (method === 'DELETE' && seg[1]) {
        await store.hdel(K.primes, seg[1]);
        return send(200, { ok: true });
      }
    }

    if (route === 'ratings' && seg[1]) {
      const primeId = seg[1];
      if (method === 'GET') {
        const all = await store.hgetallJSON(K.ratings(primeId));
        const prime = (await store.hgetallJSON(K.primes))[primeId];
        const reveal = Boolean(prime && prime.ended);
        const out = Object.values(all).filter((r) => reveal || r.user === me);
        return send(200, { reveal, ratings: out });
      }
      if (method === 'PUT' && seg[2]) {
        const r = {
          user: me,
          candidate: seg[2],
          stars: clamp15(body.stars),
          voice: clamp15(body.voice),
          dance: clamp15(body.dance),
          presence: clamp15(body.presence),
          note: str(body.note, 600),
          adjectives: [...new Set((body.adjectives || []).map((a) => str(a, 30)).filter(Boolean))].slice(0, 12),
          updatedAt: Date.now(),
        };
        await store.hsetJSON(K.ratings(primeId), `${userKey(me)}:${seg[2]}`, r);
        return send(200, r);
      }
    }

    if (route === 'adjectives' && method === 'POST') {
      const word = str(body.word, 30).toLowerCase();
      if (!word) throw new HttpError(400, 'Mot vide');
      await store.sadd(K.adjs, word);
      return send(200, { word });
    }

    throw new HttpError(404, 'Introuvable');
  } catch (e) {
    if (e instanceof HttpError) return send(e.status, { error: e.message });
    console.error(e);
    return send(500, { error: 'Erreur serveur' });
  }
};
