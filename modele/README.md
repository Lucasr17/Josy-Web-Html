# Modèle — base de design

Bibliothèque de composants réutilisable pour démarrer un nouveau site : navigation, boutons, animations, sections hero, cartes, footer.

## Structure

- `index.html` — page d'aperçu qui présente tous les modèles, section par section
- `css/style.css` — **le fichier à réutiliser tel quel** dans un nouveau projet : variables de design (couleurs, typographie, ombres) + composants
- `css/gallery.css` — styles propres à la page d'aperçu uniquement (à ne pas copier)
- `js/script.js` — interactions (révélation au scroll, menu burger, effet tilt, bouton magnétique, changement d'accent, thème clair/sombre)

## Pour démarrer un nouveau site

1. Copier `css/style.css` et `js/script.js` dans le nouveau projet
2. Changer les variables `--accent`, `--accent-2`, `--ff-heading` en haut de `style.css` pour la nouvelle marque
3. Reprendre les classes des composants voulus (`.btn-primary`, `.demo-nav`, `.card`, `.hero-split`, `.site-footer`, etc.)

## Aperçu

Ouvrir `index.html` dans un navigateur. Les pastilles de couleur en haut à droite changent l'accent de toute la page en direct, pour visualiser un autre univers de marque.
