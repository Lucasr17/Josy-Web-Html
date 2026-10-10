(() => {
'use strict';

// Fonctionne sur lucasriche.com/starac/ (API sous /starac/api) comme à la racine d'un projet Vercel (/api)
const API = location.pathname.startsWith('/starac') ? '/starac/api' : '/api';
const PRESET_ADJ = ['talentueux', 'charismatique', 'émouvant', 'juste', 'puissant', 'énergique', 'élégant', 'naturel', 'original', 'sûr de lui', 'attachant', 'sensible', 'timide', 'stressé', 'fragile', 'en progrès', 'rythmé', 'drôle', 'showman', 'perfectionniste'];
const TABS = [['home', '🏠', 'Accueil'], ['primes', '📅', 'Primes'], ['cands', '👥', 'Candidats'], ['rate', '⭐', 'Noter'], ['results', '🏆', 'Résultats']];
const CRIT = [['voice', '🎤 Voix'], ['dance', '💃 Danse'], ['presence', '✨ Prestance']];

const S = { me: null, candidates: [], primes: [], adjectives: [], users: [], tab: 'home', primeId: null, ratings: {}, loading: true };
const $app = document.getElementById('app');

// ---------- utilitaires ----------
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const initials = (n) => esc(n.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase());
const photoStyle = (c) => (c.photo ? `style="background-image:url('${esc(c.photo)}')"` : '');
const sexLabel = { F: 'Femme', M: 'Homme', X: 'Autre' };

async function api(path, method = 'GET', body) {
  const r = await fetch(`${API}/${path}`, { method, credentials: 'same-origin', headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (r.status === 401 && path !== 'bootstrap' && !path.startsWith('auth')) { S.me = null; render(); }
  if (!r.ok) throw new Error(j.error || 'Erreur réseau');
  return j;
}

let toastT;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200);
}

const fmtDate = (d, opts = { weekday: 'long', day: 'numeric', month: 'long' }) => (d ? new Date(d + 'T12:00:00').toLocaleDateString('fr-CA', opts) : 'Date à confirmer');
const primeAt = (p) => (p.date ? new Date(`${p.date}T${p.time || '20:00'}:00`) : null);
const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);

function nextPrime() {
  const now = Date.now();
  const up = S.primes.filter((p) => !p.ended && primeAt(p));
  return up.find((p) => primeAt(p) - now > -4 * 3600e3) || S.primes.find((p) => !p.ended) || null;
}
function currentPrime() { return S.primes.find((p) => p.id === S.primeId) || nextPrime() || S.primes[S.primes.length - 1] || null; }

async function loadRatings(primeId) {
  if (!primeId) return;
  const r = await api(`ratings/${primeId}`);
  S.ratings[primeId] = { reveal: r.reveal, list: r.ratings };
}
const myRating = (primeId, candId) => (S.ratings[primeId]?.list || []).find((r) => r.user === S.me && r.candidate === candId);

// ---------- rendu ----------
function render() {
  if (S.loading) { $app.innerHTML = '<div class="spin">Chargement…</div>'; return; }
  if (!S.me) return renderLogin();
  const view = { home: viewHome, primes: viewPrimes, cands: viewCands, rate: viewRate, results: viewResults }[S.tab]();
  $app.innerHTML = `
    <header class="top"><img src="logo.svg" alt="LR"><h1>Star Ac 2027</h1><span class="me">${esc(S.me)}</span></header>
    <main>${view}</main>
    <nav class="tabs"><div>${TABS.map(([k, i, l]) => `<button data-tab="${k}" class="${S.tab === k ? 'on' : ''}"><span>${i}</span>${l}</button>`).join('')}</div></nav>`;
  tickCountdown();
}

function renderLogin(mode = 'login', error = '') {
  $app.innerHTML = `
    <div class="login">
      <img src="logo.svg" alt="LR"><h1>Star Ac 2027</h1>
      <p class="mute">Les primes, les candidats et tes notes en direct</p>
      <form id="auth">
        <label>Pseudo</label><input name="username" autocomplete="username" required maxlength="24">
        <label>Mot de passe</label><input name="password" type="password" autocomplete="${mode === 'login' ? 'current-password' : 'new-password'}" required minlength="6">
        ${mode === 'register' ? '<label>Code d\'invitation (si demandé)</label><input name="code" autocomplete="off">' : ''}
        <div class="err">${esc(error)}</div>
        <button class="btn">${mode === 'login' ? 'Se connecter' : 'Créer mon compte'}</button>
      </form>
      <p class="switch" id="sw">${mode === 'login' ? 'Pas de compte ? <u>Créer un compte</u>' : 'Déjà un compte ? <u>Se connecter</u>'}</p>
    </div>`;
  document.getElementById('sw').onclick = () => renderLogin(mode === 'login' ? 'register' : 'login');
  document.getElementById('auth').onsubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    try {
      await api(`auth/${mode}`, 'POST', data);
      await boot();
    } catch (err) { renderLogin(mode, err.message); }
  };
}

