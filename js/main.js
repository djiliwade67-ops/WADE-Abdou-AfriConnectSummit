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