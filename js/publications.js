/* ===================================================================
   PUBLICATIONS
   Handles publication rendering and filtering
   =================================================================== */

const publicationsModule = (function() {
    'use strict';

    let currentFilter = 'all';

    /**
     * Render a single publication item
     * @param {Object} pub - Publication data
     * @returns {string} HTML string for publication
     */
    function renderPublicationItem(pub) {
        const tags = pub.tags.map(tag => 
            `<span class="pub-tag">${tag}</span>`
        ).join('');

        return `
            <article class="pub-item" data-category="${pub.category}">
                <h3>${pub.title}</h3>
                <p class="pub-meta">${pub.journal} | ${pub.year}</p>
                <div class="pub-tags">
                    ${tags}
                </div>
                <p style="margin-top: 0.8rem;">
                    <a href="${pub.url}" target="_blank" rel="noopener noreferrer" class="pub-link">
                        <i class="fas fa-external-link-alt" aria-hidden="true"></i> Read Paper
                    </a>
                </p>
            </article>
        `;
    }

    /**
     * Render all publications
     */
    function renderPublications() {
        const container = document.getElementById('publications-grid');
        if (!container || !DATA || !DATA.publications) {
            console.warn('Publications container or data not found');
            return;
        }

        const html = DATA.publications.map(pub => renderPublicationItem(pub)).join('');
        container.innerHTML = html;
    }

    /**
     * Filter publications by category
     * @param {string} category - Category to filter by ('all' or specific category)
     */
    function filterPublications(category) {
        currentFilter = category;
        
        const items = document.querySelectorAll('.pub-item');
        const buttons = document.querySelectorAll('.filter-btn');

        // Update active button
        buttons.forEach(btn => {
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Filter items
        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    /**
     * Setup filter button event listeners
     */
    function setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                filterPublications(category);
            });
        });
    }

    /**
     * Initialize publications module
     */
    function init() {
        renderPublications();
        setupFilters();
    }

    // Public API
    return {
        init,
        filter: filterPublications
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', publicationsModule.init);
} else {
    publicationsModule.init();
}
