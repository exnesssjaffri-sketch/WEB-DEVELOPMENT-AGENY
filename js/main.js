/* ============================================
   Website Bazar (WB) - MAIN JS
   ============================================ */

'use strict';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // 1. LOADING SCREEN
    // ============================================
    const loadingScreen = document.getElementById('loading-screen');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingScreen.classList.add('hidden');
            // Initialize AOS after loading
            initAOS();
        }, 1500);
    });

    // Fallback: hide loading screen after 3 seconds if load event doesn't fire
    setTimeout(function() {
        if (!loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
            initAOS();
        }
    }, 3000);

    // ============================================
    // 2. AOS INITIALIZATION
    // ============================================
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100,
                easing: 'ease-out-cubic'
            });
        }
    }

    // ============================================
    // 3. NAVBAR - SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;

        // Back to top button visibility
        const backToTop = document.getElementById('back-to-top');
        if (currentScroll > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // ============================================
    // 4. MOBILE MENU TOGGLE
    // ============================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ============================================
    // 5. BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('back-to-top');

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // 6. TYPING EFFECT
    // ============================================
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement) {
        const phrases = [
            '(WB)',
            'Building Excellence',
            'Digital Innovation',
            'Your Success Partner'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isPaused) {
                setTimeout(typeEffect, 2000);
                isPaused = false;
                return;
            }

            if (!isDeleting) {
                // Typing
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentPhrase.length) {
                    isPaused = true;
                    isDeleting = true;
                    setTimeout(typeEffect, 2000);
                    return;
                }
            } else {
                // Deleting
                typingElement.textContent = currentPhrase.substring(0, charIndex);
                charIndex--;

                if (charIndex < 0) {
                    isDeleting = false;
                    charIndex = 0;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                }
            }

            const typingSpeed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, typingSpeed);
        }

        // Start typing effect after loading
        setTimeout(typeEffect, 2000);
    }

    // ============================================
    // 7. COUNTER ANIMATION
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        
        statNumbers.forEach(function(counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = Math.ceil(target / (duration / 16));
            let current = 0;

            function updateCounter() {
                current += step;
                if (current >= target) {
                    counter.textContent = target + (target === 99 ? '%' : '+');
                    return;
                }
                counter.textContent = current + '+';
                requestAnimationFrame(updateCounter);
            }

            updateCounter();
        });

        countersAnimated = true;
    }

    // Intersection Observer for counters
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }

    // ============================================
    // 8. RIPPLE EFFECT ON BUTTONS
    // ============================================
    document.querySelectorAll('.ripple-btn').forEach(function(button) {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';

            this.appendChild(ripple);

            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });

    // ============================================
    // 9. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // 10. PAGE TRANSITION
    // ============================================
    const pageTransition = document.getElementById('page-transition');

    // Add transition effect when clicking internal links
    document.querySelectorAll('a[href]:not([href^="#"]):not([href^="tel:"]):not([href^="mailto:"]):not([target="_blank"])').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('javascript:')) {
                e.preventDefault();
                
                if (pageTransition) {
                    pageTransition.classList.add('active');
                }

                setTimeout(function() {
                    window.location.href = href;
                }, 600);
            }
        });
    });

    // ============================================
    // 11. PARALLAX EFFECT ON HERO SHAPES
    // ============================================
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        shapes.forEach(function(shape, index) {
            const speed = (index + 1) * 20;
            const moveX = (x - 0.5) * speed;
            const moveY = (y - 0.5) * speed;
            shape.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
        });
    });

    // ============================================
    // 12. CARD HOVER EFFECT (3D TILT)
    // ============================================
    document.querySelectorAll('.feature-card, .service-card, .portfolio-card, .blog-card').forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ============================================
    // 13. CONTACT FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach(function(value, key) {
                data[key] = value;
            });

            // Simple validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff4444';
                } else {
                    field.style.borderColor = '';
                }
            });

            if (!isValid) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailField = document.getElementById('email');
            if (emailField && !isValidEmail(emailField.value)) {
                emailField.style.borderColor = '#ff4444';
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate sending
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(function() {
                showNotification('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ============================================
    // 14. NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message, type) {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'notification notification-' + type;
        notification.innerHTML = message;

        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 20px 30px;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 500;
            z-index: 10001;
            max-width: 400px;
            animation: slideInRight 0.5s ease;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.3);
        `;

        if (type === 'success') {
            notification.style.background = 'rgba(76, 175, 80, 0.9)';
            notification.style.color = '#fff';
        } else {
            notification.style.background = 'rgba(244, 67, 54, 0.9)';
            notification.style.color = '#fff';
        }

        document.body.appendChild(notification);

        // Add animation keyframes if not exists
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Remove after 4 seconds
        setTimeout(function() {
            notification.style.animation = 'slideOutRight 0.5s ease forwards';
            setTimeout(function() {
                notification.remove();
            }, 500);
        }, 4000);
    }

    // ============================================
    // 15. SCROLL REVEAL FOR SECTIONS
    // ============================================
    const revealElements = document.querySelectorAll('.section');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(function(element) {
        revealObserver.observe(element);
    });

    // ============================================
    // 16. ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Only run on pages with section IDs (home page)
    if (sections.length > 0) {
        window.addEventListener('scroll', updateActiveNavLink);
    }

    // ============================================
    // 17. LAZY LOADING FOR IMAGES
    // ============================================
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
            img.src = img.dataset.src;
        });
    }

    // ============================================
    // 18. PREVENT DEFAULT FOR EMPTY LINKS
    // ============================================
    document.querySelectorAll('a[href="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    console.log('%c WB - Website Bazar ', 'background: #353574; color: #fff; font-size: 1.2rem; padding: 10px 20px; border-radius: 8px; font-weight: bold;');
    console.log('%c Built with ❤️ by WB Team ', 'background: #BBD6F4; color: #353574; font-size: 0.9rem; padding: 8px 16px; border-radius: 8px;');
});