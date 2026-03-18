// GLEM HOUSE Website Scripts


function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');

    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-active'); // For CSS animations

        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("GLEM HOUSE Script Initialized");

    //menu toggle 
    const menuBtn = document.querySelector('.menu-toggle');
    const closeBtn = document.querySelector('.sidebar-close');
    const overlay = document.querySelector('.overlay');

    if (menuBtn) menuBtn.addEventListener('click', toggleMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', toggleMobileMenu);
    if (overlay) overlay.addEventListener('click', toggleMobileMenu);


    document.querySelectorAll('.sidebar-links a').forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });

    // --- Hero Slider Logic ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (!slides.length) return;
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { showSlide(currentSlide + 1); startAutoSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { showSlide(currentSlide - 1); startAutoSlide(); });

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => { showSlide(idx); startAutoSlide(); });
    });

    function startAutoSlide() {
        stopAutoSlide();
        slideInterval = setInterval(() => showSlide(currentSlide + 1), 7000);
    }

    function stopAutoSlide() {
        if (slideInterval) clearInterval(slideInterval);
    }

    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', stopAutoSlide);
        hero.addEventListener('mouseleave', startAutoSlide);
    }

    startAutoSlide();

    // --- Back to Top ---
    const btt = document.querySelector('.back-to-top');
    if (btt) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) btt.classList.add('visible');
            else btt.classList.remove('visible');
        });
        btt.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Product Tabs ---
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const pane = document.getElementById(target);
            if (pane) pane.classList.add('active');
        });
    });

    // --- Flash Deals ---
    const fPrev = document.querySelector('.prev-flash');
    const fNext = document.querySelector('.next-flash');
    const fGrid = document.querySelector('.flash-deals-grid');
    if (fGrid) {
        if (fPrev) fPrev.addEventListener('click', () => fGrid.scrollBy({ left: -300, behavior: 'smooth' }));
        if (fNext) fNext.addEventListener('click', () => fGrid.scrollBy({ left: 300, behavior: 'smooth' }));
    }

    // --- Countdown ---
    function initCountdown() {
        const endTime = new Date().getTime() + 33302000; // ~9 hours
        function update() {
            const now = new Date().getTime();
            const diff = endTime - now;
            if (diff < 0) return;

            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            const pad = num => String(num).padStart(2, '0');
            document.querySelectorAll('.countdown-value').forEach((el, idx) => {
                if (idx === 1) el.textContent = pad(h);
                if (idx === 2) el.textContent = pad(m);
                if (idx === 3) el.textContent = pad(s);
            });
            const dh = document.getElementById('deal-hours');
            const dm = document.getElementById('deal-minutes');
            const ds = document.getElementById('deal-seconds');
            if (dh) dh.textContent = pad(h);
            if (dm) dm.textContent = pad(m);
            if (ds) ds.textContent = pad(s);
        }
        update();
        setInterval(update, 1000);
    }
    initCountdown();

    // --- Latest News Bubble Effect ---
    const newsImage = document.querySelector('.news-image');
    const bubbleContainer = document.querySelector('.bubble-container');

    if (newsImage && bubbleContainer) {
        newsImage.addEventListener('mousemove', (e) => {
            const rect = newsImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create multiple bubbles for a richer effect
            for (let i = 0; i < 2; i++) {
                createBubble(x, y);
            }
        });

        // Auto spawn rainbow bubbles from bottom
        setInterval(() => {
            if (document.visibilityState === 'visible') {
                const rect = newsImage.getBoundingClientRect();
                const x = Math.random() * rect.width;
                const y = rect.height - 10;
                createBubble(x, y);
            }
        }, 400);

        function createBubble(bx, by) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';

            // Rainbow colors
            const hues = [0, 30, 60, 120, 180, 240, 280, 320];
            const randomHue = hues[Math.floor(Math.random() * hues.length)];
            bubble.style.setProperty('--bubble-color', `hsla(${randomHue}, 80%, 70%, 0.6)`);

            const size = (Math.random() * 15 + 8) + 'px'; // Slightly smaller bubbles
            bubble.style.width = size;
            bubble.style.height = size;

            const offsetX = (Math.random() - 0.5) * 40;
            const offsetY = (Math.random() - 0.5) * 40;
            bubble.style.left = (bx + offsetX) + 'px';
            bubble.style.top = (by + offsetY) + 'px';

            const duration = Math.random() * 1.5 + 1;
            const distance = - (Math.random() * 100 + 50) + 'px';
            const scale = Math.random() * 1.5 + 1;

            bubble.style.setProperty('--duration', duration + 's');
            bubble.style.setProperty('--distance', distance);
            bubble.style.setProperty('--scale', scale);

            bubbleContainer.appendChild(bubble);

            setTimeout(() => {
                bubble.remove();
            }, duration * 1000);
        }
    }

    // --- Deal Of The Day Tilt & Reveal ---
    const dealDaySection = document.querySelector('.deal-day');
    const dealImage = document.querySelector('.deal-day-image img');
    const dealContentElements = document.querySelectorAll('.deal-day-content > *');

    if (dealDaySection && dealImage) {
        // Subtle tilt effect
        dealDaySection.addEventListener('mousemove', (e) => {
            const rect = dealDaySection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            dealImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        dealDaySection.addEventListener('mouseleave', () => {
            dealImage.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });

        // Entrance animation
        const observerOptions = {
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    dealDaySection.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(dealDaySection);
    }

    if (window.lucide) {
        lucide.createIcons();
    }
});