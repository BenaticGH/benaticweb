document.querySelectorAll('.link').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transform = 'scale(1.1)';
    });
    item.addEventListener('mouseout', () => {
        item.style.transform = 'scale(1)';
    });
});

const introScreen = document.querySelector('.intro-screen');
const mainContent = document.querySelector('.main-content');
const audio = document.getElementById('background-music');
const typingText = "click anywhere to enter";
let i = 0;

function typeWriter() {
    if (i < typingText.length) {
        document.getElementById("typing-text").innerHTML += typingText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

window.onload = typeWriter;

introScreen.addEventListener('click', () => {
    audio.volume = 0.1;
    audio.play();
    introScreen.style.opacity = '0';
    setTimeout(() => {
        introScreen.style.display = 'none';
        mainContent.style.display = 'block';
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 50);
    }, 1000);
});

// Passive cursor trail
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

document.addEventListener('mousemove', (e) => {
    createDot(e.pageX, e.pageY);
});

// Drawing lines
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let isDrawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

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

// Mute button functionality
const muteButton = document.getElementById('mute-button');
const muteIcon = document.getElementById('mute-icon');
muteButton.addEventListener('click', () => {
    if (audio.muted) {
        fadeAudio(audio, 0, 0.1, 1000);  // Fade in
        muteIcon.src = 'unmuted.svg';
        audio.muted = false;
    } else {
        fadeAudio(audio, 0.1, 0, 1000);  // Fade out
        muteIcon.src = 'muted.svg';
    }
});

function fadeAudio(audio, from, to, duration) {
    const interval = 50;
    const step = (to - from) / (duration / interval);
    let volume = from;
    const fading = setInterval(() => {
        volume += step;
        if ((step > 0 && volume >= to) || (step < 0 && volume <= to)) {
            clearInterval(fading);
            if (to === 0) {
                audio.muted = true;
            }
        } else {
            audio.volume = volume;
        }
    }, interval);
}

// Erase button functionality
const eraseButton = document.getElementById('erase-button');
eraseButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});