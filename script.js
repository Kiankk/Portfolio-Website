/**
 * Main script for the portfolio website.
 * Handles:
 * 1. Theme Toggling (Dark/Light Mode)
 * 2. Mobile Navigation Slide-in Menu
 * 3. Scroll-reveal Animations
 * 4. Hero Section Typewriter Effect
 * 5. Automatic Copyright Year Update
 */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Main initialization function. Runs when the DOM is fully loaded.
     */
    function init() {
        setupThemeToggle();
        setupMobileMenu();
        setupScrollAnimations();
        setupTypewriterEffect();
        updateCopyrightYear();
    }

    /**
     * Sets up the dark/light mode theme toggle functionality.
     * Persists the user's choice in localStorage.
     */
    function setupThemeToggle() {
        const themeButton = document.getElementById('theme-toggle');
        const body = document.body;
        
        if (!themeButton) return;

        // Apply saved theme on page load
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        }

        themeButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
        });
    }

    /**
     * Sets up the slide-in and slide-out functionality for the mobile menu.
     */
    function setupMobileMenu() {
        const menuButton = document.getElementById('menu-btn');
        const closeButton = document.getElementById('close-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        if (!menuButton || !closeButton || !mobileMenu) return;

        const openMenu = () => mobileMenu.classList.add('active');
        const closeMenu = () => mobileMenu.classList.remove('active');

        menuButton.addEventListener('click', openMenu);
        closeButton.addEventListener('click', closeMenu);
        mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
    }

    /**
     * Sets up the Intersection Observer to reveal elements as they are scrolled into view.
     */
    function setupScrollAnimations() {
        const hiddenElements = document.querySelectorAll('.hidden');
        if (hiddenElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        });

        hiddenElements.forEach((el) => observer.observe(el));
    }

    /**
     * Sets up the typewriter effect for the hero section subtitle.
     */
    function setupTypewriterEffect() {
        const typewriterSpan = document.querySelector('.typewriter-text');
        if (!typewriterSpan) return;
        
        const words = ["Developer.", "Creator.", "Python Expert.", "Tech Enthusiast."];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Deleting characters
                typewriterSpan.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Typing characters
                typewriterSpan.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            // If word is fully typed or deleted
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 2000); // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500); // Pause before typing new word
            } else {
                const typingSpeed = isDeleting ? 50 : 100;
                setTimeout(type, typingSpeed);
            }
        }
        
        type(); // Start the effect
    }

    /**
     * Updates the copyright year in the footer to the current year.
     */
    function updateCopyrightYear() {
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    // Run the main initialization function
    init();
});