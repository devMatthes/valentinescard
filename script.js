/* ==========================================
   VALENTINE'S CARD - JAVASCRIPT
   ========================================== */

// Configuration
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpqjwlqo'; // User needs to replace this
const EMAIL_ENDPOINT = 'jaciubekmateusz@gmail.com';

// Cringe love messages
const cringeMessages = [
    "Jesteś jak słońce w moim życiu... tylko że świecisz nawet w nocy! 🌙✨",
    "Moje serce biło szybciej tylko raz... gdy zobaczyłem Cię po raz pierwszy! 💓",
    "Czy wiesz, że jesteś właścicielem najcenniejszej rzeczy? Mojego serca! 💝",
    "Gdybym miał za każdą myśl o Tobie złotówkę... byłbym milionerem! 💰💕",
    "Moja miłość do Ciebie jest jak WiFi - niewidzialna, ale połączenie jest bardzo mocne! 📶❤️",
    "Jesteś jak Nutella - słodka, uzależniająca i zawsze poprawiasz mi humor! 🍫💖",
    "Jeśli byłabyś pomidorem, byłabyś najsoczystszym pomidorem w całym ogrodzie! 🍅❤️"
];

/* ==========================================
   YOUTUBE PLAYER - MUSIC CONTROL
   ========================================== */

let player;


// YouTube IFrame API callback - called automatically when API loads
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'E-PScMHSc3A',
        playerVars: {
            'autoplay': 1,
            'start': 47,
            'loop': 1,
            'playlist': 'E-PScMHSc3A', // Required for loop to work
            'controls': 0,
            'disablekb': 1,
            'fs': 0,
            'modestbranding': 1,
            'rel': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

const musicPlaying = true; // Always true now

function onPlayerReady(event) {
    console.log('YouTube player ready!');
    // Start playing immediately and set volume
    event.target.setVolume(100);
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    // If video ended, restart from beginning (at 47s)
    if (event.data === YT.PlayerState.ENDED) {
        player.seekTo(47);
        player.playVideo();
    }
}

let currentSlide = 0;
let slideInterval;
let cringeIndex = 0;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    // initPhotoSlider();  <-- Moved to startValentine()
    initNoButton();
});

function startValentine() {
    const overlay = document.getElementById('start-overlay');
    overlay.classList.add('hidden');

    // Play music
    if (player && player.playVideo) {
        player.playVideo();
        player.setVolume(100);
    }

    // Start photo slider
    initPhotoSlider();
}

// ==========================================
// FLOATING HEARTS BACKGROUND
// ==========================================
function createFloatingHearts() {
    const container = document.getElementById('hearts-bg');
    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '🩷', '💘'];

    setInterval(() => {
        if (document.querySelectorAll('.floating-heart').length < 15) {
            const heart = document.createElement('span');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (5 + Math.random() * 5) + 's';
            heart.style.fontSize = (15 + Math.random() * 25) + 'px';
            container.appendChild(heart);

            setTimeout(() => heart.remove(), 10000);
        }
    }, 800);
}

// ==========================================
// PHOTO SLIDER
// ==========================================
let shownPhotos = new Set([0]); // Track which photos have been shown
let allPhotosShown = false;

function initPhotoSlider() {
    const photos = document.querySelectorAll('.gallery-photo');
    const dotsContainer = document.getElementById('sliderDots');

    // Create dots
    photos.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'slider-dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });

    // Auto-slide
    slideInterval = setInterval(() => {
        goToSlide((currentSlide + 1) % photos.length);
    }, 3000);
}

function goToSlide(index) {
    const photos = document.querySelectorAll('.gallery-photo');
    const dots = document.querySelectorAll('.slider-dot');

    photos[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = index;

    photos[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    // Track shown photos
    shownPhotos.add(currentSlide);

    // Check if all photos have been shown
    if (!allPhotosShown && shownPhotos.size === photos.length) {
        allPhotosShown = true;
        showNextButton();
    }
}

function showNextButton() {
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.classList.remove('hidden');
        nextBtn.classList.add('fade-in');
    }
}

// ==========================================
// SCREEN NAVIGATION
// ==========================================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(screenId);
    targetScreen.classList.add('active');

    // Special effects per screen
    if (screenId === 'screen-celebration') {
        createConfetti();
        startCringeMessages();
    }
}

