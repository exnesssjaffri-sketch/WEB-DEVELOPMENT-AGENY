/* ================================================================
   JAFFEIZ RESTAURANT — Complete JavaScript
   ================================================================
   Features: Loading screen, particles, typing effect, menu filter,
   cart system, coupon, booking/billing flow, review carousel,
   scroll animations, mobile nav, promo banner, 4-step checkout.
   ================================================================ */

'use strict';

// ================================================================
// 1. DATA — Menu Items & Reviews
// ================================================================

/** Array of menu items for the categorized menu */
const menuData = [
    // ---- Pakistani Meals (with plate sizes) ----
    {
        id: 1,
        name: 'Chicken Biryani',
        category: 'pakistani',
        flavor: 'spicy',
        sizes: ['Half Plate (Rs. 349)', 'Full Plate (Rs. 549)'],
        sizePrices: { 'Half Plate (Rs. 349)': 349, 'Full Plate (Rs. 549)': 549 },
        description: 'Fragrant basmati rice layered with tender chicken, aromatic spices, and saffron.',
        price: 349,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80'
    },
    {
        id: 2,
        name: 'Beef Korma',
        category: 'pakistani',
        flavor: 'soft',
        sizes: ['Half Plate (Rs. 449)', 'Full Plate (Rs. 699)'],
        sizePrices: { 'Half Plate (Rs. 449)': 449, 'Full Plate (Rs. 699)': 699 },
        description: 'Slow-cooked tender beef in a rich, creamy yogurt and cashew gravy.',
        price: 449,
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'
    },
    {
        id: 3,
        name: 'Chicken Karahi',
        category: 'pakistani',
        flavor: 'spicy',
        sizes: ['Half Plate (Rs. 399)', 'Full Plate (Rs. 649)'],
        sizePrices: { 'Half Plate (Rs. 399)': 399, 'Full Plate (Rs. 649)': 649 },
        description: 'Sizzling wok-cooked chicken with tomatoes, ginger, and green chilies.',
        price: 399,
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80'
    },
    {
        id: 4,
        name: 'Lamb Pulao',
        category: 'pakistani',
        flavor: 'soft',
        sizes: ['Half Plate (Rs. 499)', 'Full Plate (Rs. 799)'],
        sizePrices: { 'Half Plate (Rs. 499)': 499, 'Full Plate (Rs. 799)': 799 },
        description: 'Fragrant rice with tender lamb, caramelized onions, and warm spices.',
        price: 499,
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80'
    },
    {
        id: 5,
        name: 'Daal Chawal',
        category: 'pakistani',
        flavor: 'soft',
        sizes: ['Half Plate (Rs. 249)', 'Full Plate (Rs. 399)'],
        sizePrices: { 'Half Plate (Rs. 249)': 249, 'Full Plate (Rs. 399)': 399 },
        description: 'Comforting lentils simmered with garlic and cumin, served over steamed rice.',
        price: 249,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
    },
    {
        id: 6,
        name: 'Seekh Kebab',
        category: 'pakistani',
        flavor: 'spicy',
        sizes: ['4 Pcs (Rs. 299)', '8 Pcs (Rs. 499)'],
        sizePrices: { '4 Pcs (Rs. 299)': 299, '8 Pcs (Rs. 499)': 499 },
        description: 'Spiced minced meat skewers grilled to perfection on the tandoor.',
        price: 299,
        image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80'
    },
    // ---- Drinks (with cup sizes) ----
    {
        id: 8,
        name: 'Espresso',
        category: 'drinks',
        flavor: 'soft',
        sizes: ['Small Cup (Rs. 149)', 'Large Cup (Rs. 249)'],
        sizePrices: { 'Small Cup (Rs. 149)': 149, 'Large Cup (Rs. 249)': 249 },
        description: 'Rich, bold single-origin espresso shot. Pure energy in a cup.',
        price: 149,
        image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&q=80'
    },
    {
        id: 9,
        name: 'Cappuccino',
        category: 'drinks',
        flavor: 'soft',
        sizes: ['Small Cup (Rs. 199)', 'Large Cup (Rs. 349)'],
        sizePrices: { 'Small Cup (Rs. 199)': 199, 'Large Cup (Rs. 349)': 349 },
        description: 'Velvety espresso with steamed milk foam and a dusting of cocoa.',
        price: 199,
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80'
    },
    {
        id: 10,
        name: 'Latte',
        category: 'drinks',
        flavor: 'soft',
        sizes: ['Small Cup (Rs. 249)', 'Large Cup (Rs. 399)'],
        sizePrices: { 'Small Cup (Rs. 249)': 249, 'Large Cup (Rs. 399)': 399 },
        description: 'Smooth espresso with creamy steamed milk. Available in vanilla or caramel.',
        price: 249,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80'
    },
    {
        id: 11,
        name: 'Mango Milkshake',
        category: 'drinks',
        flavor: 'soft',
        sizes: ['Regular Glass (Rs. 299)', 'Large Glass (Rs. 449)'],
        sizePrices: { 'Regular Glass (Rs. 299)': 299, 'Large Glass (Rs. 449)': 449 },
        description: 'Thick, creamy milkshake made with fresh Alphonso mangoes.',
        price: 299,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80'
    },
    {
        id: 12,
        name: 'Chocolate Milkshake',
        category: 'drinks',
        flavor: 'soft',
        sizes: ['Regular Glass (Rs. 299)', 'Large Glass (Rs. 449)'],
        sizePrices: { 'Regular Glass (Rs. 299)': 299, 'Large Glass (Rs. 449)': 449 },
        description: 'Decadent chocolate milkshake topped with whipped cream and shavings.',
        price: 299,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80'
    },
    {
        id: 13,
        name: 'Vanilla Ice Cream Shake',
        category: 'drinks',
        flavor: 'soft',
        sizes: ['Regular Glass (Rs. 249)', 'Large Glass (Rs. 399)'],
        sizePrices: { 'Regular Glass (Rs. 249)': 249, 'Large Glass (Rs. 399)': 399 },
        description: 'Creamy vanilla ice cream blended with milk for a smooth, classic shake.',
        price: 249,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80'
    },
    {
        id: 14,
        name: 'Strawberry Ice Cream Shake',
        category: 'drinks',
        flavor: 'soft',
        sizes: ['Regular Glass (Rs. 299)', 'Large Glass (Rs. 449)'],
        sizePrices: { 'Regular Glass (Rs. 299)': 299, 'Large Glass (Rs. 449)': 449 },
        description: 'Fresh strawberry ice cream shaken with milk and a touch of sweetness.',
        price: 299,
        image: 'https://images.unsplash.com/photo-1505253758479-34fbd9f1a0d9?w=400&q=80'
    },
    {
        id: 15,
        name: 'Mango Ice Cream Float',
        category: 'drinks',
        flavor: 'soft',
        sizes: ['Regular Glass (Rs. 299)', 'Large Glass (Rs. 449)'],
        sizePrices: { 'Regular Glass (Rs. 299)': 299, 'Large Glass (Rs. 449)': 449 },
        description: 'Mango ice cream served in chilled soda — a fruity, creamy float.',
        price: 299,
        image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&q=80'
    },
    {
        id: 16,
        name: 'Kulfi Cream',
        category: 'drinks',
        flavor: 'soft',
        sizes: ['Regular Glass (Rs. 349)', 'Large Glass (Rs. 549)'],
        sizePrices: { 'Regular Glass (Rs. 349)': 349, 'Large Glass (Rs. 549)': 549 },
        description: 'Traditional kulfi-inspired creamy drink with pistachio and cardamom notes.',
        price: 349,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80'
    },
    // ---- Pizzas (with plate sizes) ----
    {
        id: 17,
        name: 'Margherita Pizza',
        category: 'pizza',
        flavor: 'soft',
        sizes: ['Medium (Rs. 499)', 'Large (Rs. 799)', 'Family (Rs. 1,199)'],
        sizePrices: { 'Medium (Rs. 499)': 499, 'Large (Rs. 799)': 799, 'Family (Rs. 1,199)': 1199 },
        description: 'Classic wood-fired Margherita with San Marzano tomatoes, fresh mozzarella, and basil.',
        price: 499,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80'
    },
    {
        id: 18,
        name: 'Pepperoni Pizza',
        category: 'pizza',
        flavor: 'spicy',
        sizes: ['Medium (Rs. 599)', 'Large (Rs. 949)', 'Family (Rs. 1,399)'],
        sizePrices: { 'Medium (Rs. 599)': 599, 'Large (Rs. 949)': 949, 'Family (Rs. 1,399)': 1399 },
        description: 'Loaded with spicy pepperoni, melted mozzarella, and tangy tomato sauce on a crispy crust.',
        price: 599,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80'
    },
    {
        id: 19,
        name: 'BBQ Chicken Pizza',
        category: 'pizza',
        flavor: 'spicy',
        sizes: ['Medium (Rs. 699)', 'Large (Rs. 1,099)', 'Family (Rs. 1,599)'],
        sizePrices: { 'Medium (Rs. 699)': 699, 'Large (Rs. 1,099)': 1099, 'Family (Rs. 1,599)': 1599 },
        description: 'Smoky BBQ chicken, red onions, cilantro, and a blend of cheeses on a hand-tossed crust.',
        price: 699,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80'
    },
    {
        id: 20,
        name: 'Veggie Supreme Pizza',
        category: 'pizza',
        flavor: 'soft',
        sizes: ['Medium (Rs. 549)', 'Large (Rs. 899)', 'Family (Rs. 1,299)'],
        sizePrices: { 'Medium (Rs. 549)': 549, 'Large (Rs. 899)': 899, 'Family (Rs. 1,299)': 1299 },
        description: 'Colorful bell peppers, mushrooms, olives, onions, and fresh tomatoes with mozzarella.',
        price: 549,
        image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&q=80'
    },
    {
        id: 21,
        name: 'Fiesta Pizza',
        category: 'pizza',
        flavor: 'spicy',
        sizes: ['Medium (Rs. 649)', 'Large (Rs. 999)', 'Family (Rs. 1,499)'],
        sizePrices: { 'Medium (Rs. 649)': 649, 'Large (Rs. 999)': 999, 'Family (Rs. 1,499)': 1499 },
        description: 'Spicy chorizo, jalapeños, bell peppers, and pepper jack cheese — a flavor explosion!',
        price: 649,
        image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80'
    },
    // ---- Burgers (with size options) ----
    {
        id: 22,
        name: 'Classic Cheeseburger',
        category: 'burger',
        flavor: 'soft',
        sizes: ['Single (Rs. 349)', 'Double (Rs. 549)'],
        sizePrices: { 'Single (Rs. 349)': 349, 'Double (Rs. 549)': 549 },
        description: 'Juicy beef patty with melted cheddar, lettuce, tomato, and our secret sauce on a brioche bun.',
        price: 349,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80'
    },
    {
        id: 23,
        name: 'Smoky BBQ Burger',
        category: 'burger',
        flavor: 'spicy',
        sizes: ['Single (Rs. 449)', 'Double (Rs. 699)'],
        sizePrices: { 'Single (Rs. 449)': 449, 'Double (Rs. 699)': 699 },
        description: 'Grilled beef patty topped with smoky BBQ sauce, crispy onion rings, and smoked gouda.',
        price: 449,
        image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80'
    },
    {
        id: 24,
        name: 'Chicken Crisp Burger',
        category: 'burger',
        flavor: 'soft',
        sizes: ['Single (Rs. 399)', 'Double (Rs. 599)'],
        sizePrices: { 'Single (Rs. 399)': 399, 'Double (Rs. 599)': 599 },
        description: 'Crispy fried chicken fillet with lettuce, pickles, and creamy mayo in a toasted sesame bun.',
        price: 399,
        image: 'https://images.unsplash.com/photo-1606755962773-d3245690a8f8?w=400&q=80'
    },
    {
        id: 25,
        name: 'Double Bacon Beast',
        category: 'burger',
        flavor: 'spicy',
        sizes: ['Single (Rs. 599)', 'Triple (Rs. 899)'],
        sizePrices: { 'Single (Rs. 599)': 599, 'Triple (Rs. 899)': 899 },
        description: 'Two beef patties, crispy bacon, cheddar, BBQ sauce, and onion jam — for the hungry!',
        price: 599,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80'
    },
    {
        id: 26,
        name: 'Mushroom Swiss Burger',
        category: 'burger',
        flavor: 'soft',
        sizes: ['Single (Rs. 499)', 'Double (Rs. 749)'],
        sizePrices: { 'Single (Rs. 499)': 499, 'Double (Rs. 749)': 749 },
        description: 'Sauteed mushrooms, melted Swiss cheese, garlic aioli, and arugula on a artisan bun.',
        price: 499,
        image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&q=80'
    },
    // ---- Ice Creams (with cup sizes) ----
    {
        id: 27,
        name: 'Belgian Chocolate Dream',
        category: 'ice-cream',
        flavor: 'soft',
        sizes: ['Small Cup (Rs. 249)', 'Medium Cup (Rs. 399)', 'Family Tub (Rs. 699)'],
        sizePrices: { 'Small Cup (Rs. 249)': 249, 'Medium Cup (Rs. 399)': 399, 'Family Tub (Rs. 699)': 699 },
        description: 'Rich Belgian chocolate ice cream with fudge swirls and chocolate shavings.',
        price: 249,
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80'
    },
    {
        id: 28,
        name: 'Mango Tango Sorbet',
        category: 'ice-cream',
        flavor: 'soft',
        sizes: ['Small Cup (Rs. 199)', 'Medium Cup (Rs. 349)', 'Family Tub (Rs. 599)'],
        sizePrices: { 'Small Cup (Rs. 199)': 199, 'Medium Cup (Rs. 349)': 349, 'Family Tub (Rs. 599)': 599 },
        description: 'Vibrant mango sorbet made with Alphonso mangoes — dairy-free and refreshing.',
        price: 199,
        image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&q=80'
    },
    {
        id: 29,
        name: 'Pistachio Cardamom',
        category: 'ice-cream',
        flavor: 'soft',
        sizes: ['Small Cup (Rs. 249)', 'Medium Cup (Rs. 399)', 'Family Tub (Rs. 699)'],
        sizePrices: { 'Small Cup (Rs. 249)': 249, 'Medium Cup (Rs. 399)': 399, 'Family Tub (Rs. 699)': 699 },
        description: 'Creamy pistachio ice cream with a hint of cardamom and crushed pistachio brittle.',
        price: 249,
        image: 'https://images.unsplash.com/photo-1505394033641-40f6ad2719bd?w=400&q=80'
    },
    {
        id: 30,
        name: 'Strawberry Cheesecake',
        category: 'ice-cream',
        flavor: 'soft',
        sizes: ['Small Cup (Rs. 299)', 'Medium Cup (Rs. 449)', 'Family Tub (Rs. 799)'],
        sizePrices: { 'Small Cup (Rs. 299)': 299, 'Medium Cup (Rs. 449)': 449, 'Family Tub (Rs. 799)': 799 },
        description: 'Cream cheese ice cream with strawberry swirls and graham cracker crumbles.',
        price: 299,
        image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&q=80'
    },
    {
        id: 31,
        name: 'Salted Caramel Crunch',
        category: 'ice-cream',
        flavor: 'soft',
        sizes: ['Small Cup (Rs. 299)', 'Medium Cup (Rs. 449)', 'Family Tub (Rs. 799)'],
        sizePrices: { 'Small Cup (Rs. 299)': 299, 'Medium Cup (Rs. 449)': 449, 'Family Tub (Rs. 799)': 799 },
        description: 'Buttery caramel ice cream with sea salt flakes and crunchy caramelized pecans.',
        price: 299,
        image: 'https://images.unsplash.com/photo-1570197785657-899d33a730bb?w=400&q=80'
    }
];

