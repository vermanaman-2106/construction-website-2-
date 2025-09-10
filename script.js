// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked!'); // Debug log
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    } else {
        console.log('Hamburger or nav menu not found!');
    }
});

// Smooth scrolling for navigation links
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

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Project Cost Estimator
const costForm = document.getElementById('costForm');
const estimateResult = document.getElementById('estimateResult');

costForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const projectType = document.getElementById('projectType').value;
    const area = parseInt(document.getElementById('area').value);
    const budget = document.getElementById('budget').value;
    
    if (!projectType || !area || !budget) {
        alert('Please fill in all fields');
        return;
    }
    
    // Calculate estimated cost based on project type and area (in Indian Rupees)
    let costPerSqFt = 0;
    
    switch(projectType) {
        case 'residential':
            costPerSqFt = 1200; // ₹1200 per sq ft
            break;
        case 'commercial':
            costPerSqFt = 1600; // ₹1600 per sq ft
            break;
        case 'interior':
            costPerSqFt = 800; // ₹800 per sq ft
            break;
        case 'renovation':
            costPerSqFt = 600; // ₹600 per sq ft
            break;
    }
    
    const estimatedCost = area * costPerSqFt;
    const minCost = estimatedCost * 0.8;
    const maxCost = estimatedCost * 1.2;
    
    // Format numbers in Indian style (lakhs and crores)
    const formatIndianCurrency = (amount) => {
        if (amount >= 10000000) { // 1 crore
            return `₹${(amount / 10000000).toFixed(1)} Crore`;
        } else if (amount >= 100000) { // 1 lakh
            return `₹${(amount / 100000).toFixed(1)} Lakh`;
        } else {
            return `₹${amount.toLocaleString('en-IN')}`;
        }
    };
    
    estimateResult.innerHTML = `
        <h3>Estimated Project Cost</h3>
        <div style="margin: 1rem 0;">
            <p><strong>Project Type:</strong> ${projectType.charAt(0).toUpperCase() + projectType.slice(1)}</p>
            <p><strong>Area:</strong> ${area.toLocaleString('en-IN')} sq ft</p>
            <p><strong>Estimated Range:</strong> ${formatIndianCurrency(minCost)} - ${formatIndianCurrency(maxCost)}</p>
            <p><strong>Average Cost:</strong> ${formatIndianCurrency(estimatedCost)}</p>
        </div>
        <p style="color: #667eea; font-weight: 500;">This is a rough estimate. Contact us for a detailed quote!</p>
    `;
    
    estimateResult.classList.add('show');
    estimateResult.scrollIntoView({ behavior: 'smooth' });
});

// Contact Form
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// ========================================
// COMPREHENSIVE ANIMATION SYSTEM
// ========================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Handle old animation system
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize without animations - elements stay in position
document.addEventListener('DOMContentLoaded', function() {
    // Remove all animation classes and ensure elements are visible
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        el.classList.remove('animate-on-scroll', 'animate-left', 'animate-right', 'animate-scale', 'text-reveal', 'floating', 'pulse', 'icon-bounce', 'shimmer', 'loading');
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'none';
    });
    
    // Initialize basic functionality without animations
    initializeCounterAnimations();
    initializeEnhancedInteractions();
    initializeScrollProgress();
});

// Counter animation for statistics
function initializeCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (target >= 100 ? '+' : '');
        }, 20);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number) {
                    animateCounter(entry.target, number);
                }
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => counterObserver.observe(stat));
}

// Parallax effects removed - elements stay in position

// Enhanced interactions
function initializeEnhancedInteractions() {
    // Form interactions simplified - no focus effects
    
    // Mobile menu functionality is handled above in the main DOMContentLoaded event
    
    // Button ripple effect removed - buttons work normally
}

// Scroll progress indicator
function initializeScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Page loading animation removed - page loads normally

