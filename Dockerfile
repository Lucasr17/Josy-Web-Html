# Utilisation d'une image de base légère
FROM node:14-alpine

# Création du répertoire de l'application
WORKDIR /app

# Copie de package.json et package-lock.json
COPY package*.json ./

# Installation des dépendances
RUN npm install --production

# Copie du reste des fichiers
COPY . .

# Exposition du port (si nécessaire)
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "index.js"]
