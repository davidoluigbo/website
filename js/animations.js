/* ===================================================================
   ANIMATIONS
   Handles typing animation, particles, and scroll reveals
   =================================================================== */

const animations = (function() {
    'use strict';

    // Typing Animation Configuration
    const TYPING_CONFIG = {
        texts: [
            "Artificial Intelligence | Machine Learning | Neuroscience",
            "Bridging AI and Healthcare",
            "Medical Imaging & Diagnostics"
        ],
        typingSpeed: 80,
        deletingSpeed: 50,
        pauseTime: 2000
    };

    // Particle Configuration
    const PARTICLE_CONFIG = {
        count: 15,
        minDuration: 15,
        maxDuration: 25
    };

    /**
     * Typing Animation
     */
    const typingAnimation = {
        textIndex: 0,
        charIndex: 0,
        isDeleting: false,
        element: null,

        init() {
            this.element = document.getElementById('typed-text');
            if (this.element) {
                setTimeout(() => this.type(), 500);
            }
        },

        type() {
            if (!this.element) return;

            const currentText = TYPING_CONFIG.texts[this.textIndex];

            if (this.isDeleting) {
                this.element.textContent = currentText.substring(0, this.charIndex - 1);
                this.charIndex--;
            } else {
                this.element.textContent = currentText.substring(0, this.charIndex + 1);
                this.charIndex++;
            }

            if (!this.isDeleting && this.charIndex === currentText.length) {
                setTimeout(() => {
                    this.isDeleting = true;
                }, TYPING_CONFIG.pauseTime);
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % TYPING_CONFIG.texts.length;
            }

            const speed = this.isDeleting 
                ? TYPING_CONFIG.deletingSpeed 
                : TYPING_CONFIG.typingSpeed;

            setTimeout(() => this.type(), speed);
        }
    };

    /**
     * Particle Animation
     */
    const particles = {
        init() {
            const container = document.getElementById('particles');
            if (!container) return;

            for (let i = 0; i < PARTICLE_CONFIG.count; i++) {
                this.createParticle(container);
            }
        },

        createParticle(container) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = 
                (PARTICLE_CONFIG.minDuration + Math.random() * 
                (PARTICLE_CONFIG.maxDuration - PARTICLE_CONFIG.minDuration)) + 's';
            container.appendChild(particle);
        }
    };

    /**
     * Timeline Scroll Reveal
     */
    const timelineReveal = {
        items: null,
        observer: null,

        init() {
            this.items = document.querySelectorAll('.timeline-item');
            if (!this.items.length) return;

            // Use Intersection Observer for better performance
            if ('IntersectionObserver' in window) {
                this.setupObserver();
            } else {
                // Fallback for older browsers
                this.setupScrollListener();
            }
        },

        setupObserver() {
            const options = {
                threshold: 0.2,
                rootMargin: '0px 0px -20% 0px'
            };

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, options);

            this.items.forEach(item => this.observer.observe(item));
        },

        setupScrollListener() {
            const revealOnScroll = () => {
                const windowHeight = window.innerHeight;

                this.items.forEach(item => {
                    const itemTop = item.getBoundingClientRect().top;
                    if (itemTop < windowHeight * 0.8) {
                        item.classList.add('visible');
                    }
                });
            };

            window.addEventListener('scroll', debounce(revealOnScroll, 100));
            window.addEventListener('load', revealOnScroll);
            revealOnScroll(); // Initial check
        }
    };

    /**
     * Debounce utility function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Milliseconds to wait
     * @returns {Function} Debounced function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Initialize all animations
     */
    function init() {
        typingAnimation.init();
        particles.init();
        timelineReveal.init();
    }

    // Public API
    return {
        init
    };
})();

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animations.init);
} else {
    animations.init();
}
