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

// Header scroll animation
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        console.log('Header and hero section found, initializing animation');
        
        function updateHeader() {
            const scrollY = window.scrollY;
            const heroHeight = heroSection.offsetHeight;
            
            console.log('Scroll Y:', scrollY, 'Hero Height:', heroHeight);
            
            // Simple scroll-based detection
            if (scrollY < heroHeight - 100) {
                // In hero section - make header transparent
                console.log('In hero section - making transparent');
                header.classList.remove('scrolled');
                header.classList.add('in-hero');
    } else {
                // Outside hero section - make header opaque
                console.log('Outside hero section - making opaque');
                header.classList.remove('in-hero');
                header.classList.add('scrolled');
            }
        }
        
        // Initial call
        updateHeader();
        
        // Listen for scroll events
        window.addEventListener('scroll', updateHeader);
        window.addEventListener('resize', updateHeader);
    } else {
        console.log('Header or hero section not found!');
    }
});

// Scroll Animation System
document.addEventListener('DOMContentLoaded', function() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add scroll animation classes to existing elements
    function addScrollAnimations() {
        // Services section
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.classList.add('scroll-animate', `scroll-animate-delay-${(index % 5) + 1}`);
        });

        // Features section
        const features = document.querySelectorAll('.feature');
        features.forEach((feature, index) => {
            feature.classList.add('scroll-animate', `scroll-animate-delay-${(index % 5) + 1}`);
        });

        // About section
        const aboutContent = document.querySelector('.about-content');
        if (aboutContent) {
            aboutContent.classList.add('scroll-animate-left');
        }

        const aboutImage = document.querySelector('.about-image');
        if (aboutImage) {
            aboutImage.classList.add('scroll-animate-right');
        }

        // Section headers
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            header.classList.add('scroll-animate');
        });

        // Project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.classList.add('scroll-animate-scale', `scroll-animate-delay-${(index % 5) + 1}`);
        });

        // Team profiles
        const teamProfiles = document.querySelectorAll('.team-profile');
        teamProfiles.forEach((profile, index) => {
            profile.classList.add('scroll-animate', `scroll-animate-delay-${(index % 3) + 1}`);
        });

        // Testimonials
        const testimonials = document.querySelectorAll('.testimonial');
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.add('scroll-animate', `scroll-animate-delay-${(index % 3) + 1}`);
        });

        // Stats
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach((stat, index) => {
            stat.classList.add('scroll-animate-scale', `scroll-animate-delay-${(index % 6) + 1}`);
        });
    }

    // Initialize scroll animations
    addScrollAnimations();

    // Re-observe elements after adding classes
    const newAnimatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    newAnimatedElements.forEach(el => {
        observer.observe(el);
    });
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

// Contact Form - Removed old handler, using new Formspree handler below

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
    
    const animateCounter = (element, target, suffix) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            const value = Math.floor(current);
            element.textContent = `${value}${suffix}`;
        }, 20);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                // Detect and preserve the exact suffix used in markup
                const hasPercent = /%/.test(text);
                const hasPlus = /\+/.test(text);
                const suffix = hasPercent ? '%' : (hasPlus ? '+' : '');
                if (number) {
                    animateCounter(entry.target, number, suffix);
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
    const phoneNumber = "918588835444"; // Replace with actual phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});

// Call button functionality
document.querySelector('.fab-btn.call').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'tel:+918588835444'; // Replace with actual phone number
});

// Instagram button functionality


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

