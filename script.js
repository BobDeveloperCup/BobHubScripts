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

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = htmlEl.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
}

function copyBookmarklet(id, btn) {
    const input = document.getElementById(id);
    if (!input) return;
    navigator.clipboard.writeText(input.value).then(() => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copiado!`;
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.classList.remove('copied');
        }, 2000);
    });
}

async function loadBookmarkletCode() {
    const input = document.getElementById('bm-bobtool');
    if (!input) return;
    try {
        const response = await fetch('https://cdn.jsdelivr.net/gh/BobDeveloperCup/BobHubScripts@main/Bookmarklet.js');
        if (response.ok) {
            const code = await response.text();
            input.value = code.trim();
        } else {
            throw new Error();
        }
    } catch (e) {
        input.value = "javascript:(function(){var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/BobDeveloperCup/BobHubScripts@main/Bookmarklet.js';document.body.appendChild(s);})();";
    }
}

document.addEventListener('DOMContentLoaded', loadBookmarkletCode);
