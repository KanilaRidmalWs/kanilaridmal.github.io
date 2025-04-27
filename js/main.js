document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const body = document.body;
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Close mobile menu if it's open
            if (navLinksContainer.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                body.classList.remove('menu-open');
            }
            
            // Smooth scroll to section
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });
    
    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navHeight = document.querySelector('nav').offsetHeight;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - navHeight - 10) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add fade-in animation for sections
    const allSections = document.querySelectorAll('.section');
    
    const revealSection = function(entries, observer) {
        const [entry] = entries;
        
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            observer.unobserve(entry.target);
        }
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });
    
    allSections.forEach(function(section) {
        sectionObserver.observe(section);
        section.classList.add('section-hidden');
    });
});
