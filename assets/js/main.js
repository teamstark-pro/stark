// Embedded Data to avoid CORS issues when running locally
const AYUSH_DATA = {
    "name": "Ayush",
    "age": 18,
    "level": "Student | Tech Lover | JEE + Boards Warrior",
    "hobbies": [
        "Coding",
        "Space stuff",
        "Creating bots",
        "Experimenting with AI",
        "Music"
    ],
    "vibe": "Fast learner, quick thinker, creative mind",
    "goal": "Become a top-tier software developer & engineer",
    "funFacts": [
        "forget silly things",
        "Loves exploring random topics",
        "Has a savage competitive 'me vs me' mindset",
        "Learns fast with minimal effort",
        "Made multiple Telegram bots"
    ],
    "socials": {
        "spotify": "https://open.spotify.com/user/314rym7xe3pg6bct2d3g5eibxbhm",
        "telegram": "https://t.me/random_thoughtx"
    }
};

const BOTS_DATA = [
    {
        "name": "SpotifyX Musix Bot",
        "username": "@spotifyxmusixbot",
        "features": [
            "Download music from YouTube",
            "Download videos in different qualities",
            "AI Image Generation",
            "Fully ad-free",
            "Unlimited usage"
        ],
        "icon": "🎵"
    },
    {
        "name": "NANO BANANA Bot",
        "username": "@nano_banana_veobot",
        "features": [
            "AI image generation and edit",
            "No filters, no limits"
        ],
        "icon": "🍌"
    },
    {
        "name": "AyushX Chat Robot",
        "username": "@ayushxchat_robot",
        "features": [
            "Contact Ayush",
            "Quick communication",
            "Simple & fast"
        ],
        "icon": "🤖"
    }
];

const CHANNELS_DATA = [
    { name: "Random Thoughts", url: "https://t.me/random_thoughtx", desc: "My personal thoughts & vibes" },
    { name: "TonyStark Jr Support", url: "https://t.me/tonystark_jr", desc: "Bot Support 1" },
    { name: "Sukuna Bots Support", url: "https://t.me/sukuna_bots1", desc: "Bot Support 2" },
    { name: "XII CBSE Books", url: "https://t.me/XII_cbse", desc: "JEE / NEET / Boards PDFs" },
    { name: "Aspirant Junction", url: "https://t.me/AspirantJunction", desc: "Study Resources & Books" },
    { name: "Target JEE 2025", url: "https://t.me/target_jee_2025", desc: "Guidance & Motivation" },
    { name: "Backup Channel", url: "https://t.me/+RAve6uPX-ddlOGQ1", desc: "Emergency Backup" },
    { name: "JEE CLUB NTA", url: "https://t.me/+am1s1E0fDqE0MWM9", desc: "JEE STUFFs " },
    { name: "JEE KOTA MATERIALS", url: "https://t.me/+t2cauNLNsFxlMzVl", desc: "HIDDEN KOTA" }
];

document.addEventListener('DOMContentLoaded', () => {
    loadProfileData();
    loadBotsData();
    renderBlogPreview();
    renderChannels();
    setupThemeToggle();
});

function loadProfileData() {
    try {
        const data = AYUSH_DATA;

        // Update elements if they exist
        const nameEl = document.getElementById('profile-name');
        const levelEl = document.getElementById('profile-level');
        const vibeEl = document.getElementById('profile-vibe');
        const funFactsList = document.getElementById('fun-facts-list');

        if (nameEl) nameEl.textContent = data.name;
        if (levelEl) levelEl.textContent = data.level;
        if (vibeEl) vibeEl.textContent = data.vibe;

        if (funFactsList && data.funFacts) {
            funFactsList.innerHTML = ''; // Clear existing
            data.funFacts.forEach(fact => {
                const li = document.createElement('li');
                li.textContent = fact;
                li.className = 'glass-panel p-3 mb-2';
                funFactsList.appendChild(li);
            });
        }

        // Update Social Links
        const spotifyLink = document.getElementById('spotify-link');
        const telegramLink = document.getElementById('telegram-link');

        if (spotifyLink) spotifyLink.href = data.socials.spotify;
        if (telegramLink) telegramLink.href = data.socials.telegram;

    } catch (error) {
        console.error('Error loading profile data:', error);
    }
}