// Accueil
function viewHome() {
  const np = nextPrime();
  const upcoming = S.primes.filter((p) => !p.ended && p !== np);
  let hero;
  if (np) {
    hero = `<div class="card hero"><small>Prochain prime</small><h2>${esc(np.title)}</h2>
      <div>${esc(fmtDate(np.date))}${np.date ? ' · ' + esc(np.time) : ''}</div>
      ${np.date ? `<div class="count" id="count" data-t="${primeAt(np).getTime()}"></div>` : ''}
      <button class="btn ghost sm" style="margin-top:14px;background:rgba(0,0,0,.28)" data-act="rate-prime" data-id="${np.id}">⭐ Noter en direct</button></div>`;
  } else {
    hero = `<div class="card hero"><small>Bienvenue</small><h2>Star Académie 2027</h2><div>Ajoute les dates des primes pour lancer le compte à rebours.</div>
      <button class="btn ghost sm" style="margin-top:14px;background:rgba(0,0,0,.28)" data-tab="primes">📅 Configurer les primes</button></div>`;
  }
  const done = S.primes.filter((p) => p.ended);
  return `${hero}
    <h2 class="sec">À venir</h2>
    ${upcoming.length ? upcoming.map(primeRow).join('') : '<div class="card empty">Aucun autre prime prévu.</div>'}
    ${done.length ? `<h2 class="sec">Terminés</h2>${done.map(primeRow).join('')}` : ''}
    <h2 class="sec">Groupe</h2><div class="card mute">👥 ${S.users.map(esc).join(', ') || '—'}</div>
    <button class="btn ghost" data-act="logout" style="margin-top:8px">Se déconnecter</button>`;
}

function primeRow(p) {
  const status = p.ended ? '<span class="pill done">Terminé</span>' : '<span class="pill">À venir</span>';
  return `<button class="card row" style="width:100%;text-align:left" data-act="edit-prime" data-id="${p.id}">
    <div class="grow"><b>${esc(p.title)}</b><div class="mute">${esc(fmtDate(p.date))}${p.date ? ' · ' + esc(p.time) : ''}</div></div>${status}</button>`;
}

// Primes
function viewPrimes() {
  return `<h2 class="sec">Calendrier des primes <button class="btn sm" data-act="new-prime">+ Ajouter</button></h2>
    ${S.primes.length ? S.primes.map(primeRow).join('') : '<div class="card empty"><b>📅</b>Aucun prime pour l\'instant.</div>'}
    <button class="btn ghost" data-act="gen-season" style="margin-top:6px">⚡ Générer la saison (1 prime / semaine)</button>
    <p class="mute" style="margin-top:12px">Les dates sont partagées avec tout le groupe. Mets-les à jour dès que la production les confirme.</p>`;
}

// Candidats
function viewCands() {
  const grid = S.candidates.map((c) => `<button class="cand ${c.eliminated ? 'out' : ''}" data-act="edit-cand" data-id="${c.id}">
      <div class="ph" ${photoStyle(c)}>${c.photo ? '' : initials(c.name)}</div>
      <div class="inf"><b>${esc(c.name)}</b><span class="mute">${c.age ? esc(c.age) + ' ans' : ''}${c.age && c.city ? ' · ' : ''}${esc(c.city)}</span></div></button>`).join('');
  return `<h2 class="sec">Candidats (${S.candidates.length}) <button class="btn sm" data-act="new-cand">+ Ajouter</button></h2>
    ${grid ? `<div class="grid">${grid}</div>` : '<div class="card empty"><b>👥</b>Ajoute les candidats : photo, âge, lieu…</div>'}`;
}

