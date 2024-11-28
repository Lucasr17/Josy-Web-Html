// Variables globales
let motsJOSY = [];
let motsAValider = [];
let selectedWord = null;

// Charger les fichiers JSON au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    chargerMots('motsJOSY.json', 'motsJOSYList', motsJOSY);
    chargerMots('motsJOSY_A_VALIDER.json', 'motsAValiderList', motsAValider);
});

// Fonction pour charger les mots depuis un fichier JSON et les afficher dans la liste correspondante
function chargerMots(fichier, listeId, motsArray) {
    fetch(fichier)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status}`);
            }
            return response.text(); // Lire le fichier en texte brut pour capturer les erreurs JSON
        })
        .then(data => {
            try {
                const jsonData = JSON.parse(data); // Tente de parser le JSON
                motsArray.length = 0; // Vide le tableau existant
                motsArray.push(...jsonData); // Ajoute les nouveaux éléments
                afficherMots(jsonData, listeId); // Affiche les mots si le parsing réussit
            } catch (err) {
                console.error(`Erreur lors du parsing de ${fichier}:`, err);
                afficherBrut(data, listeId); // Affiche le fichier en brut si le parsing échoue
            }
        })
        .catch(error => {
            console.error(`Erreur lors du chargement de ${fichier}:`, error);
            afficherErreur(`Impossible de charger ${fichier}: ${error.message}`, listeId);
        });
}

// Affiche le contenu brut dans la liste en cas d'erreur JSON
function afficherBrut(contenu, listeId) {
    const liste = document.getElementById(listeId);
    liste.innerHTML = `<pre>${contenu}</pre>`; // Affiche le texte brut dans un bloc formaté
}

// Affiche un message d'erreur dans la liste
function afficherErreur(message, listeId) {
    const liste = document.getElementById(listeId);
    liste.innerHTML = `<p style="color: red;">${message}</p>`;
}

// Afficher les mots dans une liste
function afficherMots(mots, listeId) {
    const liste = document.getElementById(listeId);
    liste.innerHTML = '';
    mots.forEach(mot => {
        const li = document.createElement('li');
        li.textContent = mot.mot || mot;
        li.addEventListener('click', () => {
            document.querySelectorAll(`#${listeId} li`).forEach(item => item.classList.remove('selected'));
            li.classList.add('selected');
            selectedWord = mot; // Enregistre le mot sélectionné
        });
        liste.appendChild(li);
    });
}

// Ajouter un mot à motsJOSY.json
function validerMot() {
    if (!selectedWord) return alert('Veuillez sélectionner un mot.');
    motsAValider = motsAValider.filter(mot => mot !== selectedWord);

    const nouveauMot = { mot: selectedWord.mot, nombre: 1, valide: "oui" };
    motsJOSY.push(nouveauMot);

    sauvegarderFichier('motsJOSY.json', motsJOSY);
    sauvegarderFichier_2('motsJOSY_A_VALIDER.json', motsAValider);

    selectedWord = null;
    chargerMots('motsJOSY_A_VALIDER.json', 'motsAValiderList', motsAValider);
    chargerMots('motsJOSY.json', 'motsJOSYList', motsJOSY);
}

// Supprimer un mot de motsJOSY_A_VALIDER.json
function supprimerMot() {
    if (!selectedWord) return alert('Veuillez sélectionner un mot.');
    motsAValider = motsAValider.filter(mot => mot !== selectedWord);

    sauvegarderFichier_2('motsJOSY_A_VALIDER.json', motsAValider);

    selectedWord = null;
    chargerMots('motsJOSY_A_VALIDER.json', 'motsAValiderList', motsAValider);
}

// Sauvegarder les données mises à jour dans un fichier JSON
function sauvegarderFichier(fichier, data) {
    fetch(`/update-json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fichier, data }),
    })
        .then(response => response.json())
        .then(result => console.log(`Fichier ${fichier} mis à jour:`, result))
        .catch(error => console.error(`Erreur lors de la sauvegarde de ${fichier}:`, error));
}

// Sauvegarder les données mises à jour dans un fichier JSON
function sauvegarderFichier_2(fichier, data) {
    fetch(`/update-json-2`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fichier, data }),
    })
        .then(response => response.json())
        .then(result => console.log(`Fichier ${fichier} mis à jour:`, result))
        .catch(error => console.error(`Erreur lors de la sauvegarde de ${fichier}:`, error));
}

// Ajouter les écouteurs pour les boutons
document.getElementById('validerBtn').addEventListener('click', validerMot);
document.getElementById('supprimerBtn').addEventListener('click', supprimerMot);