/** Array of fake reviews for the carousel */
const reviewsData = [
    {
        name: 'Sarah Al-Mansouri',
        location: 'Dubai, UAE',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
        stars: 5,
        text: 'Absolutely phenomenal! The Chicken Biryani at Jaffeiz transported me straight to Lahore. The aroma, the spices, the tenderness of the meat — perfection. And their Chai? Out of this world. I had it delivered to Dubai and it arrived hot and fresh. Jaffeiz has earned a lifelong customer.'
    },
    {
        name: 'James Mitchell',
        location: 'London, UK',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
        stars: 5,
        text: 'I\'ve traveled the world and tasted cuisine from every corner, but Jaffeiz holds a special place in my heart. The Beef Korma is the best I\'ve ever had — rich, creamy, and packed with flavor. The worldwide delivery is a game-changer. My family in London gets Jaffeiz delivered weekly now!'
    },
    {
        name: 'Priya Sharma',
        location: 'Mumbai, India',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
        stars: 5,
        text: 'Jaffeiz is not just a restaurant; it\'s an experience. I booked the Romantic Couple dinner for our anniversary and it was magical. The ambiance, the service, the food — every detail was impeccable. Haider Jaffri has created something truly special. We\'ll be coming back every year!'
    },
    {
        name: 'Ahmed Hassan',
        location: 'Karachi, Pakistan',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
        stars: 5,
        text: 'Being from Karachi, I know good Pakistani food. Jaffeiz exceeds every expectation. Their Karahi is legendary — cooked exactly the way it should be. The FIFA World Cup promo was a nice touch too! 20% off with FIFA2026 code made our family feast even sweeter. Highly recommended!'
    }
];

