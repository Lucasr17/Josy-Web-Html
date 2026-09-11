<?php
// ==========================================================================
// LUCASRICHE.COM — avis/api.php
// API publique consommée par index.html (hébergé sur Vercel) :
//   - GET  ?projet=SLUG              -> liste des avis publiés pour ce projet
//   - POST {action:"login", ...}     -> vérifie l'identifiant/mot de passe du client
//   - POST {action:"submit", ...}    -> vérifie puis enregistre un nouvel avis
// ==========================================================================

require __DIR__ . '/db.php';

// CORS - autoriser uniquement le frontend du portfolio
$allowed_origins = [
    'https://lucasriche.com',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && in_array($origin, $allowed_origins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function jsonError($message, $code = 400) {
    http_response_code($code);
    echo json_encode(['success' => false, 'error' => $message]);
    exit;
}

$pdo = getAvisDb();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $projet = trim($_GET['projet'] ?? '');
    if ($projet === '') {
        jsonError('Paramètre "projet" manquant.');
    }

    $stmt = $pdo->prepare("SELECT auteur, texte, created_at FROM avis WHERE projet = :projet ORDER BY created_at DESC");
    $stmt->execute(['projet' => $projet]);
    echo json_encode(['success' => true, 'avis' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
    exit;
}

if ($method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);
    if (!is_array($body)) {
        jsonError('Corps de requête invalide.');
    }

    $action   = $body['action'] ?? '';
    $projet   = trim($body['projet'] ?? '');
    $username = trim($body['username'] ?? '');
    $password = (string)($body['password'] ?? '');

    if ($projet === '' || $username === '' || $password === '') {
        jsonError('Identifiants manquants.');
    }

    $stmt = $pdo->prepare("SELECT * FROM clients WHERE projet = :projet AND username = :username");
    $stmt->execute(['projet' => $projet, 'username' => $username]);
    $client = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$client || !password_verify($password, $client['password_hash'])) {
        jsonError('Identifiant ou mot de passe incorrect.', 401);
    }

    if ($action === 'login') {
        echo json_encode(['success' => true, 'nom_affiche' => $client['nom_affiche']]);
        exit;
    }

    if ($action === 'submit') {
        $texte = trim($body['texte'] ?? '');
        if ($texte === '') {
            jsonError('Le texte de l\'avis est vide.');
        }
        if (mb_strlen($texte) > 2000) {
            jsonError('Avis trop long (2000 caractères maximum).');
        }

        $ins = $pdo->prepare("INSERT INTO avis (projet, auteur, texte) VALUES (:projet, :auteur, :texte)");
        $ins->execute([
            'projet' => $projet,
            'auteur' => $client['nom_affiche'],
            'texte'  => $texte,
        ]);

        echo json_encode(['success' => true]);
        exit;
    }

    jsonError('Action inconnue.');
}

jsonError('Méthode non supportée.', 405);
