<?php
session_start();
require __DIR__ . '/db.php';

// ==========================================================================
// LUCASRICHE.COM — avis/admin.php
// Panneau d'administration pour Lucas :
//   - créer un compte client (projet, identifiant, mot de passe)
//   - modérer (supprimer) les avis reçus
// ==========================================================================

// !! Change ce mot de passe après le premier déploiement !!
define('ADMIN_PASSWORD', 'ChangeMoi2026!');

$pdo = getAvisDb();
$erreur = '';

// ---- Connexion admin ----
if (isset($_POST['admin_login'])) {
    if (($_POST['admin_password'] ?? '') === ADMIN_PASSWORD) {
        $_SESSION['avis_admin'] = true;
    } else {
        $erreur = 'Mot de passe incorrect.';
    }
}
if (isset($_GET['logout'])) {
    unset($_SESSION['avis_admin']);
}
$estConnecte = !empty($_SESSION['avis_admin']);

// ---- Actions (uniquement si connecté) ----
if ($estConnecte && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['ajouter_client'])) {
        $projet   = trim($_POST['projet'] ?? '');
        $nom      = trim($_POST['nom_affiche'] ?? '');
        $username = trim($_POST['username'] ?? '');
        $password = (string)($_POST['password'] ?? '');

        if ($projet !== '' && $nom !== '' && $username !== '' && $password !== '') {
            $stmt = $pdo->prepare("
                INSERT INTO clients (projet, nom_affiche, username, password_hash)
                VALUES (:projet, :nom, :username, :hash)
                ON CONFLICT(projet) DO UPDATE SET
                    nom_affiche = excluded.nom_affiche,
                    username = excluded.username,
                    password_hash = excluded.password_hash
            ");
            $stmt->execute([
                'projet'   => $projet,
                'nom'      => $nom,
                'username' => $username,
                'hash'     => password_hash($password, PASSWORD_DEFAULT),
            ]);
        }
    }

    if (isset($_POST['supprimer_client'])) {
        $stmt = $pdo->prepare("DELETE FROM clients WHERE id = :id");
        $stmt->execute(['id' => (int)$_POST['supprimer_client']]);
    }

    if (isset($_POST['supprimer_avis'])) {
        $stmt = $pdo->prepare("DELETE FROM avis WHERE id = :id");
        $stmt->execute(['id' => (int)$_POST['supprimer_avis']]);
    }
}

$clients = $estConnecte ? $pdo->query("SELECT * FROM clients ORDER BY projet")->fetchAll(PDO::FETCH_ASSOC) : [];
$avisListe = $estConnecte ? $pdo->query("SELECT * FROM avis ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC) : [];

function e($v) { return htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8'); }
?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Avis — Administration</title>
<meta name="robots" content="noindex, nofollow">
<style>
  body{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background:#f2ede2; color:#182634; margin:0; padding:32px 20px; }
  .wrap{ max-width: 900px; margin: 0 auto; }
  h1{ font-size: 22px; margin-bottom: 4px; }
  h2{ font-size: 17px; margin: 32px 0 12px; }
  .card{ background:#fff; border-radius:6px; padding:20px 22px; margin-bottom:20px; box-shadow:0 1px 3px rgba(0,0,0,0.08); }
  label{ display:block; font-size:12.5px; margin: 10px 0 4px; color:#46586b; }
  input, textarea{ width:100%; padding:9px 11px; border:1px solid #cfd8e0; border-radius:4px; font-size:14px; box-sizing:border-box; }
  button{ margin-top:14px; padding:10px 18px; border:none; border-radius:4px; background:#0f2a47; color:#fff; font-size:13.5px; cursor:pointer; }
  button:hover{ background:#b8874b; }
  table{ width:100%; border-collapse: collapse; font-size:13.5px; }
  th, td{ text-align:left; padding:8px 6px; border-bottom:1px solid #e7e0d1; vertical-align: top; }
  th{ color:#6b7c8d; font-weight:600; }
  .del{ background:#b3492f; }
  .del:hover{ background:#8f3925; }
  .top{ display:flex; justify-content:space-between; align-items:center; }
  .top a{ font-size:12.5px; color:#46586b; }
  .muted{ color:#6b7c8d; font-size:12.5px; }
</style>
</head>
<body>
<div class="wrap">

<?php if (!$estConnecte): ?>

  <h1>Avis clients — Administration</h1>
  <div class="card">
    <?php if ($erreur): ?><p style="color:#b3492f;"><?= e($erreur) ?></p><?php endif; ?>
    <form method="post">
      <label>Mot de passe admin</label>
      <input type="password" name="admin_password" required autofocus>
      <button type="submit" name="admin_login" value="1">Se connecter</button>
    </form>
  </div>

<?php else: ?>

  <div class="top">
    <h1>Avis clients — Administration</h1>
    <a href="?logout=1">Se déconnecter</a>
  </div>

  <h2>Comptes clients</h2>
  <div class="card">
    <p class="muted">Un compte = un projet du portfolio (ex: "les3chaises"). Le "slug projet" doit correspondre exactement à l'attribut <code>data-avis-projet</code> utilisé dans index.html.</p>
    <table>
      <tr><th>Projet</th><th>Nom affiché</th><th>Identifiant</th><th>Créé le</th><th></th></tr>
      <?php foreach ($clients as $c): ?>
      <tr>
        <td><?= e($c['projet']) ?></td>
        <td><?= e($c['nom_affiche']) ?></td>
        <td><?= e($c['username']) ?></td>
        <td><?= e($c['created_at']) ?></td>
        <td>
          <form method="post" onsubmit="return confirm('Supprimer ce compte client ?');">
            <button class="del" type="submit" name="supprimer_client" value="<?= e($c['id']) ?>">Supprimer</button>
          </form>
        </td>
      </tr>
      <?php endforeach; ?>
      <?php if (!$clients): ?><tr><td colspan="5" class="muted">Aucun compte pour l'instant.</td></tr><?php endif; ?>
    </table>

    <h2 style="margin-top:26px;">Ajouter / modifier un compte</h2>
    <form method="post">
      <label>Slug projet (ex: les3chaises)</label>
      <input type="text" name="projet" required>
      <label>Nom affiché avec l'avis (ex: Les 3 Chaises)</label>
      <input type="text" name="nom_affiche" required>
      <label>Identifiant</label>
      <input type="text" name="username" required>
      <label>Mot de passe</label>
      <input type="text" name="password" required>
      <button type="submit" name="ajouter_client" value="1">Enregistrer</button>
    </form>
  </div>

  <h2>Avis reçus</h2>
  <div class="card">
    <table>
      <tr><th>Projet</th><th>Auteur</th><th>Avis</th><th>Date</th><th></th></tr>
      <?php foreach ($avisListe as $a): ?>
      <tr>
        <td><?= e($a['projet']) ?></td>
        <td><?= e($a['auteur']) ?></td>
        <td><?= nl2br(e($a['texte'])) ?></td>
        <td><?= e($a['created_at']) ?></td>
        <td>
          <form method="post" onsubmit="return confirm('Supprimer cet avis ?');">
            <button class="del" type="submit" name="supprimer_avis" value="<?= e($a['id']) ?>">Supprimer</button>
          </form>
        </td>
      </tr>
      <?php endforeach; ?>
      <?php if (!$avisListe): ?><tr><td colspan="5" class="muted">Aucun avis pour l'instant.</td></tr><?php endif; ?>
    </table>
  </div>

<?php endif; ?>

</div>
</body>
</html>
