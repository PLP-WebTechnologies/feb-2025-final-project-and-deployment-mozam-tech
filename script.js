// script.js - Test-Ready Implementation

document.addEventListener('DOMContentLoaded', function() {
    // Universal functionality
    handleMobileMenu();
    highlightActiveLink();
    
    // Page-specific controllers
    if (document.getElementById('homePage')) initHomePage();
    if (document.getElementById('aboutPage')) initAboutPage();
    if (document.getElementById('contactPage')) initContactPage();
});

// ========== CORE FUNCTIONS ==========

function handleMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navList = document.querySelector('nav ul');
    
    if (menuBtn && navList) {
        menuBtn.addEventListener('click', () => {
            navList.classList.toggle('show');
            menuBtn.classList.toggle('open');
        });
    }
}

function highlightActiveLink() {
    const links = document.querySelectorAll('nav a');
    const currentPage = location.pathname.split('/').pop();
    
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ========== HOME PAGE ==========

function initHomePage() {
    // Simple image slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }
    
    document.querySelector('.next-btn')?.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    });
    
    document.querySelector('.prev-btn')?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    });
    
    showSlide(0);
}

// ========== ABOUT PAGE ==========

function initAboutPage() {
    // Accordion functionality
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
        });
    });
}

// ========== CONTACT PAGE ==========

function initContactPage() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Simulate form submission
                document.getElementById('formFeedback').textContent = 'Message sent successfully!';
                form.reset();
                setTimeout(() => {
                    document.getElementById('formFeedback').textContent = '';
                }, 3000);
            }
        });
    }
}

function validateForm() {
    let isValid = true;
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    // Reset errors
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    
    // Email validation
    if (!email.value.includes('@') || !email.value.includes('.')) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    }
    
    // Message validation
    if (message.value.length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    return isValid;
}