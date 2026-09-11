<?php
// ==========================================================================
// LUCASRICHE.COM — avis/db.php
// Connexion PDO SQLite partagée + création du schéma (clients, avis).
// Base auto-contenue (aucune configuration MySQL nécessaire), même principe
// que les3chaises/db_data/reservations.db.
// ==========================================================================

function getAvisDb() {
    $dbDir  = __DIR__ . '/db_data';
    $dbFile = $dbDir . '/avis.db';

    if (!is_dir($dbDir)) {
        mkdir($dbDir, 0755, true);
    }
    if (!file_exists($dbDir . '/.htaccess')) {
        // Empêche le téléchargement direct du fichier .db via Apache
        file_put_contents($dbDir . '/.htaccess', "Deny from all\n");
    }

    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Un client = un projet du portfolio (ex: "les3chaises") pouvant se
    // connecter avec un identifiant/mot de passe pour laisser un avis.
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            projet VARCHAR(60) NOT NULL UNIQUE,
            nom_affiche VARCHAR(120) NOT NULL,
            username VARCHAR(60) NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS avis (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            projet VARCHAR(60) NOT NULL,
            auteur VARCHAR(120) NOT NULL,
            texte TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    return $pdo;
}
