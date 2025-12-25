// Joy@60th Invitation Website - Main JavaScript
// Elegant animations and interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeTypedText();
    initializeCountdown();
    initializeAnimations();
    initializeGalleryCarousel();
    initializeRSVPData();
    initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animate menu items
            if (!mobileMenu.classList.contains('hidden')) {
                const menuItems = mobileMenu.querySelectorAll('a');
                anime({
                    targets: menuItems,
                    translateX: [-50, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(100),
                    duration: 600,
                    easing: 'easeOutCubic'
                });
            }
        });
    }
    
    // Smooth scroll for navigation links
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
}

// Typed text animation for hero title
function initializeTypedText() {
    const typedElement = document.getElementById('typed-title');
    if (typedElement) {
        new Typed('#typed-title', {
            strings: ['Joy@60th', 'A Milestone Celebration', 'Six Decades of Love'],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Countdown timer functionality
function initializeCountdown() {
    const eventDate = new Date('2025-12-29T18:30:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update countdown display
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
            
            // Animate number changes
            animateCountdownNumbers();
        } else {
            // Event has passed
            const countdownSection = document.querySelector('.countdown-box');
            if (countdownSection) {
                countdownSection.innerHTML = '<div class="text-2xl font-bold text-pink-600">The Celebration Has Begun!</div>';
            }
        }
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Animate countdown numbers
function animateCountdownNumbers() {
    const numberElements = document.querySelectorAll('#days, #hours, #minutes, #seconds');
    
    anime({
        targets: numberElements,
        scale: [1, 1.1, 1],
        duration: 300,
        easing: 'easeInOutQuad'
    });
}

// Initialize page animations
function initializeAnimations() {
    // Animate cards on scroll
    const cards = document.querySelectorAll('.card-hover');
    
    // Initial page load animations
    anime.timeline({
        easing: 'easeOutCubic'
    })
    .add({
        targets: '.hero-bg h1',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000
    })
    .add({
        targets: '.hero-bg .bg-white\\/20',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800
    }, '-=500')
    .add({
        targets: '.hero-bg .flex.flex-col',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600
    }, '-=400');
    
    // Stagger animation for cards
    anime({
        targets: cards,
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(200, {start: 1000}),
        duration: 800,
        easing: 'easeOutCubic'
    });
}

// Gallery carousel initialization
function initializeGalleryCarousel() {
    const carousel = document.getElementById('gallery-carousel');
    if (carousel) {
        new Splide('#gallery-carousel', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
                768: {
                    perPage: 2,
                    gap: '1rem'
                },
                480: {
                    perPage: 1,
                    gap: '1rem'
                }
            },
            classes: {
                arrows: 'splide__arrows custom-arrows',
                arrow: 'splide__arrow custom-arrow',
                prev: 'splide__arrow--prev custom-prev',
                next: 'splide__arrow--next custom-next'
            }
        }).mount();
    }
}

// RSVP data management
function initializeRSVPData() {
    // Load RSVP data from localStorage
    const rsvpData = JSON.parse(localStorage.getItem('joy60th_rsvp') || '[]');
    
    // Update RSVP statistics
    updateRSVPStats(rsvpData);
    
    // Add some sample data for demonstration
    if (rsvpData.length === 0) {
        const sampleData = [
            { name: 'Sample Guest 1', status: 'confirmed', guests: 2 },
            { name: 'Sample Guest 2', status: 'confirmed', guests: 1 },
            { name: 'Sample Guest 3', status: 'pending', guests: 0 }
        ];
        localStorage.setItem('joy60th_rsvp', JSON.stringify(sampleData));
        updateRSVPStats(sampleData);
    }
}

// Update RSVP statistics display
function updateRSVPStats(rsvpData) {
    const confirmedEl = document.getElementById('confirmed-guests');
    const pendingEl = document.getElementById('pending-rsvp');
    const totalEl = document.getElementById('total-invited');
    
    if (confirmedEl && pendingEl && totalEl) {
        const confirmed = rsvpData.filter(r => r.status === 'confirmed').length;
        const pending = rsvpData.filter(r => r.status === 'pending').length;
        const total = 50; // Total invited guests
        
        // Animate number updates
        anime({
            targets: confirmedEl,
            innerHTML: [0, confirmed],
            duration: 2000,
            round: 1,
            easing: 'easeOutCubic'
        });
        
        anime({
            targets: pendingEl,
            innerHTML: [0, pending],
            duration: 2000,
            delay: 200,
            round: 1,
            easing: 'easeOutCubic'
        });
        
        anime({
            targets: totalEl,
            innerHTML: [0, total],
            duration: 2000,
            delay: 400,
            round: 1,
            easing: 'easeOutCubic'
        });
    }
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Animate sections on scroll
                if (element.classList.contains('countdown-box')) {
                    anime({
                        targets: element,
                        scale: [0.8, 1],
                        opacity: [0, 1],
                        duration: 600,
                        easing: 'easeOutCubic'
                    });
                }
                
                if (element.classList.contains('rsvp-preview')) {
                    anime({
                        targets: element,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutCubic'
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.countdown-box, .rsvp-preview').forEach(el => {
        observer.observe(el);
    });
}

// RSVP Form functionality (for rsvp.html)
function initializeRSVPForm() {
    const form = document.getElementById('rsvp-form');
    if (!form) return;
    
    let currentStep = 1;
    const totalSteps = 4;
    
    // Step navigation
    window.nextStep = function() {
        if (currentStep < totalSteps) {
            hideStep(currentStep);
            currentStep++;
            showStep(currentStep);
            updateProgressBar();
        }
    };
    
    window.prevStep = function() {
        if (currentStep > 1) {
            hideStep(currentStep);
            currentStep--;
            showStep(currentStep);
            updateProgressBar();
        }
    };
    
    function showStep(step) {
        const stepElement = document.getElementById(`step-${step}`);
        if (stepElement) {
            stepElement.classList.remove('hidden');
            anime({
                targets: stepElement,
                translateX: [50, 0],
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutCubic'
            });
        }
    }
    
    function hideStep(step) {
        const stepElement = document.getElementById(`step-${step}`);
        if (stepElement) {
            anime({
                targets: stepElement,
                translateX: [0, -50],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInCubic',
                complete: () => {
                    stepElement.classList.add('hidden');
                }
            });
        }
    }
    
    function updateProgressBar() {
        const progress = (currentStep / totalSteps) * 100;
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            anime({
                targets: progressBar,
                width: `${progress}%`,
                duration: 500,
                easing: 'easeOutCubic'
            });
        }
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        const rsvpData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            attendance: formData.get('attendance'),
            guestCount: formData.get('guestCount'),
            dietary: formData.get('dietary'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };
        
        // Save to localStorage
        const existingData = JSON.parse(localStorage.getItem('joy60th_rsvp') || '[]');
        existingData.push(rsvpData);
        localStorage.setItem('joy60th_rsvp', JSON.stringify(existingData));
        
        // Show success message
        showSuccessMessage();
    });
    
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
        successDiv.innerHTML = `
            <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <h3 class="playfair text-2xl font-bold text-gray-800 mb-4">Thank You!</h3>
                <p class="text-gray-600 mb-6">Your RSVP has been received. We look forward to celebrating with you!</p>
                <button onclick="this.parentElement.parentElement.remove()" class="btn-primary px-6 py-2 rounded-full">
                    Close
                </button>
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        // Animate success message
        anime({
            targets: successDiv.querySelector('div'),
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutCubic'
        });
    }
}

// Gallery functionality (for gallery.html)
function initializeGallery() {
    const gallery = document.getElementById('photo-gallery');
    if (!gallery) return;
    
    // Sample gallery images
    const galleryImages = [
        {
            src: 'https://kimi-web-img.moonshot.cn/img/flairflowerbar.com/eb987cf0ab2908f499362d13f3583db2aaa59f95.png',
            title: 'Elegant Floral Arrangements',
            category: 'decorations'
        },
        {
            src: 'https://kimi-web-img.moonshot.cn/img/sandypinescamping.com/6bd3c070b8c8d9c0249af81c29ea8a96fc7a257c.jpg',
            title: 'Luxury Glamping Venue',
            category: 'venue'
        },
        {
            src: 'https://kimi-web-img.moonshot.cn/img/www.sophistiplate.com/aef923c08b2571d9ef445ca616cdb71fae19e49c.jpg',
            title: 'Elegant Table Settings',
            category: 'decorations'
        },
        {
            src: 'resources/memory-collage.jpg',
            title: 'Memory Collage',
            category: 'memories'
        },
        {
            src: 'https://kimi-web-img.moonshot.cn/img/karaspartyideas.com/1c275f1180c4d0903e7c018e5b2464b2ae5b6cfe.jpg',
            title: 'Celebration Setup',
            category: 'decorations'
        },
        {
            src: 'https://kimi-web-img.moonshot.cn/img/laineandlayne.com/181667c5cf0aa35edd2a682908311cfd909799a2.jpg',
            title: 'Vintage Photo Frames',
            category: 'memories'
        }
    ];
    
    // Render gallery
    renderGallery(galleryImages);
    
    // Filter functionality
    window.filterGallery = function(category) {
        const filteredImages = category === 'all' ? galleryImages : galleryImages.filter(img => img.category === category);
        renderGallery(filteredImages);
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('bg-pink-200', 'text-pink-800');
            btn.classList.add('bg-pink-100', 'text-pink-600');
        });
        
        event.target.classList.remove('bg-pink-100', 'text-pink-600');
        event.target.classList.add('bg-pink-200', 'text-pink-800');
    };
    
    function renderGallery(images) {
        gallery.innerHTML = images.map((image, index) => `
            <div class="gallery-item cursor-pointer" onclick="openLightbox(${index})">
                <div class="gallery-image overflow-hidden rounded-xl">
                    <img src="${image.src}" alt="${image.title}" class="w-full h-64 object-cover">
                </div>
                <div class="p-4">
                    <h3 class="font-semibold text-gray-800">${image.title}</h3>
                </div>
            </div>
        `).join('');
        
        // Animate gallery items
        anime({
            targets: '.gallery-item',
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutCubic'
        });
    }
    
    window.openLightbox = function(index) {
        // Lightbox implementation would go here
        console.log('Opening lightbox for image:', index);
    };
}

// Initialize page-specific functionality
if (window.location.pathname.includes('rsvp.html')) {
    document.addEventListener('DOMContentLoaded', initializeRSVPForm);
}

if (window.location.pathname.includes('gallery.html')) {
    document.addEventListener('DOMContentLoaded', initializeGallery);
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutCubic'
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 500,
            easing: 'easeInCubic',
            complete: () => {
                notification.remove();
            }
        });
    }, 3000);
}

// Export functions for global access
window.showNotification = showNotification;