// Project gallery lightbox effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        const img = this.querySelector('img');
        const overlay = this.querySelector('.project-overlay');
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const imgClone = img.cloneNode(true);
        imgClone.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
        `;
        
        lightbox.appendChild(imgClone);
        document.body.appendChild(lightbox);
        
        // Close lightbox on click
        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
    });
});

// WhatsApp floating button functionality
document.querySelector('.fab-btn.whatsapp').addEventListener('click', function(e) {
    e.preventDefault();
    const message = "Hi! I'm interested in your construction and interior design services. Can you provide more information?";
    const phoneNumber = "15551234567"; // Replace with actual phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});

// Call button functionality
document.querySelector('.fab-btn.call').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'tel:+15551234567'; // Replace with actual phone number
});

// Instagram button functionality
document.querySelector('.fab-btn.instagram').addEventListener('click', function(e) {
    e.preventDefault();
    window.open('https://instagram.com/engineersbuilder', '_blank'); // Replace with actual Instagram handle
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Project Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('FAQ items found:', faqItems.length);
    
    if (faqItems.length > 0) {
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('FAQ clicked:', index);
                    
                    // Close other FAQ items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                    console.log('FAQ active:', item.classList.contains('active'));
                });
            }
        });
    }
});

// Enhanced Contact Form
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            const requiredFields = ['firstName', 'lastName', 'email', 'message'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!data[field] || data[field].trim() === '') {
                    isValid = false;
                    const input = contactForm.querySelector(`[name="${field}"]`);
                    input.style.borderColor = '#e74c3c';
                } else {
                    const input = contactForm.querySelector(`[name="${field}"]`);
                    input.style.borderColor = '#e1e5e9';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you within 24 hours.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});

// Team Member Hover Effects
document.addEventListener('DOMContentLoaded', () => {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Timeline Animation
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// Service Card Animations
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card.detailed');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.08)';
        });
    });
});

// Value Card Animations
document.addEventListener('DOMContentLoaded', () => {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.08)';
        });
    });
});

// Contact Info Card Animations
document.addEventListener('DOMContentLoaded', () => {
    const contactCards = document.querySelectorAll('.contact-info-card');
    
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.08)';
        });
    });
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Popup Form Functionality
// Direct event listener for immediate functionality
document.addEventListener('click', function(e) {
    if (e.target && (e.target.id === 'buildTogetherBtn' || e.target.id === 'letsBeginBtn')) {
        e.preventDefault();
        const popupOverlay = document.getElementById('popupForm');
        if (popupOverlay) {
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.getElementById('popupForm');
    const buildTogetherBtn = document.getElementById('buildTogetherBtn');
    const letsBeginBtn = document.getElementById('letsBeginBtn');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancelBtn');
    const buildForm = document.getElementById('buildForm');

    // Show popup when "Let's Build Together" button is clicked
    if (buildTogetherBtn) {
        buildTogetherBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Build Together button clicked!'); // Debug log
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    } else {
        console.log('Build Together button not found!'); // Debug log
    }

    // Show popup when "Let's Begin" button is clicked
    if (letsBeginBtn) {
        letsBeginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Let\'s Begin button clicked!'); // Debug log
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    } else {
        console.log('Let\'s Begin button not found!'); // Debug log
    }

    // Hide popup when close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Hide popup when cancel button is clicked
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Hide popup when clicking outside the form
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                popupOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Handle form submission
    if (buildForm) {
        buildForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(buildForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Basic validation
            const requiredFields = ['name', 'email', 'phone', 'project-type'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!formObject[field] || formObject[field].trim() === '') {
                    input.style.borderColor = '#e6683c';
                    isValid = false;
                } else {
                    input.style.borderColor = '#e0e0e0';
                }
            });

            if (isValid) {
                // Here you would typically send the data to your server
                // For now, we'll just show a success message
                alert('Thank you for your interest! We will contact you soon.');
                
                // Reset form
                buildForm.reset();
                
                // Close popup
                popupOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Projects Carousel Functionality
let currentCarouselIndex = 0;
let carouselTrack = null;
let carouselIndicators = [];
let totalCarouselSlides = 0;
let carouselInterval = null;

function moveCarousel(direction) {
    if (!carouselTrack) return;
    
    currentCarouselIndex += direction;
    
    if (currentCarouselIndex >= totalCarouselSlides) {
        currentCarouselIndex = 0;
    } else if (currentCarouselIndex < 0) {
        currentCarouselIndex = totalCarouselSlides - 1;
    }
    
    updateCarousel();
}

function currentCarouselSlide(index) {
    currentCarouselIndex = index - 1;
    updateCarousel();
}

function updateCarousel() {
    if (!carouselTrack) return;
    
    const translateX = -currentCarouselIndex * 100;
    carouselTrack.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    carouselIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentCarouselIndex);
    });
}

// Auto-play carousel
function autoPlayCarousel() {
    moveCarousel(1);
}

// Make functions globally available for onclick handlers
window.moveCarousel = moveCarousel;
window.currentCarouselSlide = currentCarouselSlide;

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
    // Get carousel elements
    carouselTrack = document.querySelector('.carousel-track');
    carouselIndicators = document.querySelectorAll('.carousel-indicator');
    totalCarouselSlides = carouselIndicators.length;
    
    console.log('Carousel initialization:', {
        carouselTrack: !!carouselTrack,
        indicators: carouselIndicators.length,
        totalSlides: totalCarouselSlides
    });
    
    // Only initialize if carousel exists
    if (carouselTrack && totalCarouselSlides > 0) {
        // Show first slide
        updateCarousel();
        console.log('First carousel slide shown');
        
        // Start auto-play
        carouselInterval = setInterval(autoPlayCarousel, 5000);
        console.log('Carousel auto-play started');
        
        // Pause auto-play on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(carouselInterval);
                console.log('Carousel paused on hover');
            });
            
            carouselContainer.addEventListener('mouseleave', () => {
                carouselInterval = setInterval(autoPlayCarousel, 5000);
                console.log('Carousel resumed');
            });
        }
    } else {
        console.log('No carousel found');
    }
});
