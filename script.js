// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .step-item, .integration-card, .testimonial-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Demo Modal Functionality
    const demoModal = document.getElementById('demoModal');
    const demoModalClose = document.querySelector('.demo-modal-close');
    
    // Function to open demo modal
    window.openDemoModal = function() {
        if (demoModal) {
            demoModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    };
    
    // Function to close demo modal
    window.closeDemoModal = function() {
        if (demoModal) {
            demoModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    };
    
    // Close modal when clicking the X
    if (demoModalClose) {
        demoModalClose.addEventListener('click', closeDemoModal);
    }
    
    // Close modal when clicking outside of it
    if (demoModal) {
        demoModal.addEventListener('click', function(event) {
            if (event.target === demoModal) {
                closeDemoModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && demoModal && demoModal.style.display === 'block') {
            closeDemoModal();
        }
    });
    
    // Counter Animation for Statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.statistics');
    
    if (statsSection && statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = stat.textContent;
            const isPercentage = target.includes('%');
            const isPlus = target.includes('+');
            const isSlash = target.includes('/');
            
            let numericValue;
            if (isPercentage) {
                numericValue = parseFloat(target.replace('%', ''));
            } else if (isPlus) {
                numericValue = parseFloat(target.replace('+', ''));
            } else if (isSlash) {
                numericValue = parseFloat(target.replace('/', ''));
            } else {
                numericValue = parseFloat(target);
            }
            
            if (!isNaN(numericValue)) {
                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        current = numericValue;
                        clearInterval(timer);
                    }
                    
                    let displayValue = Math.floor(current);
                    if (isPercentage) displayValue += '%';
                    if (isPlus) displayValue += '+';
                    if (isSlash) displayValue += '/';
                    
                    stat.textContent = displayValue;
                }, 30);
            }
        });
    }
});

// Scroll to Next Section Function
function scrollToNextSection() {
    const heroSection = document.querySelector('.hero');
    const nextSection = document.querySelector('.problem-outcome');
    
    if (nextSection) {
        const offsetTop = nextSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Demo Request Handler
function handleDemoRequest(event) {
    event.preventDefault();

    var email = document.getElementById('subs-email').value;
    console.log('Demo requested by:', email);

    // Track the event in Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'demo_request', {
        'event_category': 'engagement',
        'event_label': email
      });
    }

    // Redirect to Calendly after a short delay to ensure tracking is sent
    setTimeout(function() {
      window.location.href = 'https://calendly.com/junaid-s8l/accountant-ai-demo';
    }, 100);
}

// Add CSS for mobile navigation and demo modal
const style = document.createElement('style');
style.textContent = `
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-top: 1px solid var(--border-color);
        padding: 1rem;
        box-shadow: var(--shadow-lg);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: var(--shadow-lg);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Demo Modal Styles */
    .demo-modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    }
    
    .demo-modal-content {
        background-color: white;
        margin: 5% auto;
        padding: 0;
        border-radius: 12px;
        width: 90%;
        max-width: 500px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        animation: modalSlideIn 0.3s ease-out;
    }
    
    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: translateY(-50px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .demo-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 24px 0 24px;
        border-bottom: 1px solid #e5e7eb;
        margin-bottom: 24px;
    }
    
    .demo-modal-header h3 {
        margin: 0;
        font-size: 24px;
        font-weight: 600;
        color: #1f2937;
    }
    
    .demo-modal-close {
        font-size: 28px;
        font-weight: bold;
        color: #9ca3af;
        cursor: pointer;
        line-height: 1;
        transition: color 0.2s ease;
    }
    
    .demo-modal-close:hover {
        color: #374151;
    }
    
    .demo-modal-body {
        padding: 0 24px 24px 24px;
    }
    
    .demo-modal-body p {
        margin: 0 0 24px 0;
        color: #6b7280;
        line-height: 1.6;
    }
    
    .form-group {
        margin-bottom: 20px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #374151;
    }
    
    .form-group input {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 16px;
        transition: border-color 0.2s ease;
        box-sizing: border-box;
    }
    
    .form-group input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .demo-modal .btn {
        width: 100%;
        justify-content: center;
    }
`;
document.head.appendChild(style); 