function loadBotsData() {
    const botsContainer = document.getElementById('bots-container');
    if (!botsContainer) return; // Not on the bots page

    try {
        const bots = BOTS_DATA;

        if (bots.length === 0) {
            botsContainer.innerHTML = '<p class="text-center">No bots found.</p>';
            return;
        }

        botsContainer.innerHTML = ''; // Clear loading state

        bots.forEach((bot, index) => {
            const card = document.createElement('div');
            card.className = 'glass-panel bot-card reveal';
            // Add a small delay for staggered animation
            card.style.animationDelay = `${index * 0.1}s`;

            const featuresHtml = bot.features.map(f => `<li><i class="fas fa-check" style="color: var(--secondary-color); margin-right: 8px;"></i>${f}</li>`).join('');

            card.innerHTML = `
                <div class="bot-icon neon-text">${bot.icon}</div>
                <h3 class="mb-2">${bot.name}</h3>
                <p class="username neon-text-blue mb-3">${bot.username}</p>
                <ul class="features-list" style="text-align: left; width: 100%; padding-left: 0;">
                    ${featuresHtml}
                </ul>
                <a href="https://t.me/${bot.username.replace('@', '')}" target="_blank" class="glass-button mt-auto" style="width: 100%; text-align: center;">
                    <i class="fab fa-telegram-plane"></i> Try It
                </a>
            `;

            botsContainer.appendChild(card);

            // Trigger reflow to ensure animation plays if added dynamically
            void card.offsetWidth;
            card.classList.add('active');
        });
    } catch (error) {
        console.error('Error loading bots data:', error);
        botsContainer.innerHTML = `<p style="color: red; text-align: center;">Failed to load bots: ${error.message}</p>`;
    }
}

function renderChannels() {
    const container = document.getElementById('channels-container');
    if (!container) return;

    container.innerHTML = '';
    CHANNELS_DATA.forEach((channel, index) => {
        const card = document.createElement('div');
        card.className = 'glass-panel channel-card reveal';
        card.style.transitionDelay = `${index * 100}ms`;

        card.innerHTML = `
            <div class="channel-icon neon-text"><i class="fab fa-telegram"></i></div>
            <h3 class="mb-2">${channel.name}</h3>
            <p style="opacity: 0.8; margin-bottom: 20px; flex-grow: 1;">${channel.desc}</p>
            <a href="${channel.url}" target="_blank" class="glass-button" style="width: 100%; font-size: 0.9rem;">Join Channel</a>
        `;
        container.appendChild(card);

        // Trigger reflow
        void card.offsetWidth;
        card.classList.add('active');
    });
}

function renderBlogPreview() {
    const container = document.getElementById('home-blog-preview');
    if (!container) return;

    // We need to access getBlogs from blog-manager.js. 
    // Since main.js loads before blog-manager.js in some cases, we might need to wait or ensure order.
    // However, for now, let's assume blog-manager.js functions are available or we read from localStorage directly.

    const blogs = JSON.parse(localStorage.getItem('ayush_blogs') || '[]');

    container.innerHTML = '';

    if (blogs.length === 0) {
        container.innerHTML = '<p class="text-center" style="grid-column: 1/-1;">No thoughts shared yet.</p>';
        return;
    }

    // Show latest 2 blogs
    blogs.slice(0, 2).forEach((blog, index) => {
        const card = document.createElement('div');
        card.className = 'glass-panel p-4 reveal';
        card.style.transitionDelay = `${index * 100}ms`;

        const preview = blog.content.length > 100 ? blog.content.substring(0, 100) + '...' : blog.content;

        card.innerHTML = `
            <h3 class="mb-2" style="font-size: 1.2rem;">${blog.title}</h3>
            <p style="opacity: 0.8; margin-bottom: 15px; font-size: 0.9rem;">${preview}</p>
            <a href="blog-post.html?id=${blog.id}" class="glass-button" style="font-size: 0.8rem; padding: 5px 15px;">Read More</a>
        `;
        container.appendChild(card);

        // Trigger reflow
        void card.offsetWidth;
        card.classList.add('active');
    });
}

// Expose to global scope if needed or call in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderBlogPreview();
});

function setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = toggleBtn.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}
