const NAVBAR_HTML = `
<nav class="navbar glass-panel">
    <div class="logo neon-text">AYUSH</div>
    
    <!-- Desktop Menu -->
    <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="channels.html">Channels</a></li>
        <li><a href="bots.html">Bots</a></li>
        <li><a href="blogs.html">Blogs</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>

    <div style="display: flex; align-items: center; gap: 15px;">
        <button id="theme-toggle" class="glass-button icon-btn"><i class="fas fa-moon"></i></button>
        <button id="mobile-menu-btn" class="glass-button icon-btn mobile-only"><i class="fas fa-bars"></i></button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="mobile-menu glass-panel">
        <button id="close-menu-btn" class="glass-button icon-btn" style="position: absolute; top: 20px; right: 20px;"><i class="fas fa-times"></i></button>
        <ul class="mobile-nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="channels.html">Channels</a></li>
            <li><a href="bots.html">Bots</a></li>
            <li><a href="blogs.html">Blogs</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
    </div>
</nav>

<style>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 30px;
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 1200px;
        z-index: 1000;
        border-radius: 50px;
    }

    .logo {
        font-family: var(--font-display);
        font-size: 1.5rem;
        font-weight: bold;
        letter-spacing: 2px;
    }

    .nav-links {
        display: flex;
        gap: 30px;
    }

    .nav-links a {
        font-weight: 500;
        position: relative;
    }

    .nav-links a::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -5px;
        left: 0;
        background-color: var(--secondary-color);
        transition: width 0.3s;
    }

    .nav-links a:hover::after {
        width: 100%;
    }

    .icon-btn {
        padding: 10px;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .mobile-only {
        display: none;
    }

    .mobile-menu {
        position: fixed;
        top: 0;
        right: -100%;
        width: 80%;
        max-width: 300px;
        height: 100vh;
        background: rgba(10, 10, 18, 0.95);
        backdrop-filter: blur(20px);
        z-index: 1001;
        transition: right 0.3s ease;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 0;
        border-left: 1px solid rgba(255, 255, 255, 0.1);
    }

    .mobile-menu.active {
        right: 0;
    }

    .mobile-nav-links {
        list-style: none;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .mobile-nav-links a {
        font-size: 1.5rem;
        font-weight: 600;
        color: white;
    }
    
    @media (max-width: 768px) {
        .navbar {
            padding: 10px 20px;
            top: 10px;
            width: 95%;
        }
        .nav-links {
            display: none;
        }
        .mobile-only {
            display: flex;
        }
        .logo {
            font-size: 1.2rem;
        }
    }
</style>
`;

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('navbar-container');
    if (container) {
        container.innerHTML = NAVBAR_HTML;

        // Highlight active link (Desktop)
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const links = container.querySelectorAll('.nav-links a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.style.color = 'var(--secondary-color)';
                link.style.fontWeight = 'bold';
            }
        });

        setupThemeToggle();
        setupMobileMenu();
    }
});

function setupMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (menuBtn && menu && closeBtn) {
        menuBtn.addEventListener('click', () => {
            menu.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            menu.classList.remove('active');
        });

        // Close menu when clicking a link
        const mobileLinks = menu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
            });
        });
    }
}
