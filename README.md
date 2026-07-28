# 🌍 AfriConnect Summit 2026 - Site Vitrine Panafricain

Bienvenue sur le dépôt du projet web **AfriConnect Summit 2026**, réalisé dans le cadre de l'examen de **Technologies Web (L1)** à l'**Groupe ISI**.

---

## 👤 Informations Candidat & Projet

* **Nom & Prénom :** Abdou WADE
* **Classe / Niveau :** Licence 1 - Groupe ISI
* **Enseignant :** M. Robert DIASSÉ
* **Lien GitHub Pages :** [https://djiliwade67-ops.github.io/WADE-Abdou-AfriConnectSummit/](https://djiliwade67-ops.github.io/WADE-Abdou-AfriConnectSummit/)
* **Dépôt GitHub :** [https://github.com/djiliwade67-ops/WADE-Abdou-AfriConnectSummit](https://github.com/djiliwade67-ops/WADE-Abdou-AfriConnectSummit)

---

## 📌 Présentation du Projet

**AfriConnect Summit** est la plateforme web officielle fictive d'une conférence tech panafricaine réunissant développeurs, entrepreneurs et investisseurs à travers le continent. 

Le site propose une expérience moderne, fluide et responsive (Dark/Light mode, animations au scroll, compte à rebours, filtres dynamiques, etc.) développée exclusivement avec les technologies web standards (HTML5, CSS3, JavaScript Vanilla), sans aucun framework ni bibliothèques tierces.

---

## 🚀 Fonctionnalités Implémentées

### 🎨 HTML5 & CSS3
* **Structure Sémantique :** Utilisation stricte des balises sémantiques (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* **Design System & Variables CSS (`:root`) :** Centralisation des couleurs, typographies, ombres et transitions via des Custom Properties.
* **Layouts Modernes :** Utilisation combinée de **CSS Grid** (grille d'intervenants, thématiques, chiffres clés) et **Flexbox** (navigation, sponsors, cartes et formulaires).
* **Responsive Design :** Adaptation fluide sur tous les écrans (Mobile 375px, Tablette 768px, Desktop 1200px+) via Media Queries.
* **Accordéon FAQ (CSS Pur) :** Système d'accordéon fonctionnel sans JavaScript (via l'attribut `:checked` / pseudo-classes CSS).

### ⚡ JavaScript Vanilla
1. **Dark Mode / Light Mode Persistant :** Bascule dynamique via l'attribut `data-theme` et sauvegarde des préférences dans le `localStorage`.
2. **Navbar Dynamique & Menu Hamburger :** Navigation réactive au défilement (effet au-delà de 80px) et menu mobile interactif.
3. **Compte à Rebours (Countdown Timer) :** Calcul en temps réel (Jours, Heures, Minutes, Secondes) mis à jour toutes les secondes jusqu'à la date de l'événement.
4. **Filtrage Dynamique des Intervenants :** Tri interactif des intervenants par catégorie (*IA & Tech, Business, Design, Data*) sans rechargement de page.
5. **Onglets Interactifs du Programme :** Gestion dynamique de l'affichage du planning par jour (Jour 1, Jour 2, Jour 3) avec styles dynamiques personnalisés par bouton (`:nth-child`).
6. **Compteurs Animés :** Statistique des chiffres clés incrémentées dynamiquement lors du défilement.
7. **Validation du Formulaire de Contact :** Contrôle rigoureux côté client (format email via Regex, longueur de téléphone et message, messages d'erreur et de succès stylisés).
8. **Animations au Scroll :** Apparition progressive des sections au survol via `IntersectionObserver`.
9. **Bouton Retour en Haut & Année Dynamique :** Défilement fluide vers le haut et copyright auto-actualisé dans le footer (`new Date().getFullYear()`).

---

## 🛠️ Technologies & Outils Utilisés

* **HTML5** (Structure et Accessibilité)
* **CSS3** (Stylisation, Custom Properties, Animations, Flexbox, CSS Grid)
* **JavaScript Vanilla (ES6+)** (Interactivité DOM, Événements, API Web)
* **Git & GitHub** (Gestion de version et hébergement via GitHub Pages)
* **Google Fonts** & **Bootstrap Icons** (Typographie et Iconographie)

---

## 📁 Arborescence du Projet

```text
WADE-Abdou-AfriConnectSummit/
│
├── index.html            # Page d'accueil (Hero, Compte à rebours, Chiffres, Sponsors)
├── programme.html        # Page du programme (Onglets par jour, Thématiques)
├── intervenants.html     # Page des speakers (Filtres dynamiques, Grille responsive)
├── contact.html          # Page d'inscription (Formulaire validé, FAQ CSS, Carte)
│
├── css/
│   └── style.css         # Styles globaux, variables CSS, Dark Mode, Media Queries
│
├── js/
│   └── main.js           # Logique JavaScript complète (DOM, Filtres, Formulaire, Timer)
│
├── images/               # Ressources d'images optimisées
│
└── README.md             # Documentation du projet