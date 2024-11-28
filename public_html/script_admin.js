// Variables globales
let motsJOSY = [];
let motsAValider = [];
let selectedWord = null;

// Charger les fichiers JSON au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    chargerMots('motsJOSY.json', 'motsJOSYList', motsJOSY);
    chargerMots('motsJOSY_A_VALIDER.json', 'motsAValiderList', motsAValider);
});


function chargerJSON() {
    return fetch('motsJOSY.json')
        .then(response => response.json()) // Convertir la réponse en JSON
        .then(data => {
            if (data && data.data) {
                // Utiliser seulement la partie 'data' du fichier
                console.log('Données chargées depuis motsJOSY.json:', data.data);
                return data.data; // Retourne uniquement le tableau des mots
            } else {
                throw new Error('Le fichier JSON n\'est pas au format attendu.');
            }
        })
        .catch(error => {
            console.error('Erreur lors du chargement des données:', error);
            throw error; // Propage l'erreur pour la gérer en aval si nécessaire
        });
}


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

                // Si la structure du fichier a une clé 'data', on l'extraie
                if (jsonData.data) {
                    // Si la clé 'data' existe, on utilise cette partie du JSON
                    motsArray.length = 0; // Vide le tableau existant
                    motsArray.push(...jsonData.data); // Ajoute les nouveaux éléments
                } else {
                    // Si le fichier est déjà un tableau, on le traite directement
                    motsArray.length = 0;
                    motsArray.push(...jsonData);
                }

                afficherMots(motsArray, listeId); // Affiche les mots si le parsing réussit
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

    const nouveauMot = { mot: selectedWord.mot, nombre: 1};
    motsJOSY.push(nouveauMot);

    sauvegarderFichier('motsJOSY.json', motsJOSY);
    sauvegarderFichier_2('motsJOSY_A_VALIDER.json', motsAValider);

    selectedWord = null;
    chargerMots('motsJOSY_A_VALIDER.json', 'motsAValiderList', motsAValider);
    chargerMots('motsJOSY.json', 'motsJOSYList', motsJOSY);
}

// Fonction pour supprimer un mot soit de motsJOSY_A_VALIDER.json, soit de motsJOSY.json
function supprimerMot() {
    if (!selectedWord) return alert('Veuillez sélectionner un mot.');

    // Vérifier où le mot a été sélectionné (dans motsJOSY_A_VALIDER ou motsJOSY)
    if (selectedWord.source === 'A_VALIDER') {
        // Le mot vient de motsJOSY_A_VALIDER.json
        motsAValider = motsAValider.filter(mot => mot.mot !== selectedWord.mot);
        sauvegarderFichier_2('motsJOSY_A_VALIDER.json', motsAValider);
    } else if (selectedWord.source === 'VALIDES') {
        // Le mot vient de motsJOSY.json
        motsAValider = motsAValider.filter(mot => mot.mot !== selectedWord.mot);
        sauvegarderFichier('motsJOSY.json', selectedWord.mot);
    }

    selectedWord = null;
    // Recharger la liste après suppression
    chargerMots('motsJOSY_A_VALIDER.json', 'motsAValiderList', motsAValider);
    chargerMots('motsJOSY.json', 'motsValidesList', motsValides); // Si vous avez cette liste à afficher
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

// Fonction pour télécharger un fichier JSON
function downloadFile(filename) {
    fetch(filename)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur lors du chargement du fichier ${filename}: ${response.statusText}`);
            }
            return response.blob(); // Retourne le contenu du fichier sous forme de blob
        })
        .then(blob => {
            // Crée une URL temporaire pour télécharger le fichier
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename; // Nom du fichier téléchargé
            document.body.appendChild(a);
            a.click(); // Déclenche le téléchargement
            a.remove(); // Supprime l'élément <a> temporaire
            URL.revokeObjectURL(url); // Libère l'URL temporaire
        })
        .catch(error => {
            console.error("Erreur lors du téléchargement :", error);
            alert(`Impossible de télécharger le fichier ${filename}.`);
        });
}


// Ajouter les écouteurs pour les boutons
document.getElementById('validerBtn').addEventListener('click', validerMot);
document.getElementById('supprimerBtn').addEventListener('click', supprimerMot);
