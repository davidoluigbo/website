/* ===================================================================
   THEME TOGGLE
   Handles light/dark mode switching with localStorage persistence
   =================================================================== */

const themeToggle = (function() {
    'use strict';

    const THEME_KEY = 'theme';
    const THEME_LIGHT = 'light';
    const THEME_DARK = 'dark';

    /**
     * Get the current theme from localStorage or default to dark
     * @returns {string} Current theme ('light' or 'dark')
     */
    function getCurrentTheme() {
        return localStorage.getItem(THEME_KEY) || THEME_DARK;
    }

    /**
     * Apply theme to the document
     * @param {string} theme - Theme to apply ('light' or 'dark')
     */
    function applyTheme(theme) {
        const html = document.documentElement;
        const themeIcon = document.getElementById('theme-icon');
        const themeText = document.getElementById('theme-text');
        const themeButton = document.querySelector('.theme-toggle');

        if (!themeIcon || !themeText || !themeButton) {
            console.warn('Theme toggle elements not found');
            return;
        }

        if (theme === THEME_LIGHT) {
            html.setAttribute('data-theme', THEME_LIGHT);
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Light';
            themeButton.setAttribute('aria-pressed', 'true');
        } else {
            html.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Dark';
            themeButton.setAttribute('aria-pressed', 'false');
        }

        localStorage.setItem(THEME_KEY, theme);
    }

    /**
     * Toggle between light and dark themes
     */
    function toggle() {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
        applyTheme(newTheme);
    }

    /**
     * Initialize theme on page load
     */
    function init() {
        const savedTheme = getCurrentTheme();
        applyTheme(savedTheme);
    }

    // Public API
    return {
        init,
        toggle,
        getCurrentTheme
    };
})();

// Initialize theme when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', themeToggle.init);
} else {
    themeToggle.init();
}
