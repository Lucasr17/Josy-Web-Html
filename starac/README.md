# Star Ac 2027 — appli mobile

Appli web (PWA, pensée mobile) pour suivre les **dates des primes**, voir les **candidats** (photo, âge, lieu, sexe) et **noter en direct** chaque prime : note globale 1–5, voix, danse, prestance, description et adjectifs (à choisir ou à créer). Une fois le prime terminé, on compare les notes de tout le groupe.

- Front : HTML/CSS/JS sans build (`public/`)
- API : fonctions Vercel (`api/[...path].js`)
- Données : Redis Upstash via l'intégration Vercel (`lib/store.js`)
- Auth : pseudo + mot de passe (scrypt), cookie de session signé HttpOnly

## Déploiement sur Vercel

1. Vercel → **Add New Project** → importer ce dépôt, **Root Directory = `starac`**. Pas de build.
2. Onglet **Storage** → **Upstash Redis** (Marketplace) → connecter au projet (ajoute `KV_REST_API_URL` et `KV_REST_API_TOKEN`).
3. Variables d'environnement :
   - `SESSION_SECRET` — longue chaîne aléatoire (obligatoire)
   - `INVITE_CODE` — optionnel : code demandé à l'inscription pour limiter l'accès au groupe
4. Domaine : l'appli répond à `/` **et** à `/starac/` (voir `vercel.json`). Pour `lucasriche.com/starac` :
   - si `lucasriche.com` est un domaine de ce projet Vercel : rien d'autre à faire ;
   - sinon, faire pointer `/starac/*` du site principal vers ce projet (rewrite/proxy).

## Utilisation

1. Chacun crée son compte. Le groupe partage candidats, primes et adjectifs.
2. Onglet **Primes** : ajouter les dates, ou « Générer la saison » (1 prime / semaine), puis corriger.
3. Onglet **Candidats** : ajouter fiche + photo.
4. Pendant le prime, onglet **Noter** : tes notes sont enregistrées automatiquement et restent privées.
5. Onglet **Résultats** → « Terminer le prime » : les notes de tout le monde sont révélées (classement, moyennes, écarts avec toi).

## Local

```
node dev.js   # http://localhost:3000/starac/  (données dans un fichier temporaire, sans Redis)
```

## À venir
- Logo définitif (style rond « LR »)
