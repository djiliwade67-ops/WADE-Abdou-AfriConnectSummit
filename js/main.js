// --- Menu hamburger responsive ---
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.querySelector('header nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('nav-open');
        menuToggle.classList.toggle('active');
    });

    // Ferme le menu quand on clique sur un lien
    document.querySelectorAll('header nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('nav-open');
            menuToggle.classList.remove('active');
        });
    });

    // Ferme le menu si on clique en dehors
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

// Init au chargement (préférence sauvegardée ou système)
const savedTheme = localStorage.getItem('africonnect-theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = htmlEl.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// --- Navbar : effet au scroll (shrink + ombre + fond) ---
const header = document.querySelector('header');
const backToTop = document.getElementById('back-to-top');

function handleScroll() {
    const scrolled = window.scrollY > 50;

    header.classList.toggle('scrolled', scrolled);

    if (backToTop) {
        backToTop.classList.toggle('visible', window.scrollY > 400);
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll(); // état initial au chargement (si on recharge en plein milieu de page)

// --- Bouton Retour en haut : clic ---
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================================================
// COMPTEURS ANIMÉS AU SCROLL
// ==========================================================
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800; // ms
    const startTime = performance.now();

    function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        // easeOutQuad pour un mouvement plus naturel
        const eased = 1 - (1 - progress) * (1 - progress);
        el.textContent = Math.floor(eased * target);

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = target; // valeur exacte à la fin
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


// ==========================================================
// FADE-IN AU SCROLL (sections + cartes en cascade)
// ==========================================================

// Sections principales : fade-in simple
document.querySelectorAll('main section').forEach(section => {
    section.classList.add('fade-in');
});

// Groupes de cartes : fade-in en cascade (stagger)
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

// Un seul observer pour tous les éléments fade-in / fade-in-item
const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in, .fade-in-item').forEach(el => fadeObserver.observe(el));