// ==========================================
// THE "NO" BUTTON CHASE
// ==========================================
function initNoButton() {
    const noBtn = document.getElementById('noBtn');
    let escapeCount = 0;

    const escapePhrases = [
        "Nie...",
        "Haha, nie uciekniesz!",
        "Próbujesz dalej? 😏",
        "Nie ma opcji!",
        "Powiedz TAK! 💕",
        "Jestem szybszy!",
        "TAK jest jedyną opcją!",
        "Kocham Cię! ❤️"
    ];

    noBtn.addEventListener('mouseenter', (e) => {
        runAwayButton(noBtn, escapePhrases, escapeCount);
        escapeCount++;
    });

    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        runAwayButton(noBtn, escapePhrases, escapeCount);
        escapeCount++;
    });

    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        runAwayButton(noBtn, escapePhrases, escapeCount);
        escapeCount++;
    });
}

function runAwayButton(btn, phrases, count) {
    const container = btn.closest('.screen');
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    // Calculate new random position
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    btn.style.position = 'fixed';
    btn.style.left = (containerRect.left + newX) + 'px';
    btn.style.top = (containerRect.top + 100 + (newY * 0.5)) + 'px';
    btn.style.transition = 'all 0.2s ease-out';

    // Change text
    btn.innerHTML = `<span>${phrases[count % phrases.length]}</span>`;

    // After many tries, make button even smaller
    if (count > 5) {
        btn.style.transform = `scale(${Math.max(0.3, 1 - count * 0.1)})`;
    }

    // Eventually hide completely
    if (count > 10) {
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
    }
}

// ==========================================
// YES BUTTON - SUBMIT
// ==========================================
function sayYes() {
    showScreen('screen-celebration');
}

// ==========================================
// CONFETTI
// ==========================================
function createConfetti() {
    const container = document.getElementById('confetti');
    container.innerHTML = '';

    const colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FF4757', '#FFD700', '#9B59B6', '#FF6B6B'];
    const shapes = ['❤️', '💕', '💖', '🎉', '✨', '🌹', '💝'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.fontSize = (15 + Math.random() * 20) + 'px';
        container.appendChild(confetti);
    }

    // Clear confetti after animation
    setTimeout(() => {
        container.innerHTML = '';
    }, 7000);
}

// ==========================================
// CRINGE MESSAGES
// ==========================================
function startCringeMessages() {
    const cringeBox = document.querySelector('.cringe-text');

    function showNextMessage() {
        cringeBox.style.opacity = '0';

        setTimeout(() => {
            cringeBox.textContent = cringeMessages[cringeIndex % cringeMessages.length];
            cringeBox.style.opacity = '1';
            cringeIndex++;
        }, 300);
    }

    showNextMessage();
    setInterval(showNextMessage, 4000);
}

// ==========================================
// FLOWERS CONFIRMATION
// ==========================================
// ==========================================
// FLOWERS CONFIRMATION
// ==========================================
async function handleFlowerSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('button');
    btn.classList.add('loading');
    btn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            console.log('Email sent successfully!');
        } else {
            console.log('Email sending failed, but continuing anyway...');
        }
    } catch (error) {
        console.log('Network error, continuing anyway...');
    }

    // Always show final screen
    btn.classList.remove('loading');
    showScreen('screen-final');
}

// ==========================================
// MUSIC CONTROL (YouTube)
// ==========================================
// ==========================================
// MUSIC CONTROL (YouTube)
// ==========================================
// Button logic removed - Autoplay only

// Try to autoplay when user first interacts with the page (backup for browser blockers)
document.body.addEventListener('click', () => {
    if (player && player.getPlayerState) {
        try {
            player.playVideo();
        } catch (e) {
            console.log('Could not autoplay music');
        }
    }
}, { once: true });

// ==========================================
// HEARTS RAIN (for question screen)
// ==========================================
function createHeartsRain() {
    const container = document.getElementById('heartsRain');
    if (!container) return;

    const hearts = ['💕', '💖', '💗', '💓'];

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.className = 'rain-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(heart);
    }
}

// Initialize hearts rain when question screen is shown
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.id === 'screen-question' && mutation.target.classList.contains('active')) {
            createHeartsRain();
        }
    });
});

document.querySelectorAll('.screen').forEach(screen => {
    observer.observe(screen, { attributes: true, attributeFilter: ['class'] });
});