// ================================================================
// 2. LOADING SCREEN
// ================================================================

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 600);
        }, 2000); // 2 second loading screen
    }
});

// ================================================================
// 3. PARTICLE BACKGROUND (Canvas)
// ================================================================

function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = `rgba(193, 154, 43, ${this.opacity})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Create particles based on screen size
    const particleCount = Math.min(Math.floor(canvas.width * canvas.height / 15000), 100);

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Connection lines between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(193, 154, 43, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        drawConnections();

        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
}

// Initialize particles after DOM is ready
document.addEventListener('DOMContentLoaded', initParticles);

// ================================================================
// 4. TYPING EFFECT FOR HERO HEADING
// ================================================================

function initTypingEffect() {
    const headingEl = document.getElementById('hero-heading');
    if (!headingEl) return;

    const text = 'Welcome to Jaffeiz – A World of Flavor Awaits.';
    let index = 0;
    let isDeleting = false;
    let speed = 80;

    function type() {
        if (!isDeleting) {
            // Typing forward
            headingEl.textContent = text.slice(0, index);
            index++;

            if (index > text.length) {
                // Pause at the end, then start deleting
                isDeleting = true;
                speed = 40; // Faster when deleting
                setTimeout(type, 2000); // Pause before deleting
                return;
            }
        } else {
            // Deleting backward
            headingEl.textContent = text.slice(0, index);
            index--;

            if (index < 0) {
                // Reset and start over
                isDeleting = false;
                index = 0;
                speed = 80;
                setTimeout(type, 500);
                return;
            }
        }

        setTimeout(type, speed);
    }

    // Start typing after loading screen
    setTimeout(type, 2500);
}

document.addEventListener('DOMContentLoaded', initTypingEffect);

// ================================================================
// 5. STICKY NAVIGATION & MOBILE TOGGLE
// ================================================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Sticky nav on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
}

document.addEventListener('DOMContentLoaded', initNavigation);

// ================================================================
// 6. PROMO BANNER DISMISS
// ================================================================

function initPromoBanner() {
    const promoBanner = document.getElementById('promo-banner');
    const promoClose = document.getElementById('promo-close');

    if (promoClose && promoBanner) {
        promoClose.addEventListener('click', () => {
            promoBanner.classList.add('hidden');
            // Adjust navbar top padding since banner is gone
            const navbar = document.getElementById('navbar');
            if (navbar) {
                navbar.style.top = '0';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initPromoBanner);

// ================================================================
// 7. MENU RENDERING & FILTERING
// ================================================================

function initMenu() {
    const menuGrid = document.getElementById('menu-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (!menuGrid) return;

    let currentFilter = 'all';

    /** Render menu items based on active filter */
    function renderMenu(filter) {
        const filtered = filter === 'all'
            ? menuData
            : menuData.filter(item => item.category === filter);

        menuGrid.innerHTML = '';

        filtered.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'menu-item';
            card.style.animationDelay = `${index * 0.1}s`;

            // Map category to display label
            const categoryLabels = {
                'pakistani': 'Pakistani Meal',
                'drinks': 'Drink',
                'pizza': 'Pizza',
                'burger': 'Burger',
                'ice-cream': 'Ice Cream'
            };
            const displayCategory = categoryLabels[item.category] || item.category;

            // Flavor badge
            const flavorBadge = item.flavor === 'spicy'
                ? '<span class="flavor-badge spicy">🌶️ Spicy</span>'
                : '<span class="flavor-badge soft">😊 Soft</span>';

            // Size selector HTML
            let sizeSelectorHtml = '';
            if (item.sizes && item.sizes.length > 0) {
                sizeSelectorHtml = '<div class="size-selector">';
                item.sizes.forEach((size, si) => {
                    const selected = si === 0 ? 'checked' : '';
                    const sizePrice = item.sizePrices[size];
                    sizeSelectorHtml += `
                        <label class="size-option ${si === 0 ? 'selected' : ''}">
                            <input type="radio" name="size-${item.id}" value="${size}" data-price="${sizePrice}" ${selected}>
                            <span class="size-label">${size}</span>
                        </label>
                    `;
                });
                sizeSelectorHtml += '</div>';
            }

            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="menu-item-image" loading="lazy" />
                <div class="menu-item-info">
                    <h3 class="menu-item-name">${item.name}</h3>
                    <div class="menu-item-badges">
                        <p class="menu-item-category">${displayCategory}</p>
                        ${flavorBadge}
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                    ${sizeSelectorHtml}
                    <div class="menu-item-footer">
                        <span class="menu-item-price" data-base-price="${item.price}">Rs. ${item.price}</span>
                        <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
                    </div>
                </div>
            `;

            menuGrid.appendChild(card);
        });

        // Attach size selector change events to update displayed price
        document.querySelectorAll('.size-option input[type="radio"]').forEach(input => {
            input.addEventListener('change', function() {
                const parentCard = this.closest('.menu-item');
                const priceSpan = parentCard.querySelector('.menu-item-price');
                const newPrice = parseInt(this.dataset.price);
                priceSpan.textContent = `Rs. ${newPrice.toLocaleString()}`;

                // Update visual selection
                parentCard.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
                this.closest('.size-option').classList.add('selected');
            });
        });

        // Attach add-to-cart event listeners with size info
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                const parentCard = btn.closest('.menu-item');

                // Get selected size
                let selectedSize = null;
                let sizePrice = null;
                const sizeInput = parentCard.querySelector('.size-option input[type="radio"]:checked');
                if (sizeInput) {
                    selectedSize = sizeInput.value;
                    sizePrice = parseInt(sizeInput.dataset.price);
                }

                addToCart(id, selectedSize, sizePrice);
            });
        });
    }

    // Initial render
    renderMenu('all');

    // Filter button click handlers
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderMenu(currentFilter);
        });
    });
}

document.addEventListener('DOMContentLoaded', initMenu);

// ================================================================
// 8. SHOPPING CART SYSTEM
// ================================================================

let cart = [];
let couponApplied = false;
let discountPercent = 0;

/** Find a menu item by ID */
function findMenuItem(id) {
    return menuData.find(item => item.id === id);
}

