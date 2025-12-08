const STORAGE_KEY = 'ayush_website_blogs';

function getBlogs() {
    const blogs = localStorage.getItem(STORAGE_KEY);
    return blogs ? JSON.parse(blogs) : [];
}

function saveBlog(blog) {
    const blogs = getBlogs();
    // Add ID and Date
    blog.id = Date.now().toString();
    blog.date = new Date().toLocaleDateString();

    // Initialize interactions
    blog.likes = [];
    blog.dislikes = [];
    blog.comments = [];

    blogs.unshift(blog); // Add to top
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    return true;
}

function deleteBlog(id) {
    let blogs = getBlogs();
    blogs = blogs.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
}

// Interaction Functions
function toggleLike(blogId) {
    // Simple browser-based tracking to prevent infinite spam (not secure, but fine for static site)
    const likedKey = `liked_${blogId}`;
    if (localStorage.getItem(likedKey)) {
        return { success: false, message: 'You already liked this!' };
    }

    const blogs = getBlogs();
    const blog = blogs.find(b => b.id === blogId);
    if (!blog) return { success: false };

    // Initialize if missing (migration)
    if (!blog.likes) blog.likes = [];

    // Add a generic "User" to the array just to count
    blog.likes.push('visitor');

    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    localStorage.setItem(likedKey, 'true'); // Mark as liked on this device

    return { success: true, likes: blog.likes.length };
}

function toggleDislike(blogId) {
    const dislikedKey = `disliked_${blogId}`;
    if (localStorage.getItem(dislikedKey)) {
        return { success: false, message: 'You already disliked this!' };
    }

    const blogs = getBlogs();
    const blog = blogs.find(b => b.id === blogId);
    if (!blog) return { success: false };

    if (!blog.dislikes) blog.dislikes = [];

    blog.dislikes.push('visitor');

    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    localStorage.setItem(dislikedKey, 'true');

    return { success: true, dislikes: blog.dislikes.length };
}

function addComment(blogId, text, name) {
    const blogs = getBlogs();
    const blog = blogs.find(b => b.id === blogId);
    if (!blog) return { success: false };

    if (!blog.comments) blog.comments = [];

    const newComment = {
        id: Date.now().toString(),
        user: name || 'Anonymous',
        text: text,
        date: new Date().toLocaleDateString()
    };

    blog.comments.push(newComment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    return { success: true, comment: newComment };
}

// Function to render blogs on the public page
function renderBlogs(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const blogs = getBlogs();

    if (blogs.length === 0) {
        container.innerHTML = `
            <div class="glass-panel p-5 text-center" style="grid-column: 1 / -1;">
                <h2 class="neon-text">Coming Soon...</h2>
                <p style="opacity: 0.7; margin-top: 10px;">Stay tuned for updates!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    blogs.forEach((blog, index) => {
        const card = document.createElement('div');
        card.className = 'glass-panel p-4 reveal';
        card.style.transitionDelay = `${index * 100}ms`;

        const preview = blog.content.length > 150 ? blog.content.substring(0, 150) + '...' : blog.content;
        const likesCount = blog.likes ? blog.likes.length : 0;
        const commentsCount = blog.comments ? blog.comments.length : 0;

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                <h2 class="neon-text" style="font-size: 1.5rem;">${blog.title}</h2>
                <small style="opacity: 0.7;">${new Date(blog.date).toLocaleDateString()}</small>
            </div>
            <p style="opacity: 0.9; line-height: 1.6; margin-bottom: 20px;">${preview}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <a href="blog-post.html?id=${blog.id}" class="glass-button" style="font-size: 0.9rem;">Read Full Blog <i class="fas fa-arrow-right"></i></a>
                <div style="font-size: 0.9rem; opacity: 0.8;">
                    <span style="margin-right: 15px;"><i class="fas fa-heart" style="color: var(--primary-color);"></i> ${likesCount}</span>
                    <span><i class="fas fa-comment"></i> ${commentsCount}</span>
                </div>
            </div>
        `;
        container.appendChild(card);

        // Trigger reflow
        void card.offsetWidth;
        card.classList.add('active');
    });
}

