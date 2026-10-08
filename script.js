// Inisialisasi AOS Animation
AOS.init({ 
    duration: 900, 
    easing: 'ease-in-out', 
    once: true, 
    offset: 120 
});

// Mobile Navigation Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        const isOpening = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        menuBtn.setAttribute('aria-expanded', String(isOpening));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

// Hero Image Slider
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slide-dot');
let currentSlide = 0;
const totalSlides = slides.length;
let sliderTimer;

function showSlide(index) {
    if (!totalSlides) return;
    currentSlide = (index + totalSlides) % totalSlides;
    slides.forEach((slide, i) => {
        slide.classList.toggle('opacity-100', i === currentSlide);
        slide.classList.toggle('opacity-0', i !== currentSlide);
        slide.setAttribute('aria-hidden', String(i !== currentSlide));
    });
    dots.forEach((dot, i) => {
        const active = i === currentSlide;
        dot.classList.toggle('bg-warmBronze', active);
        dot.classList.toggle('bg-white/40', !active);
        dot.setAttribute('aria-label', `Tampilkan slide ${i + 1}`);
        dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
}

function startSlider() {
    if (totalSlides < 2) return;
    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        showSlide(i);
        startSlider();
    });
});

// Jalankan Slider awal
if (totalSlides > 0) {
    showSlide(0);
    startSlider();
}