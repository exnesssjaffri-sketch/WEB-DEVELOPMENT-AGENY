/* ============================================
   PORTFOLIO DETAIL PAGE - MAIN JS
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // 1. LOADING SCREEN
    // ============================================
    const loadingScreen = document.getElementById('loading-screen');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            if (loadingScreen) loadingScreen.classList.add('hidden');
            initAOS();
        }, 1500);
    });

    setTimeout(function() {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
            initAOS();
        }
    }, 3000);

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
    // 2. NAVBAR SCROLL
    // ============================================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            const backToTop = document.getElementById('back-to-top');
            if (backToTop) {
                if (currentScroll > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
        });
    }

    // ============================================
    // 3. MOBILE MENU
    // ============================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================
    // 4. BACK TO TOP
    // ============================================
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // 5. RIPPLE EFFECT
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
            setTimeout(function() { ripple.remove(); }, 600);
        });
    });

    // ============================================
    // 6. PAGE TRANSITION
    // ============================================
    const pageTransition = document.getElementById('page-transition');
    if (pageTransition) {
        document.querySelectorAll('a[href]:not([href^="#"]):not([href^="tel:"]):not([href^="mailto:"]):not([target="_blank"])').forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href !== '#' && !href.startsWith('javascript:')) {
                    e.preventDefault();
                    pageTransition.classList.add('active');
                    setTimeout(function() {
                        window.location.href = href;
                    }, 600);
                }
            });
        });
    }

    // ============================================
    // 7. GALLERY LIGHTBOX
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const placeholder = this.querySelector('.gallery-placeholder');
            let content = '';
            
            if (img) {
                content = '<img src="' + img.src + '" alt="' + (img.alt || 'Gallery image') + '" style="max-width:90%;max-height:80vh;border-radius:12px;">';
            } else if (placeholder) {
                content = '<div style="font-size:5rem;color:' + getComputedStyle(document.documentElement).getPropertyValue('--primary-text').trim() + ';padding:60px;">' + placeholder.innerHTML + '</div>';
            }

            if (content) {
                showLightbox(content);
            }
        });
    });

    function showLightbox(content) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 10002;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 3rem;
            color: #fff;
            background: none;
            border: none;
            cursor: pointer;
            z-index: 10003;
            transition: transform 0.3s ease;
        `;
        closeBtn.onmouseover = function() { this.style.transform = 'rotate(90deg)'; };
        closeBtn.onmouseout = function() { this.style.transform = 'rotate(0)'; };

        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = content;
        contentDiv.style.cssText = `
            max-width: 90%;
            max-height: 90vh;
            animation: scaleIn 0.3s ease;
        `;

        overlay.appendChild(closeBtn);
        overlay.appendChild(contentDiv);

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(function() { overlay.remove(); }, 300);
            }
        });

        closeBtn.addEventListener('click', function() {
            overlay.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(function() { overlay.remove(); }, 300);
        });

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        // Add keyframes
        if (!document.getElementById('lightbox-styles')) {
            const style = document.createElement('style');
            style.id = 'lightbox-styles';
            style.textContent = `
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
                @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            `;
            document.head.appendChild(style);
        }

        // Close on Escape
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                overlay.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(function() { overlay.remove(); document.body.style.overflow = ''; }, 300);
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    // ============================================
    // 8. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================================
    // 9. PREVENT DEFAULT FOR EMPTY LINKS
    // ============================================
    document.querySelectorAll('a[href="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    console.log('%c WDA - Portfolio Detail ', 'background: #353574; color: #fff; font-size: 1.2rem; padding: 10px 20px; border-radius: 8px; font-weight: bold;');
});