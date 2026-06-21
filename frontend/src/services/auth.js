// Serviço de Autenticação (Login / Cadastro / Recuperar senha).
//
// Endpoints reais (ver AuthenticationController, prefixo /api/v1/auth):
//   POST /api/v1/auth/login            -> autentica e devolve o token JWT
//   POST /api/v1/auth/register         -> cria a conta
//   POST /api/v1/auth/recuperar-senha  -> dispara o e-mail de recuperação

import { USE_MOCKS } from './config'
import { delay, getToken, request, setToken } from './http'

const USER_STORAGE_KEY = 'viene.user'

// Papel do usuário no modo mock (sem back-end ainda). Convenção de TESTE: e-mails
// começando com "admin@" (ex.: admin@viene.com) entram como ADMINISTRADOR; os
// demais entram como usuário comum. Com a API real, o papel virá do back-end
// (no JWT / no /me) e esta função deixa de ser usada.
//
// ⚠️ SEGURANÇA: o `role` definido aqui fica no navegador (localStorage) e serve só
// para a UI do mock — NÃO é barreira de segurança (pode ser adulterado pelo
// DevTools). Quando a API entrar, o back-end DEVE validar o papel em TODA rota
// administrativa (/admin/*); o front-end nunca é fonte de verdade p/ autorização.
function roleForEmail(email) {
    return /^admin@/i.test(String(email).trim()) ? 'admin' : 'usuario'
}

export async function login({ email, password }) {
    if (USE_MOCKS) {
        await delay()
        // Modo mock: aceita qualquer e-mail/senha já validados na tela.
        const fakeToken = 'mock-jwt-token'
        const user = { name: email.split('@')[0], email, role: roleForEmail(email) }
        setToken(fakeToken)
        saveUser(user)
        return { token: fakeToken, user }
    }

    const data = await request('/api/v1/auth/login', {
        method: 'POST',
        body: { email, password },
    })
    setToken(data.token)
    if (data.user) saveUser(data.user)
    return data
}

export async function register({ name, email, password }) {
    if (USE_MOCKS) {
        await delay()
        return { id: 1, name, email }
    }

    return request('/api/v1/auth/register', {
        method: 'POST',
        body: { name, email, password },
    })
}

export async function recoverPassword({ email }) {
    if (USE_MOCKS) {
        await delay()
        return { message: 'Se o e-mail existir, enviaremos as instruções de recuperação.' }
    }

    return request('/api/v1/auth/recuperar-senha', {
        method: 'POST',
        body: { email },
    })
}

// Salva o usuário logado no navegador (modo mock).
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
