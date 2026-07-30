const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

function getPreferredTheme() {
    const saved = localStorage.getItem('bobtype-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('bobtype-theme', theme);
}

applyTheme(getPreferredTheme());

themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
});
