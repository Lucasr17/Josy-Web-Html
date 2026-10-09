---
name: squad
description: Split a request into independent sub-tasks and run several agents in parallel, each on its own task (Claude Squad style), then merge the results. Use when the user says "/squad", "squad", "en parallèle", "plusieurs agents", or gives a request with several separable parts.
---

# Squad — plusieurs agents en parallèle

Objectif : à partir d'une seule demande, la découper en tâches indépendantes et les confier à plusieurs agents qui travaillent en même temps.

## Méthode

1. **Analyser** la demande et lister les tâches. Si elle est trop petite ou strictement séquentielle, le dire et la faire directement.
2. **Découper** en 2 à 6 tâches **indépendantes** : chacune touche des fichiers différents (pas de conflit d'édition). Annoncer le plan en quelques lignes (tâche → fichiers concernés).
3. **Lancer tous les agents dans un seul message** (appels `Agent` en parallèle, `subagent_type: general-purpose`). Pour des tâches qui modifient du code, ajouter `isolation: "worktree"` si les fichiers pourraient se chevaucher.
4. **Prompt de chaque agent** : autonome (il ne voit pas la conversation) — contexte, objectif précis, fichiers à toucher, fichiers à ne PAS toucher, critère de fin, et demander un compte rendu court.
5. **Collecter** les résultats, relire les modifications, résoudre les conflits éventuels, lancer les vérifications (lint/tests/build).
6. **Résumer** pour l'utilisateur : ce que chaque agent a fait, état final, points à vérifier.

## Règles

- Ne pas lancer d'agents pour des tâches dépendantes l'une de l'autre : les faire dans l'ordre.
- Pas de commit/push/PR par les sous-agents ; seul l'agent principal commit, sur la branche demandée.
- Rester sur l'objectif de l'utilisateur : pas de tâches en plus.
