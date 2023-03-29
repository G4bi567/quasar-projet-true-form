# Création d'un forum d'entraide pour les étudiants du Collège du Sud

Dans ce forum d'aide aux étudiants, les membres peuvent poser des questions relatives à un sujet, une matière ou un cours particulier, et d'autres étudiants peuvent fournir des réponses ou des conseils basés sur leurs propres expériences ou connaissances. Les membres peuvent également publier des liens vers des ressources utiles, telles que des articles, des vidéos ou des sites Web universitaires, qui peuvent être utiles aux autres étudiants.

## Installation pour un connaisseur

### Installation et mise en route du projet sur un éditeur

Pour lancer ce projet , il suffit de se trouver dans un terminal disposant de la commande `git`, `yarn` et de faire

```bash
# Cloner le dépôt
git clone https://github.com/G4bi567/quasar-projet-true-form

# Installation de Sphinx et autres dépendances
yarn install

# Lancer le projet
quasar dev
```

## Installation pour un novice

### Cloner le dépôt

Le plus simple, pour démarrer, est de forker ce dépôt dans votre propre compte
GitHub et cloner ce dernier sur votre machine locale ou dans un IDE en ligne tel que Gitpod.

## Installation sur Gitpod

Voici les étapes à suivre:

1. Forker le dépôt https://github.com/G4bi567/quasar-projet-true-form dans
   votre compte GitHub.

2. Ouvrir votre version du dépôt sur GitHub et, dans la barre d'adresse du
   navigateur Web, rajouter `https://gitpod.io#` tout à gauche de l'adresse de
   votre dépôt GitHub. Pour que cela fonctionne, vous devez avoir un compte sur la plateforme https://gitpod.io/.

3. Dans Gitpod, il faut commencer par installer les dépendances avec

   ```bash
   yarn install
   ```

4. Vous pouvez ensuite générer lancer le projet avec

   ```bash
   quasar dev
   ```

## Installation sur un VSC

Afin de pouvoir lancer le projet sur un ordinateur, il faut respecter une série d’étapes. Si Visual Studio Code est déjà installé, le numéro 1 n’a pas besoin d’être fait. Si Node.Js l’est aussi, le numéro 2 n’a non plus besoin d’être fait.

1. Télécharger et installer {index}`Visual Studio code`. Le fichier .exe peut être retrouvé sur le site officiel : https://code.visualstudio.com/ ; il faut choisir la version adaptée au système d’exploitation de l'ordinateur, comme Windows, MacOs, Linux.

Visual Studio Code, souvent abrégé en VSCode, est un logiciel libre de Microsoft pour Windows, Linux et MacOS. Il est conçu pour aider les développeurs à créer, déboguer et déployer des applications logicielles. VSCode offre des fonctionnalités telles que la complétion de code, la prise en charge du débogage, la refactorisation du code, l’intégration de systèmes de contrôle tel que Git, la prise en charge des extensions, etc. Il prend également en charge de nombreux langages de programmation, notamment C++, Python, HTML, CSS, JavaScript, TypeScript, etc. Un des points les plus avantageux est le grand nombre d’extensions, qui permet aux développeurs de personnaliser leur environnement de travail et d’améliorer leurs productivités.

2. Télécharger et installer Node.Js, grâce au lien suivant : https://nodejs.org/en/download.
   Pour l’installation, il faut accepter des modifications en tant qu’administrateur.

Node.js est un environnement d’exécution JavaScript côté serveur. Grâce à ce framework, les développeurs disposent d’un interpréter du code JavaScript en dehors du navigateur. La distribution de Node.js intègre NPM, ou Node Package Manager. NPM est un gestionnaire de paquets pour Node.js qui permet aux développeurs de gérer facilement les dépendances de leur projet. NPM facilite l’installation, la mise à jour et la suppression des paquets et des modules nécessaires à un projet. Cela permet aux développeurs de créer des applications de bureau multiplateformes à l’aide de technologies Web telles que HTML, CSS et JavaScript.

3. Faire une vérification pour savoir si Node.js et NPM sont correctement installés. Il faut ouvrir le terminal sur Visual Studio Code en allant sur Affichage > Terminal ou Terminal > Nouveau Terminal. Puis il faut écrire les deux commandes suivantes séparément et ensuite, il faut appuyer sur enter.

   ```bash

   node -v

   ```

   ```bash

   npm -v

   ```

   Ces deux commandes permettent de donner la version de Node.js et NPM.

4. Installer yarn avec le terminal en écrivant le code suivant et en appuyant sur enter:

   ```bash

	npm install --global yarn

	```

Yarn est un gestionnaire de paquets pour JavaScript, créé par Facebook, et est compatible avec NPM et Node.js. Un des avantages par rapport à NPM est le fait qu’il arrive à installer les dépendances et les paquets plus rapidement.

5. Télécharger et extraire le code du projet sur https://github.com/G4bi567/quasar-projet-true-form. Il faut ensuite ouvrir le dossier en le glissant dans Visual Studio Code ou en allant dans Fichier > Ouvrir le dossier > ... et en choisissant le dossier du travail. Ce projet est stocké sur GitHub, si Git est installé sur la machine utilisée, il est aussi possible d'utiliser la commande suivante dans le terminal dans le but d'installer le projet :

	```bash
	git clone https://github.com/G4bi567/quasar-projet-true-form
	```

6.	Installer les indépendances avec le terminal en écrivant:
   ```bash
	yarn install
	```


7.	Pour accéder au projet, il faut exécuter dans le terminal:
   
   ```bash
	quasar dev
	```

Cela démarre le serveur de développement. Finalement, un nouvel onglet s’ouvre. Cependant si rien ne s’ouvre, il faut appuyer sur « ctrl +click » dans le terminal sur http://localhost... .

## Contributing

Ceci est un projet pour un travail de maturité.
