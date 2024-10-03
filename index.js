const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Utilisation du port dynamique fourni par Fly.io ou du port 3000 par défaut
const port = process.env.PORT || 3000;

// Middleware pour servir les fichiers statiques (HTML, CSS, etc.) dans le dossier "public_html"
app.use(express.static(path.join(__dirname, 'public_html')));
app.use(express.json());

// Endpoint pour mettre à jour le fichier JSON
app.post('/update-json', (req, res) => {
    const updatedData = req.body;
    const filePath = path.join(__dirname, 'public_html', 'motsJOSY.json');

    fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), (err) => {
        if (err) {
            console.error('Erreur lors de la mise à jour du fichier JSON:', err);
            return res.status(500).json({ error: 'Erreur lors de la mise à jour du fichier JSON' });
        }
        res.json({ message: 'Fichier JSON mis à jour avec succès' });
    });
});

// Route de base pour répondre à "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public_html', 'home.html'));
});

// Démarrage du serveur sur le port défini par Fly.io
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
