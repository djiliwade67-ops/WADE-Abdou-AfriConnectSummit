// --- Menu hamburger responsive ---
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.querySelector('header nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('nav-open');
        menuToggle.classList.toggle('active');
    });

    document.querySelectorAll('header nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('nav-open');
            menuToggle.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
            mainNav.classList.remove('nav-open');
            menuToggle.classList.remove('active');
        }
    });
}

// --- Dark mode toggle ---
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    if (themeToggle) {
        themeToggle.classList.remove('fa-moon', 'fa-sun');
        themeToggle.classList.add(theme === 'dark' ? 'fa-sun' : 'fa-moon');
    }
    localStorage.setItem('africonnect-theme', theme);
}

const savedTheme = localStorage.getItem('africonnect-theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = htmlEl.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// --- Navbar : effet au scroll ---
const header = document.querySelector('header');
const backToTop = document.getElementById('back-to-top');

function handleScroll() {
    const scrolled = window.scrollY > 50;

    if (header) header.classList.toggle('scrolled', scrolled);

    if (backToTop) {
        backToTop.classList.toggle('visible', window.scrollY > 400);
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- COMPTEURS ANIMÉS ---
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const startTime = performance.now();

    function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - (1 - progress) * (1 - progress);
        el.textContent = Math.floor(eased * target);

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = target;
        }
    }
    requestAnimationFrame(tick);
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (prefersReducedMotion) {
                entry.target.textContent = entry.target.dataset.target;
            } else {
                animateCounter(entry.target);
            }
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// --- FADE-IN AU SCROLL ---
document.querySelectorAll('main section').forEach(section => {
    section.classList.add('fade-in');
});

const cardGroupsSelectors = [
    '.chiffre-cles .chiffres',
    '.participer-list > div',
    '.intervenants-list .intervenant',
    '.carts .intervenant',
    '.thematique > div',
    '.jour .horaires > div',
    '.faq details',
    '.contact-info > div'
];

cardGroupsSelectors.forEach(selector => {
    const items = document.querySelectorAll(selector);
    items.forEach((item, index) => {
        item.classList.add('fade-in-item');
        item.style.transitionDelay = prefersReducedMotion ? '0s' : `${Math.min(index * 0.08, 0.5)}s`;
    });
});

const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in, .fade-in-item').forEach(el => fadeObserver.observe(el));

// --- FORMULAIRE (Protéger par IF pour éviter le blocage JS sur d'autres pages) ---
let form = document.querySelector(".form-card");
let nom = document.getElementById("nom");
let email = document.getElementById("email");
let succes = document.getElementById("succes");
let prenom = document.getElementById("prenom");
let message = document.getElementById("message");
let selection = document.getElementById("info");
let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (nom && nom.value.length < 2) {
            document.getElementById("erreur-nom").textContent = "Le nom doit contenir au moins 2 caractères.";
            document.getElementById("erreur-nom").style.color = "red";
            nom.style.border = "1px solid red";
        } else if (nom) {
            document.getElementById("erreur-nom").textContent = "";
            nom.style.border = "1px solid green";
        }

        if (prenom && prenom.value.length < 2) {
            document.getElementById("erreur-prenom").textContent = "Le prénom doit contenir au moins 2 caractères.";
            document.getElementById("erreur-prenom").style.color = "red";
            prenom.style.border = "1px solid red";
        } else if (prenom) {
            document.getElementById("erreur-prenom").textContent = "";
            prenom.style.border = "1px solid green";
        }

        if (email && regex.test(email.value)) {
            document.getElementById("erreur-email").textContent = "";
            email.style.border = "1px solid green";
        } else if (email) {
            document.getElementById("erreur-email").textContent = "Email incorrect";
            document.getElementById("erreur-email").style.color = "red";
            email.style.border = "1px solid red";
        }

        if (message && message.value.length < 19) {
            document.getElementById("erreur-message").textContent = "Le message ne doit pas faire moins de 20 caractères";
            document.getElementById("erreur-message").style.color = "red";
            message.style.border = "1px solid red";
        } else if (message) {
            document.getElementById("erreur-message").textContent = "";
            message.style.border = "1px solid green";
        }

        if (selection && selection.value == "demande") {
            document.getElementById("erreur-info").textContent = "Veuillez faire un choix";
            document.getElementById("erreur-info").style.color = "red";
            selection.style.border = "1px solid red";
        } else if (selection) {
            document.getElementById("erreur-info").textContent = "";
            selection.style.border = "1px solid green";
        }

        if (nom && email && prenom && message && selection &&
            nom.value !== "" && regex.test(email.value) && prenom.value !== "" && message.value !== "" && selection.value !== "demande") {
            if (succes) {
                succes.textContent = "Formulaire envoyé";
                succes.classList.add("visible");
            }
            form.style.border = "1px solid green";
        }
    });
}

let emailInput = document.getElementById("email1");
let erreurEmail = document.getElementById("erreur-email");
let envoyerBtn = document.getElementById("envoyer");

