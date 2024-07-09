# Projet Automatiser des tests pour une boutique en ligne

## Introduction

Ce document vous guidera à travers l'installation, l'exécution du projet, l'exécution des tests Cypress et la génération de rapports.

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js et npm](https://nodejs.org/)

## Installation

### 1. Cloner le dépôt

1. Clonez le dépôt Git sur votre machine locale en utilisant la commande suivante :

`git clone https://github.com/aymericGodivier/Automatisez_des_tests_pour_une_boutique_en_ligne-main.git`

`cd votre-repo`

### 2. Installation des dépendances

Docker se charge de gérer les dépendances, pour cela effectuez les actions suivantes : 

1. Depuis un terminal ouvert dans le dossier du projet, lancer la commande : `sudo docker-compose up --build`

## Lancer avec Docker
 1. Utilisation de Docker Desktop

   Ouvrez Docker Desktop et assurez-vous qu'il est en cours d'exécution.

   Depuis le répertoire racine du projet, lancez la commande suivante pour construire et démarrer les conteneurs Docker :

`docker-compose up --build`

   Ou alors depuis l'application docker desktop, dans la liste des Containers, sélectionnez testeurlogic puis cliquez sur Start Selected Items

   Ensuite, ouvrez le site dans votre navigateur à l'adresse http://localhost:8080


## Exécution des Tests Cypress
1. Installer les dépendances

Si ce n'est pas déjà fait, installez les dépendances nécessaires pour Cypress :

```bash
npm install
```
2. Démarrer les tests Cypress

Pour exécuter les tests Cypress en mode headless (mode sans interface graphique) :

```bash
npx cypress run
```
Pour ouvrir l'interface graphique de Cypress et exécuter les tests :

```bash
npx cypress open
```
## Génération du Rapport
1. Générer le rapport de test Cypress

Vous pouvez générer un rapport à l'aide de Mochawesome :

```bash
npx cypress run --reporter mochawesome
```
Les rapports seront générés dans le dossier cypress/reports au format json ou html