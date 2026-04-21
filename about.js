// 1. Typing Animation Function
const textElement = document.querySelector('.typing-text');
const words = ["Ujwal Subedi", "A Designer", "A Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// 2. Smooth Pro Cursor
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    if(dot && outline) {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        outline.style.left = e.clientX + 'px';
        outline.style.top = e.clientY + 'px';
    }
});

// 3. Reveal on Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.animate([
                { opacity: 0, transform: 'translateY(30px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], { duration: 800, fill: 'forwards', easing: 'ease-out' });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.bento-item, .mag-link').forEach(el => observer.observe(el));

// 4. Parallax Background effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelector('.shape-blob').style.transform = `translateY(${scrolled * 0.3}px)`;
});

// Initialize
window.onload = () => {
    type();
};