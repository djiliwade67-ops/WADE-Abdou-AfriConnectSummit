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