// --------- Image performance optimizations ---------
document.addEventListener('DOMContentLoaded', () => {
    // Ensure all non-critical images are lazy and decode async
    document.querySelectorAll('img').forEach(img => {
        const isLogo = img.closest('.logo');
        const isHero = img.closest('.hero');
        if (!isLogo && !isHero) {
            if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
            if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
        } else {
            // Even for important images, prefer async decode to avoid main thread block
            if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
        }
        // Add width/height if missing to reduce layout shift (best-effort from natural sizes once loaded)
        if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
            img.addEventListener('load', () => {
                if (!img.hasAttribute('width')) img.setAttribute('width', img.naturalWidth);
                if (!img.hasAttribute('height')) img.setAttribute('height', img.naturalHeight);
            }, { once: true });
        }
    });
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

// Enhanced Contact Form - Removed conflicting handler, using Formspree handler below

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

    // Note: submission is handled by the unified Formspree handler below

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Projects Carousel Functionality
var currentCarouselIndex = 0;
var carouselTrack = null;
var carouselIndicators = [];
var totalCarouselSlides = 0;
var carouselInterval = null;

// Declare functions first
function moveCarousel(direction) {
    console.log('moveCarousel called with direction:', direction);
    
    // Re-initialize if needed
    if (!carouselTrack) {
        carouselTrack = document.querySelector('.carousel-track');
        carouselIndicators = document.querySelectorAll('.carousel-indicator');
        totalCarouselSlides = carouselIndicators.length;
    }
    
    if (!carouselTrack) {
        console.log('Carousel track not found');
        return;
    }
    
    currentCarouselIndex += direction;
    
    if (currentCarouselIndex >= totalCarouselSlides) {
        currentCarouselIndex = 0;
    } else if (currentCarouselIndex < 0) {
        currentCarouselIndex = totalCarouselSlides - 1;
    }
    
    console.log('New carousel index:', currentCarouselIndex);
    updateCarousel();
}

function currentCarouselSlide(index) {
    console.log('currentCarouselSlide called with index:', index);
    
    // Re-initialize if needed
    if (!carouselTrack) {
        carouselTrack = document.querySelector('.carousel-track');
        carouselIndicators = document.querySelectorAll('.carousel-indicator');
        totalCarouselSlides = carouselIndicators.length;
    }
    
    currentCarouselIndex = index - 1;
    updateCarousel();
}

function updateCarousel() {
    if (!carouselTrack) {
        console.log('Cannot update carousel - track not found');
        return;
    }
    
    const translateX = -currentCarouselIndex * 100;
    carouselTrack.style.transform = `translateX(${translateX}%)`;
    console.log('Carousel updated - translateX:', translateX);
    
    // Update indicators
    carouselIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentCarouselIndex);
    });
}

// Auto-play carousel
function autoPlayCarousel() {
    moveCarousel(1);
}

// Initialize carousel
function initializeCarousel() {
    console.log('Initializing carousel...');
    
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
        console.log('No carousel found or no indicators');
    }
}

// Make functions globally available for onclick handlers immediately
window.moveCarousel = moveCarousel;
window.currentCarouselSlide = currentCarouselSlide;