if (envoyerBtn && emailInput) {
    envoyerBtn.addEventListener("click", function () {
        if (regex.test(emailInput.value)) {
            emailInput.style.border = "1px solid green";
        } else {
            if (erreurEmail) erreurEmail.textContent = "Email incorrect";
            emailInput.style.border = "1px solid red";
        }
    });
}

// --- FILTRE DES CARTES ET DES EVENEMENTS ---
let bouttons = document.querySelectorAll(".filtres .bouton");
let cartes = document.querySelectorAll(".carts .intervenant");

if (bouttons.length > 0 && cartes.length > 0) {
    bouttons.forEach(function (bouton) {
        bouton.addEventListener("click", function () {
            // Activer le bouton cliqué
            bouttons.forEach(function (b) {
                b.classList.remove("active");
            });
            bouton.classList.add("active");

            let categorie = bouton.dataset.categorie;

            // Masquer/Afficher les cartes
            cartes.forEach(function (carte) {
                let categorieCarte = carte.dataset.categorie;

                if (categorie === "tous" || categorie === categorieCarte) {
                    carte.style.display = "block"; // Affiche la carte
                    carte.classList.add("visible"); // Garde la carte visible malgré les animations
                    carte.style.opacity = "1";
                } else {
                    carte.style.display = "none"; // Cache la carte
                }
            });
        });
    });
}
  //DES EVENEMENTS ---
let boutonsJours = document.querySelectorAll(".jours .time");
let cartesHoraires = document.querySelectorAll(".horaires .event");

if (boutonsJours.length > 0 && cartesHoraires.length > 0) {

    // Fonction de filtrage
    function filtrerProgramme(categorieActive) {
        cartesHoraires.forEach(function (carte) {
            if (carte.dataset.categorie === categorieActive) {
                carte.style.display = ""; // Réinitialise au style CSS d'origine (Flex, Grid, etc.)
                carte.classList.add("visible");
                carte.style.opacity = "1";
            } else {
                carte.style.display = "none";
            }
        });
    }

    // 1. Initialisation : Filtrer dès le chargement (affiche le Jour 1 par défaut)
    let boutonActif = document.querySelector(".jours .time.active") || boutonsJours[0];
    boutonActif.classList.add("active");
    filtrerProgramme(boutonActif.dataset.categorie);

    // 2. Gestion du clic sur les boutons
    boutonsJours.forEach(function (bouton) {
        bouton.addEventListener("click", function () {
            // Retirer l'état actif des autres boutons
            boutonsJours.forEach(b => b.classList.remove("active"));
            
            // Activer le bouton cliqué
            bouton.classList.add("active");

            // Exécuter le filtre
            let categorie = bouton.dataset.categorie;
            filtrerProgramme(categorie);
        });
    });
}

// --- COMPTE À REBOURS ---

// 1. Définir la date cible de l'événement (Année, Mois-1, Jour, Heure, Min)
// Attention : Les mois en JS commencent à 0 (0 = Janvier, 9 = Octobre)
const dateCible = new Date(2026, 9, 3, 9, 0, 0).getTime(); 

// Sélection des éléments HTML
const elJours = document.getElementById("jours");
const elHeures = document.getElementById("heures");
const elMinutes = document.getElementById("minutes");
const elSecondes = document.getElementById("secondes");

function mettreAJourCompteARebours() {
    const maintenant = new Date().getTime();
    const ecart = dateCible - maintenant;

    // Si la date est dépassée
    if (ecart <= 0) {
        if (elJours) elJours.textContent = "00";
        if (elHeures) elHeures.textContent = "00";
        if (elMinutes) elMinutes.textContent = "00";
        if (elSecondes) elSecondes.textContent = "00";
        return;
    }

    // Calculs mathématiques pour jours, heures, minutes et secondes
    const jours = Math.floor(ecart / (1000 * 60 * 60 * 24));
    const heures = Math.floor((ecart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ecart % (1000 * 60 * 60)) / (1000 * 60));
    const secondes = Math.floor((ecart % (1000 * 60)) / 1000);

    // Formatage avec un zéro devant si le chiffre est inférieur à 10 (ex: "08")
    if (elJours) elJours.textContent = jours < 10 ? `0${jours}` : jours;
    if (elHeures) elHeures.textContent = heures < 10 ? `0${heures}` : heures;
    if (elMinutes) elMinutes.textContent = minutes < 10 ? `0${minutes}` : minutes;
    if (elSecondes) elSecondes.textContent = secondes < 10 ? `0${secondes}` : secondes;
}

// Vérifie que les éléments existent sur la page avant de lancer le timer
if (elJours && elHeures && elMinutes && elSecondes) {
    // Exécution immédiate au chargement
    mettreAJourCompteARebours();
    
    // Mettre à jour le compte à rebours toutes les 1000 ms (1 seconde)
    setInterval(mettreAJourCompteARebours, 1000);
}