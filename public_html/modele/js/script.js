// ============================================================
// MODÈLE — interactions de base (sans dépendance externe)
// ============================================================

// --- Révélation au scroll ---
const revealItems = document.querySelectorAll('[data-reveal]');
if (revealItems.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealItems.forEach((el) => io.observe(el));
}

// --- Bascule thème clair / sombre ---
const themeToggle = document.querySelector('[data-theme-toggle]');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    themeToggle.textContent = next === 'dark' ? '☀️ Clair' : '🌙 Sombre';
  });
}

// --- Pastilles de couleur d'accent ---
document.querySelectorAll('[data-accent]').forEach((swatch) => {
  swatch.addEventListener('click', () => {
    const [accent, accent2] = swatch.dataset.accent.split(',');
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty('--accent-2', accent2);
    document.querySelectorAll('[data-accent]').forEach((s) => s.classList.remove('is-active'));
    swatch.classList.add('is-active');
  });
});

// --- Frames de navigation : effet "scrolled" + menu burger ---
document.querySelectorAll('.device-frame__scroll').forEach((frame) => {
  frame.addEventListener('scroll', () => {
    frame.classList.toggle('is-scrolled', frame.scrollTop > 8);
  });
});

document.querySelectorAll('[data-burger]').forEach((burger) => {
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-open');
    const overlay = document.querySelector(burger.dataset.burger);
    if (overlay) overlay.classList.toggle('is-open');
  });
});

// --- Effet tilt (carte qui suit la souris) ---
document.querySelectorAll('[data-tilt]').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
  });
});

// --- Bouton magnétique ---
document.querySelectorAll('[data-magnetic]').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

// --- Navigation interne (sous-menu de la page d'aperçu) ---
document.querySelectorAll('[data-subnav] a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('[data-subnav] a').forEach((l) => l.classList.remove('is-active'));
    link.classList.add('is-active');
  });
});

// --- Révélation par un flou qui se dissipe ---
const blurItems = document.querySelectorAll('[data-reveal-blur]');
if (blurItems.length) {
  const ioBlur = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        ioBlur.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  blurItems.forEach((el) => ioBlur.observe(el));
}

// --- Halo-masque qui suit la souris sur un texte ---
document.querySelectorAll('.mask-spotlight').forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
    el.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
  });
});

// --- Tab bar "île dynamique" (pilule qui glisse et s'étire) ---
document.querySelectorAll('[data-island-tabbar]').forEach((group) => {
  const items = Array.from(group.querySelectorAll('.tabbar-island__item'));
  const thumb = group.querySelector('.tabbar-island__thumb');
  const moveThumb = (el) => {
    if (!thumb) return;
    thumb.style.left = el.offsetLeft + 'px';
    thumb.style.width = el.offsetWidth + 'px';
  };
  const active = group.querySelector('.tabbar-island__item.is-active') || items[0];
  if (active) requestAnimationFrame(() => moveThumb(active));
  items.forEach((item) => {
    item.addEventListener('click', () => {
      items.forEach((i) => i.classList.remove('is-active'));
      item.classList.add('is-active');
      moveThumb(item);
      // le libellé met .4s à se déplier (max-width) : on recale le repère une fois sa largeur finale atteinte
      setTimeout(() => moveThumb(item), 420);
    });
  });
});

// --- Tab bar verticale (rail latéral) ---
document.querySelectorAll('[data-vertical-tabbar]').forEach((group) => {
  const items = group.querySelectorAll('.tabbar-vertical__item');
  items.forEach((item) => {
    item.addEventListener('click', () => {
      items.forEach((i) => i.classList.remove('is-active'));
      item.classList.add('is-active');
    });
  });
});

// --- Sélecteur de date en ruban ---
document.querySelectorAll('[data-date-strip]').forEach((strip) => {
  const days = strip.querySelectorAll('.date-strip__day');
  days.forEach((day) => {
    day.addEventListener('click', () => {
      days.forEach((d) => d.classList.remove('is-active'));
      day.classList.add('is-active');
    });
  });
});

// --- Horloge locale en direct (footer) ---
document.querySelectorAll('[data-live-clock]').forEach((el) => {
  const update = () => {
    el.textContent = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };
  update();
  setInterval(update, 30000);
});

const sections = document.querySelectorAll('main > section[id]');
const subnavLinks = document.querySelectorAll('[data-subnav] a');
if (sections.length && subnavLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        subnavLinks.forEach((l) => {
          l.classList.toggle('is-active', l.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach((s) => sectionObserver.observe(s));
}
