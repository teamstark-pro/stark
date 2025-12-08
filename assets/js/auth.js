const ADMIN_CREDS = {
    username: 'admin',
    password: 'admin123'
};

const SESSION_KEY = 'ayush_session';

function login(username, password) {
    // Check Admin
    if (username === ADMIN_CREDS.username && password === ADMIN_CREDS.password) {
        const session = { username: 'admin', role: 'admin', name: 'Ayush (Admin)' };
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        return { success: true, role: 'admin' };
    }

    return { success: false, message: 'Invalid username or password' };
}

function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = 'index.html';
}

function getCurrentUser() {
    const session = sessionStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
}

function checkAuth(requiredRole = null) {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'admin-login.html';
        return null;
    }
    if (requiredRole && user.role !== requiredRole) {
        alert('Access Denied: Admins only');
        window.location.href = 'index.html';
        return null;
    }
    return user;
}
