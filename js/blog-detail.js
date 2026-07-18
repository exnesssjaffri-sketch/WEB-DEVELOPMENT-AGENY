/* ============================================
   BLOG DETAIL PAGE - WDA JAVASCRIPT
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // 1. READING PROGRESS BAR
    // ============================================
    const progressBar = document.getElementById('reading-progress');
    
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // ============================================
    // 2. TABLE OF CONTENTS - ACTIVE LINK TRACKING
    // ============================================
    const tocLinks = document.querySelectorAll('.toc-list a');
    const headings = document.querySelectorAll('.blog-article h2, .blog-article h3');
    
    if (tocLinks.length > 0 && headings.length > 0) {
        function updateActiveTocLink() {
            let current = '';
            
            headings.forEach(function(heading) {
                const headingTop = heading.offsetTop - 120;
                if (window.pageYOffset >= headingTop) {
                    current = heading.getAttribute('id');
                }
            });

            tocLinks.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveTocLink);
        updateActiveTocLink();
    }

    // ============================================
    // 3. SMOOTH SCROLL FOR TOC LINKS
    // ============================================
    tocLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 4. FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQs
            faqItems.forEach(function(otherItem) {
                otherItem.classList.remove('active');
            });
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ============================================
    // 5. SOCIAL SHARE BUTTONS
    // ============================================
    const shareButtons = document.querySelectorAll('.share-btn');
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    shareButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            let shareUrl = '';

            switch (platform) {
                case 'facebook':
                    shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl;
                    break;
                case 'twitter':
                    shareUrl = 'https://twitter.com/intent/tweet?text=' + pageTitle + '&url=' + pageUrl;
                    break;
                case 'linkedin':
                    shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + pageUrl;
                    break;
                case 'whatsapp':
                    shareUrl = 'https://api.whatsapp.com/send?text=' + pageTitle + '%20' + pageUrl;
                    break;
                case 'copy':
                    copyToClipboard(window.location.href);
                    return;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    // Copy to clipboard helper
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function() {
                showShareNotification('Link copied to clipboard!');
            });
        } else {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showShareNotification('Link copied to clipboard!');
        }
    }

    // Share notification
    function showShareNotification(message) {
        const existing = document.querySelector('.share-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'share-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 24px;
            background: var(--primary-gradient);
            color: #fff;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 500;
            z-index: 10001;
            box-shadow: 0 5px 20px rgba(53, 53, 116, 0.3);
            animation: fadeInUp 0.3s ease;
        `;
        document.body.appendChild(notification);

        setTimeout(function() {
            notification.style.animation = 'fadeOutDown 0.3s ease forwards';
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 2000);
    }

    // Add share notification animations
    if (!document.getElementById('share-notif-styles')) {
        const style = document.createElement('style');
        style.id = 'share-notif-styles';
        style.textContent = `
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            @keyframes fadeOutDown {
                from { opacity: 1; transform: translateX(-50%) translateY(0); }
                to { opacity: 0; transform: translateX(-50%) translateY(20px); }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // 6. NEWSLETTER FORM
    // ============================================
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!email) {
                showShareNotification('Please enter your email address.');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showShareNotification('Please enter a valid email address.');
                return;
            }

            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;

            setTimeout(function() {
                showShareNotification('Thank you! You have been subscribed successfully.');
                newsletterForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ============================================
    // 7. SCROLL REVEAL FOR SECTIONS
    // ============================================
    const revealElements = document.querySelectorAll('.blog-article h2, .blog-article h3, .blog-article .highlight-box, .blog-article .blog-stats, .blog-article .blog-faq, .blog-cta, .newsletter-section, .related-articles');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });

    // ============================================
    // 8. IMAGE HOVER ANIMATIONS
    // ============================================
    const blogImages = document.querySelectorAll('.featured-image, .related-image');
    
    blogImages.forEach(function(img) {
        img.addEventListener('mouseenter', function() {
            this.querySelector('i').style.transform = 'scale(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.querySelector('i').style.transform = 'scale(1)';
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

    console.log('%c WDA Blog Detail - Loaded ', 'background: #353574; color: #fff; font-size: 1rem; padding: 8px 16px; border-radius: 6px; font-weight: bold;');
});