// Noter en direct
function primePicker() {
  if (!S.primes.length) return '';
  const cur = currentPrime();
  return `<select id="primeSel">${S.primes.map((p) => `<option value="${p.id}" ${cur && p.id === cur.id ? 'selected' : ''}>${esc(p.title)} — ${esc(fmtDate(p.date, { day: 'numeric', month: 'short' }))}</option>`).join('')}</select>`;
}
function viewRate() {
  const p = currentPrime();
  if (!p) return '<div class="card empty"><b>📅</b>Crée d\'abord un prime dans l\'onglet Primes.</div>';
  if (!S.candidates.length) return '<div class="card empty"><b>👥</b>Ajoute d\'abord des candidats.</div>';
  const cards = S.candidates.filter((c) => !c.eliminated).map((c) => {
    const r = myRating(p.id, c.id);
    const done = r && r.stars;
    return `<button class="cand" data-act="rate" data-id="${c.id}"><div class="ph" ${photoStyle(c)}>${c.photo ? '' : initials(c.name)}</div>
      ${done ? `<span class="badge">★ ${r.stars}</span>` : ''}<div class="inf"><b>${esc(c.name)}</b><span class="mute">${done ? 'Noté ✓' : 'À noter'}</span></div></button>`;
  }).join('');
  const n = S.candidates.filter((c) => !c.eliminated && myRating(p.id, c.id)?.stars).length;
  return `<h2 class="sec">En direct · ${n}/${S.candidates.filter((c) => !c.eliminated).length} notés</h2>${primePicker()}
    <div class="grid" style="margin-top:14px">${cards}</div>
    <p class="mute" style="margin-top:14px">${p.ended ? '🔓 Prime terminé : les notes du groupe sont visibles dans Résultats.' : '🔒 Tes notes restent privées jusqu\'à la fin du prime.'}</p>`;
}

// Résultats
function candStats(p, c) {
  const list = (S.ratings[p.id]?.list || []).filter((r) => r.candidate === c.id && r.stars);
  return { list, avg: avg(list.map((r) => r.stars)) };
}
function viewResults() {
  const p = currentPrime();
  if (!p) return '<div class="card empty"><b>🏆</b>Aucun prime pour le moment.</div>';
  const reveal = S.ratings[p.id]?.reveal;
  const rows = S.candidates.map((c) => ({ c, ...candStats(p, c) })).filter((x) => x.list.length).sort((a, b) => b.avg - a.avg);
  let body;
  if (!reveal) {
    body = `<div class="card"><b>🔒 Notes cachées</b><p class="mute" style="margin:6px 0 12px">Tu vois seulement tes notes. Quand le prime est fini, révèle celles de tout le monde.</p>
      <button class="btn" data-act="reveal" data-id="${p.id}">🎬 Terminer le prime et tout révéler</button></div>`;
  }
  const list = rows.map(({ c, list, avg: a }, i) => `<button class="rank" data-act="detail" data-id="${c.id}">
      <span class="n">${i + 1}</span><span class="avatar" ${photoStyle(c)}>${c.photo ? '' : initials(c.name)}</span>
      <span class="grow"><b>${esc(c.name)}</b><div class="mute">${list.length} note${list.length > 1 ? 's' : ''}</div></span>
      <span class="avg">${a.toFixed(1)} <small>/5</small></span></button>`).join('');
  return `<h2 class="sec">Résultats</h2>${primePicker()}<div style="height:14px"></div>${body || ''}
    ${list || (reveal ? '<div class="card empty">Personne n\'a noté ce prime.</div>' : '')}`;
}

