// validarIngreso.js
export function validarIngreso(username, password) {
    const PASSWORD_VALIDA = "06102025";
    
    if (password === PASSWORD_VALIDA && username.trim() !== "") {
        localStorage.setItem('usuario', username);
        return true;
    }
    return false;
}

export function verificarAutenticacion() {
    return localStorage.getItem('usuario') !== null;
}

export function cerrarSesion() {
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
}

// Manejar formulario de login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (validarIngreso(username, password)) {
                window.location.href = 'juiciosAprendicesFicha.html';
            } else {
                alert('❌ Contraseña incorrecta. Use: 06102025');
            }
        });
    }
});