// plugins/splitTextPlugin.js
export default {
    install(app) {
        app.directive('split-text', {
            mounted(el) {
                const observer = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        const text = el.innerText;
                        el.innerText = '';
                        for (let i = 0; i < text.length; i++) {
                            const span = document.createElement('span');
                            span.textContent = text[i];
                            span.style.transitionDelay = `${i * 50}ms`;
                            el.appendChild(span);
                        }
                        el.style.opacity = 1;
                        observer.unobserve(el); // Stop observing once animation is triggered
                    }
                });

                observer.observe(el);
            },
        });
    },
};
