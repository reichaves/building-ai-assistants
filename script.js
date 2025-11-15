// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Insert hamburger before nav menu
    navMenu.parentNode.insertBefore(hamburger, navMenu);
    
    // Toggle menu on click
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
};

// Initialize mobile menu on small screens
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Reinitialize on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const existingHamburger = document.querySelector('.hamburger');
        if (window.innerWidth <= 768 && !existingHamburger) {
            createMobileMenu();
        } else if (window.innerWidth > 768 && existingHamburger) {
            existingHamburger.remove();
            document.querySelector('.nav-menu').classList.remove('active');
        }
    }, 250);
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.card, .benefit-card, .warning-card, .platform-card, .recipe-card, .example-card, .next-step-card');
    elementsToAnimate.forEach(el => observer.observe(el));
});

// Back to Top Button
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.classList.add('back-to-top');
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(button);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });

    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createBackToTopButton();

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Press 'h' to go to home
    if (e.key === 'h' || e.key === 'H') {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'r' to go to resources
    if (e.key === 'r' || e.key === 'R') {
        document.querySelector('#resources').scrollIntoView({ behavior: 'smooth' });
    }
});

// External link indicator
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
    if (!link.querySelector('.external-icon')) {
        const icon = document.createElement('span');
        icon.classList.add('external-icon');
        icon.innerHTML = ' ↗';
        link.appendChild(icon);
    }
});

// Add loading state for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        this.style.opacity = '0.6';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 1000);
    });
});

// Print functionality
const addPrintButton = () => {
    const printBtn = document.createElement('button');
    printBtn.classList.add('print-btn');
    printBtn.innerHTML = '🖨️ Print';
    printBtn.setAttribute('aria-label', 'Print this page');
    
    const footer = document.querySelector('footer .container');
    if (footer) {
        footer.insertBefore(printBtn, footer.firstChild);
    }
    
    printBtn.addEventListener('click', () => {
        window.print();
    });
};

addPrintButton();

// Console welcome message
console.log('%c Building an AI Assistant for Investigative Journalists', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%c GIJC25 Workshop by Reinaldo Chaves & Rune Ytreberg', 'font-size: 14px; color: #6b7280;');
console.log('%c Learn more: https://gijc2025.org/', 'font-size: 12px; color: #7c3aed;');