/** Add item to cart */
function addToCart(id, selectedSize = null, sizePrice = null) {
    const menuItem = findMenuItem(id);
    if (!menuItem) return;

    // Build a unique key from id + size so different sizes are separate cart items
    const sizeKey = selectedSize || 'default';
    const cartKey = `${id}-${sizeKey}`;
    const existing = cart.find(item => item.cartKey === cartKey);

    const finalPrice = sizePrice || menuItem.price;
    const displayName = selectedSize ? `${menuItem.name} (${selectedSize.replace(/ *\([^)]*\) */g, '').trim()})` : menuItem.name;

    if (existing) {
        existing.quantity += 1;
        existing.price = finalPrice;
    } else {
        cart.push({
            cartKey: cartKey,
            id: menuItem.id,
            name: displayName,
            price: finalPrice,
            quantity: 1,
            size: selectedSize
        });
    }

    updateCartUI();
    showAddFeedback();
}

/** Show a brief visual feedback when item is added */
function showAddFeedback() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.textContent = '✓ Item Added!';
        setTimeout(() => {
            checkoutBtn.textContent = 'Proceed to Checkout';
        }, 1000);
    }
}

/** Remove item from cart using cartKey */
function removeFromCart(cartKey) {
    cart = cart.filter(item => item.cartKey !== cartKey);
    updateCartUI();
}

/** Update item quantity using cartKey */
function updateQuantity(cartKey, delta) {
    const item = cart.find(i => i.cartKey === cartKey);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(cartKey);
            return;
        }
    }
    updateCartUI();
}

/** Calculate cart total */
function getCartTotal() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (couponApplied && discountPercent > 0) {
        return subtotal * (1 - discountPercent / 100);
    }
    return subtotal;
}

/** Update the cart UI */
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartCount = document.querySelectorAll('.cart-count');

    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty. Start adding delicious meals!</p>';
        totalPrice.textContent = 'Rs. 0';
        if (checkoutBtn) {
            checkoutBtn.disabled = true;
        }
        // Update any cart count badges
        cartCount.forEach(el => el.textContent = '0');
        return;
    }

    let html = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        html += `
            <div class="cart-item">
                <span class="cart-item-name">${item.name}</span>
                <div class="cart-item-qty">
                    <button class="qty-btn" data-cartkey="${item.cartKey}" data-delta="-1">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" data-cartkey="${item.cartKey}" data-delta="1">+</button>
                </div>
                <span class="cart-item-price">Rs. ${itemTotal.toLocaleString()}</span>
                <button class="cart-item-remove" data-cartkey="${item.cartKey}">&times;</button>
            </div>
        `;
    });

    cartItems.innerHTML = html;

    // Attach quantity button events using cartKey
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cartKey = btn.dataset.cartkey;
            const delta = parseInt(btn.dataset.delta);
            updateQuantity(cartKey, delta);
        });
    });

    // Attach remove button events using cartKey
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const cartKey = btn.dataset.cartkey;
            removeFromCart(cartKey);
        });
    });

    // Update total
    const total = getCartTotal();
    totalPrice.textContent = `Rs. ${total.toLocaleString()}`;

    // Enable checkout
    if (checkoutBtn) {
        checkoutBtn.disabled = false;
    }

    // Update cart count badges
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.forEach(el => el.textContent = totalItems);
}

// ================================================================
// 9. COUPON SYSTEM
// ================================================================

function initCouponSystem() {
    const couponInput = document.getElementById('coupon-input');
    const applyBtn = document.getElementById('apply-coupon');
    const couponMessage = document.getElementById('coupon-message');

    if (!applyBtn || !couponInput) return;

    applyBtn.addEventListener('click', () => {
        const code = couponInput.value.trim().toUpperCase();

        if (code === 'FIFA2026') {
            couponApplied = true;
            discountPercent = 20;
            couponMessage.textContent = '✅ Coupon applied! You get 20% OFF!';
            couponMessage.className = 'coupon-message success';
            couponInput.value = '';
            updateCartUI();
        } else {
            couponApplied = false;
            discountPercent = 0;
            couponMessage.textContent = '❌ Invalid coupon code. Please try again.';
            couponMessage.className = 'coupon-message error';
            updateCartUI();
        }
    });

    // Allow pressing Enter to apply coupon
    couponInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            applyBtn.click();
        }
    });
}

document.addEventListener('DOMContentLoaded', initCouponSystem);

// ================================================================
// 10. BOOKING & BILLING FLOW
// ================================================================

function initBooking() {
    const bookingTypeCards = document.querySelectorAll('.booking-type-card');
    const bookingFormWrapper = document.getElementById('booking-form-wrapper');
    const billingFormWrapper = document.getElementById('billing-form-wrapper');
    const bookingForm = document.getElementById('booking-form');
    const billingForm = document.getElementById('billing-form');
    const billingBack = document.getElementById('billing-back');
    const bookingTypeInput = document.getElementById('booking-type');
    const bookingFormTitle = document.getElementById('booking-form-title');
    const successModal = document.getElementById('success-modal');
    const modalClose = document.getElementById('modal-close');

    let selectedType = null;
    let bookingData = {};

    // ---- Select booking type ----
    bookingTypeCards.forEach(card => {
        card.addEventListener('click', () => {
            bookingTypeCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            selectedType = card.dataset.type;
            bookingTypeInput.value = selectedType;

            // Show booking form
            bookingFormWrapper.style.display = 'block';
            billingFormWrapper.style.display = 'none';

            // Update form title
            if (selectedType === 'family') {
                bookingFormTitle.textContent = 'Book Your Family Feast';
            } else {
                bookingFormTitle.textContent = 'Book Your Romantic Dinner';
            }

            // Scroll to form
            bookingFormWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ---- Booking form submit -> Show billing ----
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Gather booking data
            bookingData = {
                type: selectedType,
                name: document.getElementById('book-name').value.trim(),
                email: document.getElementById('book-email').value.trim(),
                date: document.getElementById('book-date').value,
                time: document.getElementById('book-time').value,
                guests: document.getElementById('book-guests').value,
                phone: document.getElementById('book-phone').value.trim(),
                special: document.getElementById('book-special').value.trim()
            };

            // Basic validation
            if (!bookingData.name || !bookingData.email || !bookingData.date || !bookingData.time) {
                alert('Please fill in all required fields.');
                return;
            }

            // Populate billing summary
            const typeLabel = selectedType === 'family' ? 'Family Feast' : 'Romantic Couple';
            const totalAmount = selectedType === 'family' ? 49.99 : 39.99;

            document.getElementById('billing-summary-type').textContent = typeLabel;
            document.getElementById('billing-summary-date').textContent = `${bookingData.date} at ${bookingData.time}`;
            document.getElementById('billing-summary-guests').textContent = bookingData.guests;
            document.getElementById('billing-summary-total').textContent = `$${totalAmount.toFixed(2)}`;
            document.getElementById('billing-amount').textContent = totalAmount.toFixed(2);

            // Show billing form
            bookingFormWrapper.style.display = 'none';
            billingFormWrapper.style.display = 'block';

            billingFormWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // ---- Billing back button ----
    if (billingBack) {
        billingBack.addEventListener('click', () => {
            billingFormWrapper.style.display = 'none';
            bookingFormWrapper.style.display = 'block';
            bookingFormWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // ---- Billing form submit -> Success modal ----
    if (billingForm) {
        billingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Show success modal
            if (successModal) {
                successModal.style.display = 'flex';
            }
        });
    }

    // ---- Close modal ----
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            if (successModal) {
                successModal.style.display = 'none';
            }
            // Reset booking flow
            bookingTypeCards.forEach(c => c.classList.remove('selected'));
            bookingFormWrapper.style.display = 'none';
            billingFormWrapper.style.display = 'none';
            bookingForm.reset();
            billingForm.reset();
            selectedType = null;
            // Scroll to top of booking section
            document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Close modal on overlay click
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.style.display = 'none';
                // Reset
                bookingTypeCards.forEach(c => c.classList.remove('selected'));
                bookingFormWrapper.style.display = 'none';
                billingFormWrapper.style.display = 'none';
                bookingForm.reset();
                billingForm.reset();
                selectedType = null;
            }
        });
    }

    // ---- Credit card formatting ----
    const cardInput = document.getElementById('billing-card');
    if (cardInput) {
        cardInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 16) value = value.slice(0, 16);
            // Add spaces every 4 digits
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            e.target.value = value;
        });
    }

    const expiryInput = document.getElementById('billing-expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 4) value = value.slice(0, 4);
            if (value.length > 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            e.target.value = value;
        });
    }

    const cvvInput = document.getElementById('billing-cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 4) value = value.slice(0, 4);
            e.target.value = value;
        });
    }
}

