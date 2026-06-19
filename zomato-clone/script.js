// script.js - एडवांस वर्शन
document.addEventListener('DOMContentLoaded', function() {
    // ===== 1. टाइपिंग एनीमेशन =====
    const typingText = document.getElementById('typingText');
    const phrases = [
        'Order food <span>delivered</span> in minutes',
        'Taste the <span>best</span> of your city',
        'Food <span>delivery</span> made easy'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typingText.innerHTML = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.innerHTML = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 30 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }
    typeEffect();

    // ===== 2. पार्टिकल्स एनीमेशन =====
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (10 + Math.random() * 20) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.width = (3 + Math.random() * 6) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }

    // ===== 3. डार्क/लाइट मोड =====
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', function() {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // ===== 4. काउंटडाउन टाइमर =====
    let targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 2);
    targetTime.setMinutes(targetTime.getMinutes() + 30);

    function updateTimer() {
        const now = new Date();
        const diff = targetTime - now;

        if (diff <= 0) {
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    updateTimer();
    setInterval(updateTimer, 1000);

    // ===== 5. प्रोग्रेस बार =====
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    // ===== 6. बैक टू टॉप =====
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== 7. स्मूथ स्क्रॉलिंग =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== 8. सर्च फंक्शन =====
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    function handleSearch() {
        const query = searchInput.value.trim();
        if (query === '') {
            showLoader('⚠️ Please enter a delivery address or restaurant name.');
        } else {
            showLoader(`🔍 Searching for "${query}" ...`);
            setTimeout(() => {
                hideLoader();
                alert(`✅ Results for "${query}" will appear here!`);
            }, 2000);
        }
    }

    function showLoader(message) {
        const loader = document.getElementById('loader');
        loader.classList.add('active');
        loader.querySelector('p').textContent = message;
    }
