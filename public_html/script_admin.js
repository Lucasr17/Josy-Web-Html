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
        .then(response => response.json())
        .then(data => {
            motsArray.push(...data);
            afficherMots(data, listeId);
        })
        .catch(error => console.error(`Erreur lors du chargement de ${fichier}:`, error));
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
    sauvegarderFichier('motsJOSY_A_VALIDER.json', motsAValider);

    selectedWord = null;
    chargerMots('motsJOSY_A_VALIDER.json', 'motsAValiderList', motsAValider);
    chargerMots('motsJOSY.json', 'motsJOSYList', motsJOSY);
}

// Supprimer un mot de motsJOSY_A_VALIDER.json
function supprimerMot() {
    if (!selectedWord) return alert('Veuillez sélectionner un mot.');
    motsAValider = motsAValider.filter(mot => mot !== selectedWord);

    sauvegarderFichier('motsJOSY_A_VALIDER.json', motsAValider);

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

// Ajouter les écouteurs pour les boutons
document.getElementById('validerBtn').addEventListener('click', validerMot);
document.getElementById('supprimerBtn').addEventListener('click', supprimerMot);