document.addEventListener('DOMContentLoaded', initBooking);

// ================================================================
// 11. REVIEWS CAROUSEL
// ================================================================

function initReviews() {
    const track = document.getElementById('reviews-track');
    const prevBtn = document.getElementById('review-prev');
    const nextBtn = document.getElementById('review-next');
    const dotsContainer = document.getElementById('review-dots');

    if (!track) return;

    let currentIndex = 0;

    // Render reviews
    reviewsData.forEach((review, index) => {
        const card = document.createElement('div');
        card.className = 'review-card';

        const starsHtml = '★'.repeat(review.stars) + '☆'.repeat(5 - review.stars);

        card.innerHTML = `
            <img src="${review.avatar}" alt="${review.name}" class="review-avatar" loading="lazy" />
            <h3 class="review-name">${review.name}</h3>
            <p class="review-location">${review.location}</p>
            <div class="review-stars">${starsHtml}</div>
            <p class="review-text">${review.text}</p>
        `;

        track.appendChild(card);
    });

    // Create dots
    reviewsData.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `review-dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const totalSlides = reviewsData.length;

    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = totalSlides - 1;
        if (currentIndex >= totalSlides) currentIndex = 0;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update dots
        document.querySelectorAll('.review-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    }

    // Auto-advance carousel every 5 seconds
    let autoAdvance = setInterval(() => goToSlide(currentIndex + 1), 5000);

    // Pause on hover
    const carousel = document.querySelector('.reviews-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(autoAdvance));
        carousel.addEventListener('mouseleave', () => {
            autoAdvance = setInterval(() => goToSlide(currentIndex + 1), 5000);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
        if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
    });
}

document.addEventListener('DOMContentLoaded', initReviews);

// ================================================================
// 12. SCROLL ANIMATIONS (Intersection Observer)
// ================================================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);

// ================================================================
// 13. 4-STEP CHECKOUT PROCESS
// ================================================================

function initCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutModalClose = document.getElementById('checkout-modal-close');
    const steps = document.querySelectorAll('.checkout-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextBtns = document.querySelectorAll('.step-next-btn');
    const backBtns = document.querySelectorAll('.step-back-btn');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const prepAcknowledge = document.getElementById('prep-acknowledge');
    const orderConfirmModal = document.getElementById('order-confirm-modal');
    const orderConfirmClose = document.getElementById('order-confirm-close');

    // Checkout data collected across steps
    let checkoutData = {
        phone: '',
        email: '',
        name: '',
        address: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        paymentMethod: 'card'
    };

    // OTP state
    let otpCountdownInterval = null;
    let phoneVerified = false;

    if (!checkoutBtn) return;

    // ---- Open checkout modal ----
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        // Reset checkout state
        resetCheckout();
        // Populate billing summary in step 3
        populateBillingSummary();
        checkoutModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // ---- Close checkout modal ----
    function closeCheckoutModal() {
        checkoutModal.style.display = 'none';
        document.body.style.overflow = '';
        if (otpCountdownInterval) {
            clearInterval(otpCountdownInterval);
            otpCountdownInterval = null;
        }
    }

    checkoutModalClose.addEventListener('click', closeCheckoutModal);
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) closeCheckoutModal();
    });

    // ---- Reset checkout to step 1 ----
    function resetCheckout() {
        phoneVerified = false;
        checkoutData = {
            phone: '',
            email: '',
            name: '',
            address: '',
            cardName: '',
            cardNumber: '',
            expiry: '',
            cvv: '',
            paymentMethod: 'card'
        };
        // Reset OTP section
        const otpSection = document.getElementById('step1-otp-section');
        otpSection.classList.remove('show');
        document.getElementById('step1-otp-success').style.display = 'none';
        document.getElementById('step1-otp-error').style.display = 'none';
        document.querySelectorAll('.checkout-otp-input').forEach(inp => {
            inp.value = '';
            inp.classList.remove('filled');
        });
        document.getElementById('checkout-phone').value = '';
        document.getElementById('checkout-email').value = '';
        document.getElementById('checkout-name').value = '';
        document.getElementById('checkout-address').value = '';
        document.getElementById('checkout-card-name').value = '';
        document.getElementById('checkout-card-number').value = '';
        document.getElementById('checkout-expiry').value = '';
        document.getElementById('checkout-cvv').value = '';
        document.getElementById('checkout-payment-method').value = 'card';
        prepAcknowledge.checked = false;
        placeOrderBtn.disabled = true;
        goToStep(1);
    }

    // ---- Navigate to a specific step ----
    function goToStep(stepNum) {
        // Update steps
        steps.forEach(s => s.classList.remove('active'));
        const targetStep = document.querySelector(`.checkout-step[data-step="${stepNum}"]`);
        if (targetStep) targetStep.classList.add('active');

        // Update progress bar
        progressSteps.forEach(ps => {
            const psNum = parseInt(ps.dataset.step);
            ps.classList.remove('active', 'completed');
            if (psNum === stepNum) {
                ps.classList.add('active');
            } else if (psNum < stepNum) {
                ps.classList.add('completed');
            }
        });

        // Scroll to top of modal content
        document.querySelector('.checkout-modal-content').scrollTop = 0;
        checkoutModal.scrollTop = 0;
    }

    // ---- Step navigation: Next buttons ----
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = parseInt(btn.dataset.target);
            goToStep(target);
        });
    });

    // ---- Step navigation: Back buttons ----
    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = parseInt(btn.dataset.target);
            goToStep(target);
        });
    });

    // ================================================================
    // STEP 1: PHONE VERIFICATION WITH OTP
    // ================================================================

    const sendOtpBtn = document.getElementById('step1-send-otp-btn');
    const phoneInput = document.getElementById('checkout-phone');
    const step1NextBtn = document.querySelector('.checkout-step[data-step="1"] .step-next-btn');
    const otpInputs = document.querySelectorAll('.checkout-otp-input');
    const otpSection = document.getElementById('step1-otp-section');
    const otpSuccessMsg = document.getElementById('step1-otp-success');
    const otpErrorMsg = document.getElementById('step1-otp-error');
    const otpTimerText = document.querySelector('.otp-timer-text');
    const otpCountdownEl = document.querySelector('.otp-countdown');
    const otpResendBtn = document.querySelector('.otp-resend-btn');

    // Send OTP button
    sendOtpBtn.addEventListener('click', () => {
        const phone = phoneInput.value.trim();
        if (!phone || phone.length < 10) {
            alert('Please enter a valid phone number.');
            return;
        }
        checkoutData.phone = phone;
        // Show OTP section
        otpSection.classList.add('show');
        otpSuccessMsg.style.display = 'none';
        otpErrorMsg.style.display = 'none';
        // Reset OTP inputs
        otpInputs.forEach(inp => {
            inp.value = '';
            inp.classList.remove('filled');
        });
        otpInputs[0].focus();
        startOtpCountdown();
        sendOtpBtn.textContent = '📨 Code Sent!';
        sendOtpBtn.disabled = true;
        setTimeout(() => {
            sendOtpBtn.textContent = '📨 Resend Code';
            sendOtpBtn.disabled = false;
        }, 30000);
    });

    // OTP input handling
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value.length === 1) {
                this.classList.add('filled');
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            } else {
                this.classList.remove('filled');
            }
            checkOtpComplete();
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value && index > 0) {
                otpInputs[index - 1].focus();
                otpInputs[index - 1].classList.remove('filled');
            }
        });

        input.addEventListener('focus', function() {
            this.select();
        });
    });

    function checkOtpComplete() {
        let allFilled = true;
        otpInputs.forEach(inp => {
            if (!inp.value) allFilled = false;
        });
        if (allFilled) {
            // Auto-verify OTP (simulated)
            setTimeout(() => {
                verifyOtp();
            }, 300);
        }
    }

    function verifyOtp() {
        // Simulate OTP verification - always succeeds
        if (otpCountdownInterval) {
            clearInterval(otpCountdownInterval);
            otpCountdownInterval = null;
        }
        phoneVerified = true;
        otpSuccessMsg.style.display = 'block';
        otpErrorMsg.style.display = 'none';
        otpTimerText.style.display = 'none';
        otpResendBtn.style.display = 'none';
        // Enable step 1 next button
        step1NextBtn.disabled = false;
        // Disable OTP inputs
        otpInputs.forEach(inp => inp.disabled = true);
        sendOtpBtn.disabled = true;
    }

    function startOtpCountdown() {
        if (otpCountdownInterval) clearInterval(otpCountdownInterval);
        let seconds = 30;
        otpCountdownEl.textContent = seconds;
        otpTimerText.style.display = 'inline';
        otpResendBtn.style.display = 'none';

        otpCountdownInterval = setInterval(() => {
            seconds--;
            otpCountdownEl.textContent = seconds;
            if (seconds <= 0) {
                clearInterval(otpCountdownInterval);
                otpCountdownInterval = null;
                otpTimerText.style.display = 'none';
                otpResendBtn.style.display = 'inline-block';
            }
        }, 1000);
    }

    otpResendBtn.addEventListener('click', () => {
        otpInputs.forEach(inp => {
            inp.value = '';
            inp.classList.remove('filled');
        });
        otpInputs[0].focus();
        startOtpCountdown();
    });

    // ================================================================
    // STEP 2: EMAIL CONFIRMATION
    // ================================================================

    const emailInput = document.getElementById('checkout-email');
    const step2NextBtn = document.querySelector('.checkout-step[data-step="2"] .step-next-btn');

    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        const isValid = email.length > 0 && email.includes('@') && email.includes('.');
        step2NextBtn.disabled = !isValid;
        if (isValid) {
            checkoutData.email = email;
        }
    });

    // ================================================================
    // STEP 3: PAYMENT DETAILS
    // ================================================================

    const nameInput = document.getElementById('checkout-name');
    const addressInput = document.getElementById('checkout-address');
    const cardNameInput = document.getElementById('checkout-card-name');
    const cardNumberInput = document.getElementById('checkout-card-number');
    const expiryInput = document.getElementById('checkout-expiry');
    const cvvInput = document.getElementById('checkout-cvv');
    const paymentMethodSelect = document.getElementById('checkout-payment-method');
    const step3NextBtn = document.querySelector('.checkout-step[data-step="3"] .step-next-btn');

    // Card number formatting
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) value = value.slice(0, 16);
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value;
        checkoutData.cardNumber = value.replace(/\s/g, '');
    });

    // Expiry formatting
    expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        e.target.value = value;
        checkoutData.expiry = value;
    });

    // CVV formatting
    cvvInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        e.target.value = value;
        checkoutData.cvv = value;
    });

    // Collect data on input
    nameInput.addEventListener('input', () => { checkoutData.name = nameInput.value.trim(); });
    addressInput.addEventListener('input', () => { checkoutData.address = addressInput.value.trim(); });
    cardNameInput.addEventListener('input', () => { checkoutData.cardName = cardNameInput.value.trim(); });
    paymentMethodSelect.addEventListener('change', () => { checkoutData.paymentMethod = paymentMethodSelect.value; });

    // Step 3 next: validate and populate step 4 summary
    step3NextBtn.addEventListener('click', () => {
        checkoutData.name = nameInput.value.trim();
        checkoutData.address = addressInput.value.trim();
        checkoutData.cardName = cardNameInput.value.trim();

        if (!checkoutData.name || !checkoutData.address) {
            alert('Please enter your full name and delivery address.');
            return;
        }

        // Populate step 4 confirmation summary
        document.getElementById('confirm-address').textContent = checkoutData.address;
        document.getElementById('confirm-phone').textContent = checkoutData.phone;
        document.getElementById('confirm-email').textContent = checkoutData.email;
        const paymentLabels = {
            'card': 'Credit / Debit Card',
            'cod': 'Cash on Delivery',
            'jazzcash': 'JazzCash',
            'easypaisa': 'EasyPaisa'
        };
        document.getElementById('confirm-payment').textContent = paymentLabels[checkoutData.paymentMethod] || checkoutData.paymentMethod;
        const total = getCartTotal();
        document.getElementById('confirm-total').textContent = `Rs. ${total.toLocaleString()}`;

        goToStep(4);
    });

    // ================================================================
    // STEP 4: PREP TIME NOTICE & PLACE ORDER
    // ================================================================

    prepAcknowledge.addEventListener('change', () => {
        placeOrderBtn.disabled = !prepAcknowledge.checked;
    });

    // Place order
    placeOrderBtn.addEventListener('click', () => {
        if (!prepAcknowledge.checked) return;

        // Build order confirmation
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        let finalTotal = subtotal;
        let discountLine = '';
        if (couponApplied && discountPercent > 0) {
            const discountAmount = subtotal * (discountPercent / 100);
            finalTotal = subtotal - discountAmount;
            discountLine = `<p>Discount (${discountPercent}% OFF): <span style="color: #28a745;">-Rs. ${discountAmount.toLocaleString()}</span></p>`;
        }

        const orderNum = 'JZ-' + Math.floor(100000 + Math.random() * 900000);
        const paymentLabels = {
            'card': 'Credit / Debit Card',
            'cod': 'Cash on Delivery',
            'jazzcash': 'JazzCash',
            'easypaisa': 'EasyPaisa'
        };

        // Calculate estimated prep time
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        let prepTime = '20–30 minutes';
        if (totalItems <= 2) {
            prepTime = '10–15 minutes';
        } else if (totalItems >= 6) {
            prepTime = '35–45 minutes';
        }

        const confirmBody = `
            <p>Thank you, <strong>${checkoutData.name}</strong>!</p>
            <p>Your Jaffeiz order is now in the hands of our chefs. Here's what happens next:</p>
            <p style="text-align: left; margin: 16px 0;">
                1. 👨‍🍳 <strong>Our kitchen starts prepping</strong> — fresh, from scratch<br>
                2. 🔥 <strong>Your meal is cooked to perfection</strong> — just the way you like it<br>
                3. 🚀 <strong>Your order is on its way</strong> — you'll get a tracking update via SMS
            </p>
            <div style="background: rgba(193, 154, 43, 0.08); border-radius: 8px; padding: 16px; margin: 16px 0; text-align: left;">
                <strong>Order Summary</strong><br>
                🆔 Order #: ${orderNum}<br>
                📧 Receipt sent to: ${checkoutData.email}<br>
                📱 Tracking updates: ${checkoutData.phone}<br>
                📍 Delivering to: ${checkoutData.address}<br>
                💰 Total charged: Rs. ${finalTotal.toLocaleString()}<br>
                ⏳ Estimated prep time: <strong>${prepTime}</strong>
            </div>
            <p>We'll text you the moment your driver is on the way. Get ready for an unforgettable taste of Pakistan! 🇵🇰✨</p>
        `;

        document.getElementById('order-confirm-body').innerHTML = confirmBody;

        // Close checkout modal, open confirmation modal
        closeCheckoutModal();
        orderConfirmModal.style.display = 'flex';
    });

    // Close order confirmation
    orderConfirmClose.addEventListener('click', () => {
        orderConfirmModal.style.display = 'none';
        // Reset cart
        cart = [];
        couponApplied = false;
        discountPercent = 0;
        updateCartUI();
    });

    orderConfirmModal.addEventListener('click', (e) => {
        if (e.target === orderConfirmModal) {
            orderConfirmModal.style.display = 'none';
            cart = [];
            couponApplied = false;
            discountPercent = 0;
            updateCartUI();
        }
    });

    // ================================================================
    // Populate billing summary in step 3
    // ================================================================

    function populateBillingSummary() {
        const summaryItems = document.getElementById('checkout-summary-items');
        const totalsDiv = document.getElementById('checkout-totals');

        let itemsHtml = '';
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            itemsHtml += `
                <div class="checkout-summary-item">
                    <span class="item-name">${item.name}</span>
                    <span class="item-qty">${item.quantity}</span>
                    <span class="item-price">Rs. ${itemTotal.toLocaleString()}</span>
                </div>
            `;
        });
        summaryItems.innerHTML = itemsHtml;

        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        let totalsHtml = `<p>Subtotal: <span>Rs. ${subtotal.toLocaleString()}</span></p>`;
        let finalTotal = subtotal;
        if (couponApplied && discountPercent > 0) {
            const discountAmount = subtotal * (discountPercent / 100);
            finalTotal = subtotal - discountAmount;
            totalsHtml += `<p class="checkout-discount">Discount (${discountPercent}% OFF): <span>-Rs. ${discountAmount.toLocaleString()}</span></p>`;
        }
        totalsHtml += `<p class="checkout-grand-total">Total: <span>Rs. ${finalTotal.toLocaleString()}</span></p>`;
        totalsDiv.innerHTML = totalsHtml;
    }
}

document.addEventListener('DOMContentLoaded', initCheckout);

// ================================================================
// 14. SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// ================================================================
// 15. IMAGE ERROR HANDLER — Fallback for broken images
// ================================================================

/**
 * Generates a colored SVG placeholder as a data URI for broken images.
 * Each category gets a unique color so users can still identify the type.
 */
function getFallbackImageDataURI(category) {
    const colors = {
        'pakistani': '#c19a2b',
        'desi': '#2d5a3f',
        'pizza': '#dc3545',
        'burger': '#e8c84a',
        'drinks': '#17a2b8',
        'ice-cream': '#e83e8c',
        'chai': '#6f42c1',
        'default': '#c19a2b'
    };
    const color = colors[category] || colors['default'];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="${color}" opacity="0.2"/>
        <text x="200" y="140" text-anchor="middle" font-family="Arial" font-size="48" fill="${color}">🍽️</text>
        <text x="200" y="180" text-anchor="middle" font-family="Arial" font-size="14" fill="${color}">Jaffeiz Restaurant</text>
    </svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

/**
 * Global image error handler — replaces any broken <img> with a fallback.
 */
function handleImageError(imgElement) {
    if (imgElement.dataset.fallbackSet) return; // prevent infinite loop
    imgElement.dataset.fallbackSet = 'true';
    
    // Try to determine category from parent elements
    let category = 'default';
    const parent = imgElement.closest('.menu-item');
    if (parent) {
        const catEl = parent.querySelector('.menu-item-category');
        if (catEl) {
            const catText = catEl.textContent.toLowerCase().replace(/\s+/g, '');
            const catMap = { 'pakistanimeal':'pakistani', 'desi':'desi', 'pizza':'pizza', 'burger':'burger', 'drink':'drinks', 'icecream':'ice-cream', 'chai':'chai' };
            category = catMap[catText] || 'default';
        }
    }
    
    imgElement.src = getFallbackImageDataURI(category);
    imgElement.style.objectFit = 'contain';
    imgElement.style.padding = '20px';
    imgElement.style.backgroundColor = '#1a1a1a';
}

// Attach global image error listener
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        handleImageError(e.target);
    }
}, true);

// Also handle images that may have already failed before the listener was attached
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(function(img) {
        if (img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)) {
            handleImageError(img);
        }
    });
});

// ================================================================
// 16. AUTH & WELCOME SYSTEM
// ================================================================

(function() {
    'use strict';

    // ---- DOM References ----
    const authBtn = document.getElementById('auth-btn');
    const authModal = document.getElementById('auth-modal');
    const authModalClose = document.getElementById('auth-modal-close');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authLogin = document.getElementById('auth-login');
    const authSignup = document.getElementById('auth-signup');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginWithPhone = document.getElementById('login-with-phone');
    const signupWithPhone = document.getElementById('signup-with-phone');
    const googleLoginBtn = document.getElementById('google-login-btn');
    const googleSignupBtn = document.getElementById('google-signup-btn');

    const otpModal = document.getElementById('otp-modal');
    const otpModalClose = document.getElementById('otp-modal-close');
    const otpInputs = document.querySelectorAll('.otp-input');
    const otpVerifyBtn = document.getElementById('otp-verify-btn');
    const otpResend = document.getElementById('otp-resend');
    const otpCountdown = document.getElementById('otp-countdown');
    const otpTimerText = document.getElementById('otp-timer-text');
    const otpDestination = document.getElementById('otp-destination');
    const otpBackBtn = document.getElementById('otp-back-btn');

    const welcomeScreen = document.getElementById('welcome-screen');
    const welcomeClose = document.getElementById('welcome-close');
    const welcomeName = document.getElementById('welcome-name');
    const welcomeGreeting = document.getElementById('welcome-greeting');
    const welcomeSubtitle = document.getElementById('welcome-subtitle');
    const welcomeAvatar = document.getElementById('welcome-avatar');
    const welcomeOrderBtn = document.getElementById('welcome-order-btn');
    const welcomeBookBtn = document.getElementById('welcome-book-btn');

    // ---- State ----
    let otpCountdownInterval = null;
    let isLoggedIn = false;
    let currentUserName = 'Guest';

    // ---- Utils ----
    function openModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    function closeAllModals() {
        closeModal(authModal);
        closeModal(otpModal);
        closeModal(welcomeScreen);
    }

    // ---- Toggle Auth Modal ----
    authBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(authModal);
    });

    authModalClose.addEventListener('click', function() {
        closeModal(authModal);
    });

    authModal.addEventListener('click', function(e) {
        if (e.target === authModal) closeModal(authModal);
    });

    // ---- Tab Switching ----
    authTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            authTabs.forEach(function(t) { t.classList.remove('active'); });
            tab.classList.add('active');

            const target = tab.dataset.tab;
            if (target === 'login') {
                authLogin.classList.add('active');
                authSignup.classList.remove('active');
            } else {
                authSignup.classList.add('active');
                authLogin.classList.remove('active');
            }
        });
    });

    // ---- Simulate Google Login ----
    function handleGoogleAuth(mode) {
        // Simulate Google OAuth flow
        const names = ['Haider Jaffri', 'Ali Khan', 'Fatima Ahmed', 'Omar Farooq'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomEmail = randomName.toLowerCase().replace(/\s+/g, '.') + '@gmail.com';
        
        currentUserName = randomName;
        closeAllModals();
        showWelcome(currentUserName, randomEmail, 'Google');
    }

    googleLoginBtn.addEventListener('click', function() { handleGoogleAuth('login'); });
    googleSignupBtn.addEventListener('click', function() { handleGoogleAuth('signup'); });

    // ---- Email Login ----
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (!email || !password) {
            showAuthError(loginForm, 'Please fill in all fields.');
            return;
        }

        // Simple validation — in production, call your auth API
        if (password.length < 6) {
            showAuthError(loginForm, 'Password must be at least 6 characters.');
            return;
        }

        // Extract name from email
        currentUserName = email.split('@')[0].replace(/[._-]/g, ' ');
        currentUserName = currentUserName.charAt(0).toUpperCase() + currentUserName.slice(1);
        
        closeAllModals();
        showWelcome(currentUserName, email, 'email');
        loginForm.reset();
    });

    // ---- Sign Up ----
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();
        const confirm = document.getElementById('signup-confirm').value.trim();
        const terms = document.getElementById('signup-terms').checked;

        if (!name || !email || !password || !confirm) {
            showAuthError(signupForm, 'Please fill in all required fields.');
            return;
        }

        if (password !== confirm) {
            showAuthError(signupForm, 'Passwords do not match.');
            return;
        }

        if (password.length < 6) {
            showAuthError(signupForm, 'Password must be at least 6 characters.');
            return;
        }

        if (!terms) {
            showAuthError(signupForm, 'Please agree to the Terms & Privacy Policy.');
            return;
        }

        currentUserName = name;
        closeAllModals();
        showWelcome(currentUserName, email, 'email');
        signupForm.reset();
    });

    // ---- Show Auth Error ----
    function showAuthError(form, message) {
        // Remove existing error
        const existing = form.querySelector('.auth-error');
        if (existing) existing.remove();

        const errorEl = document.createElement('p');
        errorEl.className = 'auth-error';
        errorEl.textContent = message;
        errorEl.style.cssText = 'color: var(--color-error); font-size: 0.85rem; margin-bottom: 16px; text-align: center;';
        
        const submitBtn = form.querySelector('.auth-submit-btn');
        submitBtn.parentNode.insertBefore(errorEl, submitBtn);

        // Auto-remove after 3s
        setTimeout(function() {
            if (errorEl.parentNode) errorEl.remove();
        }, 3000);
    }

    // ---- Phone OTP Flow ----
    function initiatePhoneOtp(mode) {
        // Show OTP modal with phone destination
        otpDestination.textContent = '+92 3XX-XXXXXXX';
        closeModal(authModal);
        openModal(otpModal);
        startOtpCountdown();
        resetOtpInputs();
    }

    loginWithPhone.addEventListener('click', function() { initiatePhoneOtp('login'); });
    signupWithPhone.addEventListener('click', function() { initiatePhoneOtp('signup'); });

    // ---- OTP Input Auto-Focus & Auto-Advance ----
    otpInputs.forEach(function(input, index) {
        input.addEventListener('input', function() {
            // Only allow digits
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value.length === 1) {
                this.classList.add('filled');
                // Auto-advance to next input
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            } else {
                this.classList.remove('filled');
            }
            checkOtpComplete();
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value && index > 0) {
                otpInputs[index - 1].focus();
                otpInputs[index - 1].classList.remove('filled');
            }
        });

        input.addEventListener('focus', function() {
            this.select();
        });
    });

    // Paste event — fill all 6 digits at once
    document.querySelector('.otp-input-wrapper').addEventListener('paste', function(e) {
        e.preventDefault();
        const pasteData = (e.clipboardData || window.clipboardData).getData('text');
        const digits = pasteData.replace(/[^0-9]/g, '').slice(0, 6);
        
        otpInputs.forEach(function(input, i) {
            if (digits[i]) {
                input.value = digits[i];
                input.classList.add('filled');
            }
        });
        
        checkOtpComplete();
        // Focus the next empty input or the last one
        for (let i = 0; i < otpInputs.length; i++) {
            if (!otpInputs[i].value && i < otpInputs.length - 1) {
                otpInputs[i].focus();
                return;
            }
        }
        otpInputs[otpInputs.length - 1].focus();
    });

    function resetOtpInputs() {
        otpInputs.forEach(function(input) {
            input.value = '';
            input.classList.remove('filled');
        });
        otpInputs[0].focus();
        otpVerifyBtn.disabled = true;
    }

    function checkOtpComplete() {
        let allFilled = true;
        otpInputs.forEach(function(input) {
            if (!input.value) allFilled = false;
        });
        otpVerifyBtn.disabled = !allFilled;
    }

    // ---- OTP Countdown ----
    function startOtpCountdown() {
        if (otpCountdownInterval) clearInterval(otpCountdownInterval);
        
        let seconds = 30;
        otpCountdown.textContent = seconds;
        otpTimerText.style.display = 'inline';
        otpResend.style.display = 'none';
        otpResend.disabled = true;

        otpCountdownInterval = setInterval(function() {
            seconds--;
            otpCountdown.textContent = seconds;
            
            if (seconds <= 0) {
                clearInterval(otpCountdownInterval);
                otpCountdownInterval = null;
                otpTimerText.style.display = 'none';
                otpResend.style.display = 'inline-block';
                otpResend.disabled = false;
            }
        }, 1000);
    }

    otpResend.addEventListener('click', function() {
        resetOtpInputs();
        startOtpCountdown();
    });

    // ---- OTP Verify ----
    otpVerifyBtn.addEventListener('click', function() {
        // Simulate OTP verification
        const code = Array.from(otpInputs).map(function(inp) { return inp.value; }).join('');
        
        // Always succeed for demo purposes
        clearInterval(otpCountdownInterval);
        otpCountdownInterval = null;
        
        const names = ['Haider Jaffri', 'Ali Khan', 'Fatima Ahmed', 'Omar Farooq', 'Zara Malik'];
        currentUserName = names[Math.floor(Math.random() * names.length)];
        
        closeAllModals();
        showWelcome(currentUserName, '+92 3XX-XXXXXXX', 'phone');
    });

    // ---- OTP Back Button ----
    otpBackBtn.addEventListener('click', function() {
        closeModal(otpModal);
        openModal(authModal);
        resetOtpInputs();
        if (otpCountdownInterval) {
            clearInterval(otpCountdownInterval);
            otpCountdownInterval = null;
        }
    });

    otpModalClose.addEventListener('click', function() { closeModal(otpModal); });
    otpModal.addEventListener('click', function(e) {
        if (e.target === otpModal) closeModal(otpModal);
    });

    // ---- Show Welcome Screen ----
    function showWelcome(name, identifier, method) {
        isLoggedIn = true;
        
        // Update welcome content with user's name
        welcomeName.textContent = name;
        
        // Pick a random greeting variation
        const greetings = [
            'Welcome to Jaffeiz, ',
            'Great to see you, ',
            'Ready to feast, '
        ];
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        welcomeGreeting.innerHTML = randomGreeting + '<span>' + name + '</span>! 👋';
        
        // Set subtitle based on method
        if (method === 'Google') {
            welcomeSubtitle.textContent = 'Signed in with Google. A world of flavor awaits!';
        } else if (method === 'phone') {
            welcomeSubtitle.textContent = 'Phone verified successfully. Let\'s eat! 🍽️';
        } else {
            welcomeSubtitle.textContent = 'Account verified. Ready to explore the flavors of Jaffeiz?';
        }

        // Set avatar based on name initial
        const initial = name.charAt(0).toUpperCase();
        welcomeAvatar.textContent = '👤';
        
        // Update auth button
        authBtn.textContent = 'My Account';
        authBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        
        openModal(welcomeScreen);
    }

    // ---- Welcome Screen Close & Navigation ----
    welcomeClose.addEventListener('click', function() {
        closeModal(welcomeScreen);
    });

    welcomeScreen.addEventListener('click', function(e) {
        if (e.target === welcomeScreen) closeModal(welcomeScreen);
    });

    welcomeOrderBtn.addEventListener('click', function() {
        closeModal(welcomeScreen);
        // Smooth scroll to menu
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    });

    welcomeBookBtn.addEventListener('click', function() {
        closeModal(welcomeScreen);
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    });

    // ---- Keyboard Shortcut: Enter on OTP ----
    otpInputs.forEach(function(input) {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !otpVerifyBtn.disabled) {
                otpVerifyBtn.click();
            }
        });
    });

    // ---- Keyboard: Escape to close modals ----
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (welcomeScreen.style.display === 'flex') closeModal(welcomeScreen);
            else if (otpModal.style.display === 'flex') closeModal(otpModal);
            else if (authModal.style.display === 'flex') closeModal(authModal);
        }
    });

    console.log('%c🔐 Jaffeiz Auth System Loaded', 'font-size: 14px; color: #c19a2b;');
    console.log('%c📱 Multi-Method: Email | Phone OTP | Google', 'font-size: 12px; color: #aaa;');

})();