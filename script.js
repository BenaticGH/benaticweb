const introScreen = document.querySelector('.intro-screen');
const mainContent = document.querySelector('.main-content');
const audio = document.getElementById('background-music');
const typingText = isMobile() ? "tap anywhere to enter" : "click anywhere to enter";
const benaticText = "benatic";
const linkTexts = ["Spotify", "Apple Music", "SoundCloud", "YouTube", "Instagram"];
let introAnimationStarted = false;
let isAnimating = false;

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function typeWriter(text, element, index, callback, speed = 100) {
    if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(() => typeWriter(text, element, index, callback, speed), speed);
    } else if (callback) {
        isAnimating = false;
        callback();
    }
}

function animateLinks(index) {
    if (index < linkTexts.length) {
        const link = document.querySelector(`.link:nth-child(${index + 1})`);
        let delay = index === 0 ? 0 : linkTexts[index - 1].length * 2;
        setTimeout(() => {
            link.textContent = '';
            typeWriter(linkTexts[index], link, 0, () => {
                if (index < linkTexts.length - 1) {
                    animateLinks(index + 1);
                }
            }, 25);
        }, delay);
    }
}

// Create dots for cursor trail
function createDot(x, y) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    document.body.appendChild(dot);
    setTimeout(() => {
        dot.remove();
    }, 1000);
}

// Add mousemove event listener for cursor trail
document.addEventListener('mousemove', (e) => {
    createDot(e.pageX, e.pageY);
});

window.onload = () => {
    typeWriter(typingText, document.getElementById("typing-text"), 0);
    if (isMobile()) {
        setupMobileLayout();
    }
};

function setupMobileLayout() {
    const sideContent = document.querySelector('.side-content');
    const mainSection = document.querySelector('.main-section');
    const announcement = document.querySelector('.announcement-text');
    
    sideContent.style.display = 'none';
    announcement.classList.remove('hidden');
    announcement.style.marginTop = '20px';
    mainSection.after(announcement);
}

introScreen.addEventListener('click', () => {
    if (!introAnimationStarted) {
        introAnimationStarted = true;
        audio.volume = 0.1;
        audio.play();
        introScreen.style.opacity = '0';
        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.style.display = 'block';
            setTimeout(() => {
                mainContent.style.opacity = '1';
                document.querySelectorAll('.link').forEach(link => link.textContent = '');
                typeWriter(benaticText, document.getElementById("benatic-text"), 0, () => {
                    setTimeout(() => animateLinks(0), 100);
                }, 50);
            }, 50);
        }, 1000);
    }
});

const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let isDrawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

canvas.addEventListener('touchstart', handleTouch);
canvas.addEventListener('touchmove', handleTouch);
canvas.addEventListener('touchend', stopDrawing);

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 'mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'lightgrey';

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const muteButton = document.getElementById('mute-button');
const muteIcon = document.getElementById('mute-icon');
const milkTeaLinks = [
    "https://open.spotify.com/track/3YVZERsqslbwCaz0UxGG77?si=1284d8052321402f",
    "https://music.apple.com/us/album/milk-tea/1787071523?i=1787071524",
    "https://soundcloud.com/benatic-music",
    "https://www.youtube.com/@benatic",
    "https://www.instagram.com/p/DEAoR-HyeKL/"
];

const originalLinks = [
    "https://open.spotify.com/artist/5u3yx37LtLAM7fiyrZVhn7?si=RUit4ctWSx6qvZPCfCothA",
    "https://music.apple.com/us/artist/benatic/1786818621",
    "https://soundcloud.com/benatic-music",
    "https://www.youtube.com/@benatic",
    "https://instagram.com/benaticmusic/"
];

let isInMilkTeaMode = false;

function switchProfiles() {
    if (isMobile() || isAnimating) return;
    
    isAnimating = true;
    const mainProfile = document.getElementById('main-profile');
    const milkTeaCover = document.getElementById('milk-tea-cover');
    const benaticText = document.getElementById('benatic-text');
    const links = document.querySelectorAll('.link');
    const announcement = document.querySelector('.announcement-text');
    
    mainProfile.style.opacity = '0';
    milkTeaCover.style.opacity = '0';
    
    announcement.style.opacity = isInMilkTeaMode ? '1' : '0';
    
    setTimeout(() => {
        const tempSrc = mainProfile.src;
        mainProfile.src = milkTeaCover.src;
        milkTeaCover.src = tempSrc;

        mainProfile.classList.remove('spinning');
        milkTeaCover.classList.remove('spinning');
        if (milkTeaCover.src.includes('milk-tea-cover.png')) {
            milkTeaCover.classList.add('spinning');
        }
        if (mainProfile.src.includes('milk-tea-cover.png')) {
            mainProfile.classList.add('spinning');
        }
        
        mainProfile.style.opacity = '1';
        milkTeaCover.style.opacity = '1';
        
        isInMilkTeaMode = !isInMilkTeaMode;
        
        benaticText.innerHTML = '';
        links.forEach(link => link.textContent = '');
        
        typeWriter(isInMilkTeaMode ? "milk tea" : "benatic", benaticText, 0, () => {
            setTimeout(() => {
                const currentLinks = isInMilkTeaMode ? milkTeaLinks : originalLinks;
                links.forEach((link, index) => {
                    link.href = currentLinks[index];
                });
                animateLinks(0);
            }, 100);
        }, 50);
    }, 500);
}

muteButton.addEventListener('click', () => {
    if (audio.muted) {
        audio.volume = 0.1;
        muteIcon.src = 'unmuted.svg';
        audio.muted = false;
    } else {
        audio.volume = 0;
        muteIcon.src = 'muted.svg';
        audio.muted = true;
    }
});

const eraseButton = document.getElementById('erase-button');
eraseButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

if (isMobile()) {
    eraseButton.style.display = 'block';
    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
            audio.pause();
        } else {
            if (!audio.muted) {
                audio.play();
            }
        }
    });
}

if (!isMobile()) {
    document.getElementById('main-profile').addEventListener('click', switchProfiles);
    document.getElementById('milk-tea-cover').addEventListener('click', switchProfiles);
}