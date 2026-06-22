// Serviço de Autenticação (Login / Cadastro / Recuperar senha / Perfil).
//
// Endpoints reais (ver AuthenticationController/UserProfileController, prefixo
// /api/v1/auth ou /api/v1/user):
//   POST /api/v1/auth/login            -> autentica e devolve o token JWT
//   POST /api/v1/auth/register         -> cria a conta
//   POST /api/v1/auth/recuperar-senha  -> dispara o e-mail de recuperação
//   PUT  /api/v1/user/profile          -> edita nome/e-mail/telefone/nascimento

import { getToken, request, setToken } from './http'

const USER_STORAGE_KEY = 'viene.user'

export async function login({ email, password }) {
    const data = await request('/api/v1/auth/login', {
        method: 'POST',
        body: { email, password },
    })
    setToken(data.token)
    if (data.user) saveUser(data.user)
    return data
}

export async function register({ name, email, password }) {
    return request('/api/v1/auth/register', {
        method: 'POST',
        body: { name, email, password },
    })
}

export async function recoverPassword({ email }) {
    return request('/api/v1/auth/recuperar-senha', {
        method: 'POST',
        body: { email },
    })
}

export async function updateProfile({ name, email, phone, birthdate, avatar }) {
    const data = await request('/api/v1/user/profile', {
        method: 'PUT',
        body: { name, email, phone, birthdate, avatar },
    })
    // O e-mail é o subject do JWT: trocá-lo invalida o token antigo, por isso o
    // back devolve um token novo (igual ao login) e o front precisa trocá-lo já.
    setToken(data.token)
    if (data.user) saveUser(data.user)
    return data
}

// Salva o usuário logado no navegador.
function saveUser(user) {
    try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    } catch {
        // Ignora se o armazenamento estiver indisponível.
    }
}

// Retorna o usuário logado (ou null).
export function getCurrentUser() {
    try {
        const raw = localStorage.getItem(USER_STORAGE_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

// Indica se há um usuário logado (existe token salvo).
export function isAuthenticated() {
    return Boolean(getToken())
}

// Encerra a sessão: apaga o token e o usuário do navegador.
export function logout() {
    setToken(null)
    try {
        localStorage.removeItem(USER_STORAGE_KEY)
    } catch {
        // Ignora.
    }
}
