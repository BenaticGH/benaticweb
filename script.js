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
        setTimeout(typeWriter, 50);  // Speed up typing animation
    }
}

window.onload = typeWriter;

introScreen.addEventListener('click', () => {
    audio.volume = 0.1;  // Set volume to 10%
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

// Cursor trail
document.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.left = `${e.pageX}px`;
    dot.style.top = `${e.pageY}px`;
    document.body.appendChild(dot);
    setTimeout(() => {
        dot.remove();
    }, 1000);  // Remove the dot after 1 second
});

// Sparkle burst on click
document.addEventListener('click', (e) => {
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${e.pageX + (Math.random() * 20 - 10)}px`;
        sparkle.style.top = `${e.pageY + (Math.random() * 20 - 10)}px`;
        document.body.appendChild(sparkle);
        setTimeout(() => {
            sparkle.remove();
        }, 500);  // Remove the sparkle after the animation ends
    }
});

// Prevent text selection and highlighting interference
document.addEventListener('mousedown', (e) => {
    e.preventDefault();
});

// Mute button functionality
const muteButton = document.getElementById('mute-button');
const muteIcon = document.getElementById('mute-icon');

muteButton.addEventListener('click', () => {
    if (audio.muted) {
        fadeAudio(audio, 0, 0.1, 1000);  // Fade in
        muteIcon.src = 'unmuted.svg';
    } else {
        fadeAudio(audio, 0.1, 0, 1000);  // Fade out
        muteIcon.src = 'muted.svg';
    }
    audio.muted = !audio.muted;
});

function fadeAudio(audio, from, to, duration) {
    const interval = 50;
    const step = (to - from) / (duration / interval);
    let volume = from;

    const fading = setInterval(() => {
        volume += step;
        if ((step > 0 && volume >= to) || (step < 0 && volume <= to)) {
            clearInterval(fading);
        } else {
            audio.volume = volume;
        }
    }, interval);
}