#!/bin/bash

# Script pour installer les dépendances et démarrer les services

# Dossier du backend (ExpressJS)
backend_dir="./Back_End"

# Dossier du frontend (Angular)
frontend_dir="./Front_End"

# Fonction pour installer les dépendances
install_dependencies() {
  echo "Installation des dépendances..."
  cd $1
  npm install
  cd -
}

# Fonction pour démarrer le service
start_service() {
  echo "Démarrage du service..."
  cd $1
  npm start &
  cd -
}

# Installer les dépendances pour le backend
install_dependencies $backend_dir

# Installer les dépendances pour le frontend
install_dependencies $frontend_dir

# Démarrer le backend
start_service $backend_dir

# Attendre quelques secondes pour s'assurer que le backend a démarré avant de démarrer le frontend
sleep 10

# Démarrer le frontend
start_service $frontend_dir

echo "Services démarrés avec succès."
