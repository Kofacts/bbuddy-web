import gsap from 'gsap';

// Reusable function for text reveal animation
const animateTextReveal = (targetSelector, options = {}) => {
    const defaults = {
        duration: 0.5,
        delay: 0,
        stagger: 0.1,
        y: '20px',
        opacity: 0, // Initial opacity set to 0 to hide the text
        onComplete: () => {},
    };

    const settings = { ...defaults, ...options };
    const targetElements = document.querySelectorAll(targetSelector);

    gsap.timeline({
        onComplete: settings.onComplete,
    }).fromTo(
        targetElements,
        {
            opacity: settings.opacity, // Start with opacity set to 0 (hidden)
            y: settings.y,
        },
        {
            opacity: 1, // Animate opacity to 1 (revealing the text)
            y: '0px',
            duration: settings.duration,
            delay: settings.delay,
            stagger: settings.stagger,
        },
    );
};

export default animateTextReveal;
