// Serviço de Autenticação (mock). Guarda token/usuário no navegador.
// Quando a API existir, trocar pelo cliente HTTP real.

const TOKEN_KEY = 'viene.token'
const USER_KEY = 'viene.user'

export function getToken() {
    try {
        return localStorage.getItem(TOKEN_KEY)
    } catch {
        return null
    }
}

// Indica se há um usuário logado (existe token salvo).
export function isAuthenticated() {
    return Boolean(getToken())
}

export function getCurrentUser() {
    try {
        const raw = localStorage.getItem(USER_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

export async function login({ email }) {
    // Mock: aceita qualquer credencial já validada na tela.
    try {
        localStorage.setItem(TOKEN_KEY, 'mock-jwt-token')
        localStorage.setItem(USER_KEY, JSON.stringify({ name: email.split('@')[0], email }))
    } catch {
        // Ignora se o armazenamento estiver indisponível.
    }
    return getCurrentUser()
}

export function logout() {
    try {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
    } catch {
        // Ignora.
    }
}
