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
