// URL base (debería venir de config global, pero por ahora...)
// Si window.API_BASE_URL no está definido (porque script.js carga antes o después), definimos fallback
const AUTH_API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api/auth'
    : 'https://testing-ivmx.onrender.com/api/auth';

document.addEventListener('DOMContentLoaded', () => {
    // Referencias
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const goToRegister = document.getElementById('go-to-register');
    const goToLogin = document.getElementById('go-to-login');
    const loginSection = document.getElementById('login-form-container');
    const registerSection = document.getElementById('register-form-container');
    const errorBox = document.getElementById('auth-error');

    // Toggles
    goToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
        clearError();
    });

    goToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
        clearError();
    });

    // Login Submit
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            showLoading(true);
            const res = await fetch(`${AUTH_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Error al iniciar sesión');

            // Éxito
            completeLogin(data);
        } catch (err) {
            showError(err.message);
        } finally {
            showLoading(false);
        }
    });

    // Register Submit
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        try {
            showLoading(true);
            const res = await fetch(`${AUTH_API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Error al registrarse');

            // Éxito
            completeLogin(data);
        } catch (err) {
            showError(err.message);
        } finally {
            showLoading(false);
        }
    });

    function showLoading(isLoading) {
        const btns = document.querySelectorAll('.auth-btn');
        btns.forEach(btn => {
            btn.disabled = isLoading;
            btn.textContent = isLoading ? 'Cargando...' : (btn.type === 'submit' && btn.closest('#login-form') ? 'Iniciar Sesión 🚀' : 'Crear Cuenta ✨');
        });
    }

    function showError(msg) {
        errorBox.textContent = msg;
        errorBox.style.display = 'block';
    }

    function clearError() {
        errorBox.style.display = 'none';
    }

    function completeLogin(data) {
        // Guardar Token y Usuario en LocalStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        alert(`¡Bienvenido ${data.user.username}!`);

        // Recargar la página para que el script principal detecte el login y muestre el perfil real
        if (window.location.reload) {
            window.location.reload();
        }

        // O si quisiéramos redirigir manualmente:
        // loadProfileSection(); 
    }
});
