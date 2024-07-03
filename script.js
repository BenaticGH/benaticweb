document.querySelectorAll('.link').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transform = 'scale(1.1)';
    });
    item.addEventListener('mouseout', () => {
        item.style.transform = 'scale(1)';
    });
});

// Handle audio play for browsers that block autoplay
window.addEventListener('click', () => {
    const audio = document.getElementById('background-music');
    if (audio.paused) {
        audio.volume = 0.1;  // Set volume to 10%
        audio.play();
    }
}, { once: true });
