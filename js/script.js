/* ─────────────────────────────────────────────
   skuwii.github.io · interaction layer
   ───────────────────────────────────────────── */

// ─── Smooth scroll for in-page anchors ───
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ─── Navbar state on scroll ───
const navbar = document.querySelector('.navbar');
const onScroll = () => {
    if (window.scrollY > 8) {
        navbar.style.borderBottomColor = 'var(--border)';
        navbar.style.background = 'rgba(14, 15, 17, 0.92)';
    } else {
        navbar.style.borderBottomColor = 'var(--border-subtle)';
        navbar.style.background = 'rgba(14, 15, 17, 0.85)';
    }
};
window.addEventListener('scroll', onScroll, { passive: true });

// ─── Active section highlighting in nav ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const setActive = (id) => {
    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.style.color = isActive ? 'var(--azure)' : '';
    });
};

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(entry.target.id);
        });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
);

sections.forEach((section) => navObserver.observe(section));

// ─── Reveal-on-scroll (re-triggers) ───
// Toggles `.is-visible` based on whether element is in viewport.
// Animation replays every time element enters/leaves.
// Honors prefers-reduced-motion via CSS.
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-reveal]').forEach((el) => {
    revealObserver.observe(el);
});

// ─── Auto-update footer year ───
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

console.log(
    '%cS%c · skuwii.github.io',
    'color: #2980d4; font-weight: bold; font-size: 1.2em',
    'color: #7a7f8a'
);