// ---------- feuilles ----------
function sheet(html, onMount) {
  closeSheet();
  const bg = document.createElement('div'); bg.className = 'sheet-bg'; bg.id = 'sbg';
  const sh = document.createElement('div'); sh.className = 'sheet'; sh.id = 'sh';
  sh.innerHTML = `<div class="grab"></div>${html}`;
  bg.onclick = closeSheet;
  document.body.append(bg, sh);
  onMount && onMount(sh);
}
function closeSheet() { document.getElementById('sbg')?.remove(); document.getElementById('sh')?.remove(); }

function stars(name, val, cls = '') {
  return `<div class="stars ${cls}" data-stars="${name}">${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-v="${n}" class="${n <= val ? 'on' : ''}">★</button>`).join('')}</div>`;
}

function openRate(candId) {
  const p = currentPrime(); const c = S.candidates.find((x) => x.id === candId);
  const r = { stars: 0, voice: 0, dance: 0, presence: 0, note: '', adjectives: [], ...(myRating(p.id, candId) || {}) };
  let timer;
  const allAdj = [...new Set([...PRESET_ADJ, ...S.adjectives, ...r.adjectives])];
  sheet(`<div class="head"><div class="avatar" ${photoStyle(c)}>${c.photo ? '' : initials(c.name)}</div>
      <div class="grow"><h2>${esc(c.name)}</h2><div class="mute">${c.age ? esc(c.age) + ' ans' : ''}${c.city ? ' · ' + esc(c.city) : ''}</div></div></div>
    <div class="saved" id="saved"></div>
    <div style="text-align:center;margin:4px 0 10px"><div style="display:inline-block">${stars('stars', r.stars)}</div><div class="mute">Note globale</div></div>
    ${CRIT.map(([k, l]) => `<div class="crit"><span>${l}</span>${stars(k, r[k], 'sm')}</div>`).join('')}
    <label>Description</label><textarea id="note" maxlength="600" placeholder="Ce que tu penses de sa prestation…">${esc(r.note)}</textarea>
    <label>Adjectifs</label><div class="chips" id="chips"></div>
    <div class="addadj"><input id="newadj" placeholder="Créer un adjectif…" maxlength="30"><button class="btn sm" id="addadj">Ajouter</button></div>
    <button class="btn ghost" style="margin-top:18px" id="close">Fermer</button>`, (sh) => {
    const chips = sh.querySelector('#chips');
    const drawChips = () => { chips.innerHTML = allAdj.map((a) => `<button type="button" class="chip ${r.adjectives.includes(a) ? 'on' : ''}" data-a="${esc(a)}">${esc(a)}</button>`).join(''); };
    drawChips();
    const save = () => {
      clearTimeout(timer);
      sh.querySelector('#saved').textContent = '…';
      timer = setTimeout(async () => {
        try {
          const saved = await api(`ratings/${p.id}/${candId}`, 'PUT', r);
          const list = (S.ratings[p.id] = S.ratings[p.id] || { reveal: false, list: [] }).list;
          const i = list.findIndex((x) => x.user === S.me && x.candidate === candId);
          if (i >= 0) list[i] = saved; else list.push(saved);
          const s = document.getElementById('saved'); if (s) s.textContent = 'Enregistré ✓';
        } catch (e) { toast(e.message); }
      }, 400);
    };
    sh.onclick = (e) => {
      const star = e.target.closest('[data-stars] button');
      if (star) {
        const k = star.parentNode.dataset.stars, v = Number(star.dataset.v);
        r[k] = r[k] === v ? 0 : v;
        star.parentNode.querySelectorAll('button').forEach((b) => b.classList.toggle('on', Number(b.dataset.v) <= r[k]));
        navigator.vibrate?.(8); save();
      }
      const chip = e.target.closest('.chip');
      if (chip) {
        const a = chip.dataset.a;
        r.adjectives = r.adjectives.includes(a) ? r.adjectives.filter((x) => x !== a) : [...r.adjectives, a];
        chip.classList.toggle('on'); save();
      }
    };
    sh.querySelector('#note').oninput = (e) => { r.note = e.target.value; save(); };
    const addAdj = async () => {
      const inp = sh.querySelector('#newadj'); const w = inp.value.trim().toLowerCase();
      if (!w) return;
      if (!allAdj.includes(w)) { allAdj.push(w); if (!S.adjectives.includes(w)) { S.adjectives.push(w); api('adjectives', 'POST', { word: w }).catch(() => {}); } }
      if (!r.adjectives.includes(w)) r.adjectives.push(w);
      inp.value = ''; drawChips(); save();
    };
    sh.querySelector('#addadj').onclick = addAdj;
    sh.querySelector('#newadj').onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); addAdj(); } };
    sh.querySelector('#close').onclick = () => { closeSheet(); render(); };
  });
}

function openDetail(candId) {
  const p = currentPrime(); const c = S.candidates.find((x) => x.id === candId);
  const { list, avg: a } = candStats(p, c);
  const sorted = [...list].sort((x, y) => (y.user === S.me) - (x.user === S.me));
  const mine = list.find((r) => r.user === S.me);
  const advAvg = (k) => avg(list.filter((r) => r[k]).map((r) => r[k]));
  const counts = {};
  list.forEach((r) => r.adjectives.forEach((x) => { counts[x] = (counts[x] || 0) + 1; }));
  const top = Object.entries(counts).sort((x, y) => y[1] - x[1]);
  sheet(`<div class="head"><div class="avatar" ${photoStyle(c)}>${c.photo ? '' : initials(c.name)}</div>
      <div class="grow"><h2>${esc(c.name)}</h2><div class="mute">Moyenne du groupe : <b style="color:var(--gold)">★ ${a.toFixed(1)}</b></div></div></div>
    <div class="chips" style="margin:10px 0">${CRIT.map(([k, l]) => `<span class="chip ro">${l} ${advAvg(k) ? advAvg(k).toFixed(1) : '–'}</span>`).join('')}</div>
    ${top.length ? `<div class="chips" style="margin-bottom:8px">${top.map(([w, n]) => `<span class="chip on ro">${esc(w)}${n > 1 ? ' ×' + n : ''}</span>`).join('')}</div>` : ''}
    ${sorted.map((r) => {
      const d = mine && r.user !== S.me ? r.stars - mine.stars : 0;
      return `<div class="vote ${r.user === S.me ? 'mine' : ''}"><div class="who"><span>${esc(r.user)}${r.user === S.me ? ' (moi)' : ''}</span>
        <span><span class="ro-stars"><b>${'★'.repeat(r.stars)}</b>${'★'.repeat(5 - r.stars)}</span>${d ? `<span class="diff ${d > 0 ? 'up' : 'dn'}">${d > 0 ? '+' : ''}${d}</span>` : ''}</span></div>
        <div class="sub">${CRIT.map(([k, l]) => `${l} ${r[k] || '–'}`).join(' · ')}</div>
        ${r.note ? `<div>${esc(r.note)}</div>` : ''}
        ${r.adjectives.length ? `<div class="chips" style="margin-top:6px">${r.adjectives.map((x) => `<span class="chip ro">${esc(x)}</span>`).join('')}</div>` : ''}</div>`;
    }).join('')}
    <button class="btn ghost" style="margin-top:16px" id="close">Fermer</button>`, (sh) => { sh.querySelector('#close').onclick = closeSheet; });
}

function openPrime(id, preset) {
  const p = id ? S.primes.find((x) => x.id === id) : { title: `Prime ${S.primes.length + 1}`, date: '', time: '20:00', ended: false, order: S.primes.length, ...preset };
  sheet(`<h2>${id ? 'Modifier le prime' : 'Nouveau prime'}</h2>
    <label>Titre</label><input id="t" value="${esc(p.title)}" maxlength="60">
    <label>Date</label><input id="d" type="date" value="${esc(p.date)}">
    <label>Heure</label><input id="h" type="time" value="${esc(p.time)}">
    <label>Statut</label><div class="seg" id="st"><button type="button" data-e="0" class="${p.ended ? '' : 'on'}">À venir</button><button type="button" data-e="1" class="${p.ended ? 'on' : ''}">Terminé</button></div>
    <p class="mute" style="margin-top:6px">« Terminé » révèle les notes de tout le groupe.</p>
    <div style="height:16px"></div><button class="btn" id="save">Enregistrer</button>
    ${id ? '<button class="btn danger" style="margin-top:10px" id="del">Supprimer</button>' : ''}`, (sh) => {
    let ended = p.ended;
    sh.querySelector('#st').onclick = (e) => { const b = e.target.closest('button'); if (!b) return; ended = b.dataset.e === '1'; sh.querySelectorAll('#st button').forEach((x) => x.classList.toggle('on', x === b)); };
    sh.querySelector('#save').onclick = async () => {
      try {
        await api(p.id ? `primes/${p.id}` : 'primes', 'PUT', { title: sh.querySelector('#t').value, date: sh.querySelector('#d').value, time: sh.querySelector('#h').value, ended, order: p.order });
        closeSheet(); await refresh(); toast('Prime enregistré');
      } catch (e) { toast(e.message); }
    };
    sh.querySelector('#del')?.addEventListener('click', async () => { if (confirm('Supprimer ce prime ?')) { await api(`primes/${p.id}`, 'DELETE'); closeSheet(); await refresh(); } });
  });
}

function openSeason() {
  const today = new Date().toISOString().slice(0, 10);
  sheet(`<h2>Générer la saison</h2><p class="mute">Crée les primes d'un coup, un par semaine. Tu pourras ajuster chaque date ensuite.</p>
    <label>Date du 1er prime</label><input id="d" type="date" value="${today}">
    <label>Heure</label><input id="h" type="time" value="20:00">
    <label>Nombre de primes</label><input id="n" type="number" min="1" max="30" value="12">
    <div style="height:16px"></div><button class="btn" id="go">Créer</button>`, (sh) => {
    sh.querySelector('#go').onclick = async () => {
      const start = new Date(sh.querySelector('#d').value + 'T12:00:00'); const n = Math.min(30, Number(sh.querySelector('#n').value) || 1);
      if (isNaN(start)) return toast('Choisis une date');
      for (let i = 0; i < n; i++) {
        const d = new Date(start); d.setDate(d.getDate() + 7 * i);
        await api('primes', 'PUT', { title: `Prime ${S.primes.length + i + 1}`, date: d.toISOString().slice(0, 10), time: sh.querySelector('#h').value, order: S.primes.length + i });
      }
      closeSheet(); await refresh(); toast(`${n} primes créés`);
    };
  });
}

function resize(file, max = 420) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height));
      const cv = document.createElement('canvas'); cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k);
      cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
      resolve(cv.toDataURL('image/jpeg', 0.78));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function openCand(id) {
  const c = id ? S.candidates.find((x) => x.id === id) : { name: '', age: '', city: '', sex: '', photo: '', eliminated: false };
  let photo = c.photo, sex = c.sex, out = c.eliminated;
  sheet(`<h2>${id ? 'Fiche candidat' : 'Nouveau candidat'}</h2>
    <div class="photo-pick" style="margin-top:12px"><div class="avatar" id="pv" ${photoStyle(c)}>${c.photo ? '' : '📷'}</div>
      <label class="btn ghost sm" style="margin:0;color:#fff">Choisir une photo<input type="file" id="ph" accept="image/*" hidden></label></div>
    <label>Nom</label><input id="n" value="${esc(c.name)}" maxlength="60">
    <div class="row"><div class="grow"><label>Âge</label><input id="a" type="number" inputmode="numeric" min="0" max="99" value="${esc(c.age ?? '')}"></div>
      <div class="grow"><label>Lieu</label><input id="l" value="${esc(c.city)}" maxlength="80" placeholder="Ville"></div></div>
    <label>Sexe</label><div class="seg" id="sx">${[['F', 'Femme'], ['M', 'Homme'], ['X', 'Autre']].map(([k, l]) => `<button type="button" data-s="${k}" class="${sex === k ? 'on' : ''}">${l}</button>`).join('')}</div>
    <label>Statut</label><div class="seg" id="el"><button type="button" data-o="0" class="${out ? '' : 'on'}">En compétition</button><button type="button" data-o="1" class="${out ? 'on' : ''}">Éliminé</button></div>
    <div style="height:16px"></div><button class="btn" id="save">Enregistrer</button>
    ${id ? '<button class="btn danger" style="margin-top:10px" id="del">Supprimer</button>' : ''}`, (sh) => {
    sh.querySelector('#ph').onchange = async (e) => {
      const f = e.target.files[0]; if (!f) return;
      photo = await resize(f); const pv = sh.querySelector('#pv'); pv.style.backgroundImage = `url('${photo}')`; pv.textContent = '';
    };
    const seg = (sel, fn) => { sh.querySelector(sel).onclick = (e) => { const b = e.target.closest('button'); if (!b) return; fn(b); sh.querySelectorAll(sel + ' button').forEach((x) => x.classList.toggle('on', x === b)); }; };
    seg('#sx', (b) => { sex = b.dataset.s; }); seg('#el', (b) => { out = b.dataset.o === '1'; });
    sh.querySelector('#save').onclick = async () => {
      try {
        await api(id ? `candidates/${id}` : 'candidates', 'PUT', { name: sh.querySelector('#n').value, age: sh.querySelector('#a').value, city: sh.querySelector('#l').value, sex, photo, eliminated: out });
        closeSheet(); await refresh(); toast('Candidat enregistré');
      } catch (e) { toast(e.message); }
    };
    sh.querySelector('#del')?.addEventListener('click', async () => { if (confirm('Supprimer ce candidat ?')) { await api(`candidates/${id}`, 'DELETE'); closeSheet(); await refresh(); } });
  });
}

// ---------- compte à rebours ----------
function tickCountdown() {
  const el = document.getElementById('count'); if (!el) return;
  let ms = Number(el.dataset.t) - Date.now();
  if (ms <= 0) { el.innerHTML = '<div><b>🔴</b><i>En direct / terminé</i></div>'; return; }
  const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
  el.innerHTML = [[d, 'jours'], [h, 'heures'], [m, 'min'], [s, 'sec']].map(([v, l]) => `<div><b>${v}</b><i>${l}</i></div>`).join('');
}
setInterval(tickCountdown, 1000);

// ---------- événements ----------
document.addEventListener('click', async (e) => {
  const t = e.target.closest('[data-tab],[data-act]'); if (!t || t.closest('.sheet')) return;
  if (t.dataset.tab) { S.tab = t.dataset.tab; if (S.tab === 'rate' || S.tab === 'results') { const p = currentPrime(); if (p) await loadRatings(p.id).catch(() => {}); } render(); window.scrollTo(0, 0); return; }
  const id = t.dataset.id;
  switch (t.dataset.act) {
    case 'logout': await api('auth/logout', 'POST', {}).catch(() => {}); S.me = null; render(); break;
    case 'new-prime': openPrime(); break;
    case 'edit-prime': openPrime(id); break;
    case 'gen-season': openSeason(); break;
    case 'new-cand': openCand(); break;
    case 'edit-cand': openCand(id); break;
    case 'rate-prime': S.primeId = id; S.tab = 'rate'; await loadRatings(id).catch(() => {}); render(); break;
    case 'rate': openRate(id); break;
    case 'detail': openDetail(id); break;
    case 'reveal': {
      if (!confirm('Terminer le prime ? Les notes de tous deviennent visibles pour tout le groupe.')) break;
      const p = S.primes.find((x) => x.id === id);
      await api(`primes/${id}`, 'PUT', { ...p, ended: true });
      await refresh(); await loadRatings(id); render(); break;
    }
  }
});
document.addEventListener('change', async (e) => {
  if (e.target.id === 'primeSel') { S.primeId = e.target.value; await loadRatings(S.primeId).catch(() => {}); render(); }
});

// ---------- démarrage ----------
async function refresh() {
  const b = await api('bootstrap');
  Object.assign(S, { me: b.me, candidates: b.candidates, primes: b.primes, adjectives: b.adjectives, users: b.users });
  const p = currentPrime(); if (p && (S.tab === 'rate' || S.tab === 'results')) await loadRatings(p.id).catch(() => {});
  render();
}
async function boot() {
  try { await refresh(); } catch { S.me = null; }
  S.loading = false; render();
}
boot();
})();
