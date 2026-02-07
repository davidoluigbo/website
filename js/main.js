/* ===================================================================
   MAIN
   General utilities and initialization
   =================================================================== */

(function() {
    'use strict';

    /**
     * Render skills from data
     */
    function renderSkills() {
        const container = document.getElementById('skills-grid');
        if (!container || !DATA || !DATA.skills) {
            console.warn('Skills container or data not found');
            return;
        }

        const html = DATA.skills.map(skill => 
            `<div class="skill-tag">${skill}</div>`
        ).join('');
        
        container.innerHTML = html;
    }

    /**
     * Update current year in footer
     */
    function updateCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    /**
     * Setup smooth scrolling for anchor links
     */
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Ignore empty hash
                if (href === '#') {
                    e.preventDefault();
                    return;
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Setup info button tooltips with proper accessibility
     */
    function setupInfoTooltips() {
        const infoButtons = document.querySelectorAll('.info-btn');
        
        infoButtons.forEach(button => {
            const tooltip = button.nextElementSibling;
            
            if (tooltip && tooltip.classList.contains('info-box')) {
                // Click handler for mobile
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const isExpanded = button.getAttribute('aria-expanded') === 'true';
                    button.setAttribute('aria-expanded', !isExpanded);
                    tooltip.style.display = isExpanded ? 'none' : 'block';
                });

                // Keyboard accessibility
                button.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        button.click();
                    }
                });

                // Mouse events for desktop
                button.addEventListener('mouseenter', () => {
                    tooltip.style.display = 'block';
                    button.setAttribute('aria-expanded', 'true');
                });

                button.addEventListener('mouseleave', () => {
                    tooltip.style.display = 'none';
                    button.setAttribute('aria-expanded', 'false');
                });

                // Close on focus loss
                button.addEventListener('blur', () => {
                    setTimeout(() => {
                        if (!tooltip.matches(':hover')) {
                            tooltip.style.display = 'none';
                            button.setAttribute('aria-expanded', 'false');
                        }
                    }, 100);
                });
            }
        });
    }

    /**
     * Close tooltips when clicking outside
     */
    function setupOutsideClickHandler() {
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.info-btn') && !e.target.closest('.info-box')) {
                document.querySelectorAll('.info-box').forEach(tooltip => {
                    tooltip.style.display = 'none';
                });
                document.querySelectorAll('.info-btn').forEach(btn => {
                    btn.setAttribute('aria-expanded', 'false');
                });
            }
        });
    }

    /**
     * Handle keyboard navigation
     */
    function setupKeyboardNavigation() {
        // Escape key to close tooltips
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.info-box').forEach(tooltip => {
                    tooltip.style.display = 'none';
                });
                document.querySelectorAll('.info-btn').forEach(btn => {
                    btn.setAttribute('aria-expanded', 'false');
                });
            }
        });
    }

    /**
     * Error boundary - catch any uncaught errors
     */
    function setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('An error occurred:', e.error);
            // In production, you might want to log this to a service
        });
    }

    /**
     * Initialize all main functionality
     */
    function init() {
        try {
            renderSkills();
            updateCurrentYear();
            setupSmoothScrolling();
            setupInfoTooltips();
            setupOutsideClickHandler();
            setupKeyboardNavigation();
            setupErrorHandling();
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
