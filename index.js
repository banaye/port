// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu button
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const menuBtn = document.createElement('button');
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    menuBtn.classList.add('menu-btn');
    header.insertBefore(menuBtn, nav);
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    
    // Toggle mobile menu
    function toggleMenu() {
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        menuBtn.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    }
    
    menuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
            
            // Update active class
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll for anchor links
            const hash = this.getAttribute('href');
            if (hash && hash !== '#' && hash.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Update active link on scroll
    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768 && nav.classList.contains('active')) {
                toggleMenu();
            }
        }, 250);
    });
    
    // Typing text animation fix
    const typingSpan = document.querySelector('.typing-text span');
    if (typingSpan) {
        const words = ['Backend Engineer', 'ML Engineer', 'Software Engineer', 'Graphic Designer', 'Data Analyst'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let text = '';
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                text = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                text = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            typingSpan.textContent = text;
            
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
            
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeEffect, 500);
                return;
            }
            
            const speed = isDeleting ? 100 : 150;
            setTimeout(typeEffect, speed);
        }
        
        // Remove CSS pseudo-element animation and use JS instead
        typingSpan.style.setProperty('--content', '');
        typingSpan.classList.add('js-typing');
        typeEffect();
    }
    
    // Add scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate home content
    const homeContent = document.querySelector('.home-content');
    const homeImg = document.querySelector('.home-img');
    
    if (homeContent) {
        homeContent.style.opacity = '0';
        homeContent.style.transform = 'translateY(30px)';
        homeContent.style.transition = '0.6s ease';
        observer.observe(homeContent);
    }
    
    if (homeImg) {
        homeImg.style.opacity = '0';
        homeImg.style.transform = 'translateY(30px)';
        homeImg.style.transition = '0.6s ease 0.2s';
        observer.observe(homeImg);
    }
    
    // Parallax effect on image
    const homeImage = document.querySelector('.home-img img');
    if (homeImage) {
        window.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            const moveX = (mouseX - 0.5) * 10;
            const moveY = (mouseY - 0.5) * 10;
            homeImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        window.addEventListener('mouseleave', function() {
            homeImage.style.transform = 'translate(0, 0)';
        });
    }
    
    // Prevent form submission if on hire page
    const hireForm = document.querySelector('.hire-form');
    if (hireForm) {
        hireForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your interest! We will get back to you soon.');
            this.reset();
        });
    }
});

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle image loading error
const profileImage = document.querySelector('.home-img img');
if (profileImage) {
    profileImage.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/250?text=Profile';
    });
}