function loadSingleBlog() {
    const container = document.getElementById('single-blog-container');
    if (!container) return;

    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    if (!blogId) {
        container.innerHTML = '<h2 class="text-center" style="color: red;">Blog not found.</h2>';
        return;
    }

    const blogs = getBlogs();
    const blog = blogs.find(b => b.id.toString() === blogId);

    if (blog) {
        // Ensure arrays exist
        const likes = blog.likes || [];
        const dislikes = blog.dislikes || [];
        const comments = blog.comments || [];

        // Check if liked on this device
        const isLiked = localStorage.getItem(`liked_${blogId}`);
        const isDisliked = localStorage.getItem(`disliked_${blogId}`);

        container.innerHTML = `
            <h1 class="neon-text mb-4" style="font-size: 2.5rem; text-align: center;">${blog.title}</h1>
            <div style="text-align: center; margin-bottom: 30px; opacity: 0.7;">
                <i class="far fa-calendar-alt"></i> ${new Date(blog.date).toLocaleDateString()}
            </div>
            <div style="font-size: 1.1rem; line-height: 1.8; white-space: pre-wrap; margin-bottom: 40px;">${blog.content}</div>
            
            <!-- Interactions -->
            <div class="glass-panel p-3 mb-4" style="display: flex; justify-content: center; gap: 20px; align-items: center;">
                <button onclick="handleLike('${blog.id}')" class="glass-button ${isLiked ? 'glowing' : ''}" style="${isLiked ? 'background: var(--primary-color);' : ''}">
                    <i class="fas fa-thumbs-up"></i> <span id="likes-count">${likes.length}</span>
                </button>
                <button onclick="handleDislike('${blog.id}')" class="glass-button ${isDisliked ? 'glowing' : ''}" style="${isDisliked ? 'background: red;' : ''}">
                    <i class="fas fa-thumbs-down"></i> <span id="dislikes-count">${dislikes.length}</span>
                </button>
            </div>

            <!-- Comments Section -->
            <div class="mt-5">
                <h3 class="mb-4">Comments (${comments.length})</h3>
                
                <div id="comments-list" class="mb-4">
                    ${comments.map(c => `
                        <div class="glass-panel p-3 mb-3" style="border-left: 3px solid var(--secondary-color);">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <strong>${c.user}</strong>
                                <small style="opacity: 0.6;">${c.date}</small>
                            </div>
                            <p>${c.text}</p>
                        </div>
                    `).join('')}
                    ${comments.length === 0 ? '<p style="opacity: 0.6;">No comments yet. Be the first!</p>' : ''}
                </div>

                <form onsubmit="handleComment(event, '${blog.id}')" class="glass-panel p-4">
                    <h4 class="mb-3">Leave a Comment</h4>
                    <div class="mb-3">
                        <input type="text" id="comment-name" placeholder="Your Name" class="glass-input" required style="width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px; border-radius: 8px; margin-bottom: 10px;">
                    </div>
                    <div class="mb-3">
                        <textarea id="comment-input" placeholder="Write a comment..." rows="3" required style="width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px; border-radius: 8px;"></textarea>
                    </div>
                    <button type="submit" class="glass-button">Post Comment</button>
                </form>
            </div>
        `;
    } else {
        container.innerHTML = '<h2 class="text-center" style="color: red;">Blog post not found.</h2>';
    }
}

// Handlers for UI
function handleLike(id) {
    const result = toggleLike(id);
    if (result.success) {
        location.reload(); // Simple reload to update UI state
    } else {
        alert(result.message || 'Error');
    }
}

function handleDislike(id) {
    const result = toggleDislike(id);
    if (result.success) {
        location.reload();
    } else {
        alert(result.message || 'Error');
    }
}

function handleComment(e, id) {
    e.preventDefault();
    const nameInput = document.getElementById('comment-name');
    const textInput = document.getElementById('comment-input');

    const name = nameInput.value;
    const text = textInput.value;

    const result = addComment(id, text, name);
    if (result.success) {
        location.reload();
    } else {
        alert(result.message || 'Error');
    }
}

// Function to render blogs on the admin dashboard
function renderAdminBlogs(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const blogs = getBlogs();
    container.innerHTML = '';

    blogs.forEach(blog => {
        const item = document.createElement('div');
        item.className = 'glass-panel p-3 mb-3';
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';

        item.innerHTML = `
            <div>
                <strong>${blog.title}</strong>
                <span style="display:block; font-size: 0.8rem; opacity: 0.6;">${blog.date}</span>
            </div>
            <button onclick="handleDelete('${blog.id}')" class="glass-button" style="background: rgba(255,0,0,0.2); border-color: red; font-size: 0.8rem;">Delete</button>
        `;
        container.appendChild(item);
    });
}
