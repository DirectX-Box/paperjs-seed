# Plan Paper.js

Cours d'architecture — Programmation orientée objet

# Exécution

* NodeJS est requis.

```
git clone "https://github.com/DirectX-Box/paperjs-seed.git"
cd "paperjs-seed"
npm install
npm run serve
```

## Répartition

### Partie logique

La partie logique fournit le modèle et le contrôleur du logiciel.  

Elle est contenue dans le répertoire `src\objects` et est indépendante 
de l'interface PaperJS.  

Cette partie du code est conçue pour être ré-utilisable indépendamment 
des autres modules. Elle permet aussi de formaliser les objets métier et 
de les « sérialiser » indépendamment de PaperJS. Ainsi, les sauvegardes des 
plans ne sont pas liées à PaperJS.

Les objets ne sont pas codés en dur dans le code. Afin de permettre l'ajout 
d'éléments sans modifier le code source, les objets sont analysés au lancement 
depuis le fichier `src\objects\objects.json`, qui définit les catégories d'objets 
ainsi que les objets eux-mêmes.  
Les objets peuvent posséder un nombre arbitraire de sommets, qui peuvent être 
échelonnés (*scaled*) sur l'axe horizontal ou vertical à volonté dans le logiciel.

### Partie affichage

L'affichage des objets est géré à travers une classe « Adaptateur » 
appelée par le contrôleur. Ce code est situé dans `src\objects\adapters`.  

Le reste de l'application ne peut pas accéder directement à cet adaptateur. 
L'architecture impose au module d'entrée utilisateur de passer par 
le contrôleur "ObjectInstancesManager" pour gérer les objets.

### Partie entrée utilisateur

Bien que le contrôleur soit nécessaire pour instancier et gérer les objets, 
il est possible pour le module d'affichage de gérer lui-même certaines étapes 
telles que le dessin. Par exemple, il n'est pas utile d'imposer au contrôleur 
le redimensionnement d'un objet pixel par pixel, surtout que le placement peut 
être invalide ; ainsi, la gestion de l'entrée utilisateur se fait principalement 
au travers de la classe Plan, qui connecte les outils de dessin au contrôleur.

C'est aussi le Plan qui initialise certains outils de l'interface en fonction 
des données fournies par la partie logique. La barre d'outils est générée 
dynamiquement en fonction des objets analysés par le contrôleur.