// Form Submission Handling
document.addEventListener('DOMContentLoaded', function() {
    // Add form validation and enhancement
    function enhanceForm(form) {
        if (!form) return;
        
        // Add real-time validation
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        // Add submit button enhancement
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                if (!validateForm(form)) {
                    e.preventDefault();
                    return false;
                }
            });
        }
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const isValid = value !== '' && field.checkValidity();
        
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('valid');
        } else {
            field.classList.remove('valid');
            field.classList.add('error');
        }
        
        return isValid;
    }
    
    function validateForm(form) {
        const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        enhanceForm(contactForm);
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(contactForm)) {
                alert('Please fill in all required fields correctly.');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Submit form
            const formData = new FormData(contactForm);
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                    // Remove validation classes
                    contactForm.querySelectorAll('.valid, .error').forEach(field => {
                        field.classList.remove('valid', 'error');
                    });
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                alert('Sorry, there was an error sending your message. Please try again.');
                console.error('Error:', error);
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Handle popup form submission
    const popupForm = document.getElementById('buildForm');
    if (popupForm) {
        enhanceForm(popupForm);
        popupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(popupForm)) {
                alert('Please fill in all required fields correctly.');
                return;
            }
            
            // Show loading state
            const submitBtn = popupForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Submit form to Formspree
            const formData = new FormData(popupForm);
            fetch(popupForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Thank you! Your project inquiry has been sent successfully. We\'ll get back to you soon!');
                    popupForm.reset();
                    // Close popup consistently
                    const overlay = document.getElementById('popupForm');
                    if (overlay) {
                        overlay.classList.remove('active');
                    }
                    document.body.style.overflow = 'auto';
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                alert('Sorry, there was an error sending your inquiry. Please try again.');
                console.error('Error:', error);
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Handle resume form submission
    const resumeForm = document.querySelector('.resume-form');
    if (resumeForm) {
        enhanceForm(resumeForm);
        resumeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(resumeForm)) {
                alert('Please fill in all required fields correctly.');
                return;
            }
            
            // Show loading state
            const submitBtn = resumeForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Submit form to Formspree
            const formData = new FormData(resumeForm);
            fetch(resumeForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Thank you! Your application has been submitted successfully. We\'ll review it and get back to you soon!');
                    resumeForm.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                alert('Sorry, there was an error submitting your application. Please try again.');
                console.error('Error:', error);
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Handle quick contact form submission (index.html)
    const quickContactForm = document.querySelector('.contact-form:not(#contactForm):not(#buildForm)');
    if (quickContactForm) {
        enhanceForm(quickContactForm);
        quickContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(quickContactForm)) {
                alert('Please fill in all required fields correctly.');
                return;
            }
            
            // Show loading state
            const submitBtn = quickContactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Submit form to Formspree
            const formData = new FormData(quickContactForm);
            fetch(quickContactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Thank you! Your message has been sent successfully.');
                    quickContactForm.reset();
                    // Remove validation classes
                    quickContactForm.querySelectorAll('.valid, .error').forEach(field => {
                        field.classList.remove('valid', 'error');
                    });
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                alert('Sorry, there was an error sending your message. Please try again.');
                console.error('Error:', error);
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Handle cost estimator form
    const costForm = document.getElementById('costForm');
    if (costForm) {
        enhanceForm(costForm);
        costForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(costForm)) {
                alert('Please fill in all required fields correctly.');
                return;
            }
            
            // Show loading state
            const submitBtn = costForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Calculating...';
            submitBtn.disabled = true;
            
            // Collect form data
            const formData = new FormData(costForm);
            const data = Object.fromEntries(formData);
            
            // Basic cost calculation (you can enhance this)
            let baseCost = 0;
            const projectType = data.projectType;
            const propertySize = parseInt(data.propertySize) || 0;
            
            switch(projectType) {
                case 'residential':
                    baseCost = propertySize * 1200; // Rs per sq ft
                    break;
                case 'commercial':
                    baseCost = propertySize * 1800;
                    break;
                case 'renovation':
                    baseCost = propertySize * 800;
                    break;
                case 'interior':
                    baseCost = propertySize * 600;
                    break;
                default:
                    baseCost = propertySize * 1000;
            }
            
            // Add additional services
            const additionalServices = data.additionalServices || [];
            additionalServices.forEach(service => {
                switch(service) {
                    case 'design':
                        baseCost += 50000;
                        break;
                    case 'permit':
                        baseCost += 25000;
                        break;
                    case 'inspection':
                        baseCost += 15000;
                        break;
                }
            });
            
            // Show estimated cost
            setTimeout(() => {
                alert(`Estimated Cost: ₹${baseCost.toLocaleString()}\n\nThis is a rough estimate. For accurate pricing, please contact us directly.`);
                
                // Reset form
                costForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing carousel...');
    initializeCarousel();
});

// Lazy play/pause Instagram videos when in viewport
document.addEventListener('DOMContentLoaded', () => {
    const instaVideos = document.querySelectorAll('.instagram video[data-autoplay]');
    if (instaVideos.length === 0) return;
    const vidObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                if (video.paused) {
                    // Start loading only when needed
                    if (video.preload !== 'auto') video.preload = 'auto';
                    video.play().catch(() => {});
                }
            } else {
                if (!video.paused) video.pause();
            }
        });
    }, { threshold: 0.25 });
    instaVideos.forEach(v => vidObserver.observe(v));
});

// ---------- Popup Form Deep-Linking & Global Open Helper ----------
// Usage:
//  - Add a link <a href="#popup">Get Quote</a> anywhere to open the popup
//  - Open page with #popup or #get-quote in URL to auto-open the popup
//  - Call window.openBuildPopup() from console or other code
(function() {
    function openBuildPopup() {
        const overlay = document.getElementById('popupForm');
        if (!overlay) return;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeBuildPopup() {
        const overlay = document.getElementById('popupForm');
        if (!overlay) return;
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Expose helpers
    window.openBuildPopup = openBuildPopup;
    window.closeBuildPopup = closeBuildPopup;

    // Click on any link with href="#popup" should open the popup
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a[href="#popup"]');
        if (target) {
            e.preventDefault();
            openBuildPopup();
        }
    });

    // Auto-open when URL hash matches
    document.addEventListener('DOMContentLoaded', function() {
        const hash = (window.location.hash || '').toLowerCase();
        if (hash === '#popup' || hash === '#get-quote') {
            // give DOM a tick to render before opening
            setTimeout(openBuildPopup, 50);
        }
    });
})();
