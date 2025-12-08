document.addEventListener('DOMContentLoaded', () => {
    setupScrollReveal();
    setupParallax();
});

function setupScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    // Use IntersectionObserver for better performance than scroll event
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed if you don't want it to hide again
                // observer.unobserve(entry.target); 
            } else {
                // Optional: Remove active class to re-animate when scrolling back up
                // entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach((reveal) => {
        observer.observe(reveal);
    });
}

function setupParallax() {
    const heroContent = document.querySelector('.hero-content');

    if (!heroContent) return;

    // Use requestAnimationFrame for smooth parallax
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollValue = window.scrollY;
                // Limit the calculation to only when the hero is likely visible
                if (scrollValue < 1000) {
                    heroContent.style.transform = `translateY(${scrollValue * 0.4}px)`;
                    heroContent.style.opacity = 1 - (scrollValue / 600);
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true }); // passive: true improves scrolling performance
}
