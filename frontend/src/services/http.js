// Cliente HTTP central: TODA chamada real à API REST passa por aqui.
// Ele monta a URL, envia/recebe JSON e anexa o token JWT automaticamente.

import { API_BASE_URL, TOKEN_STORAGE_KEY } from './config'

// Erro padronizado da API (guarda o status HTTP e o corpo da resposta).
export class ApiError extends Error {
    constructor(message, status, data) {
        super(message)
        this.name = 'ApiError'
        this.status = status
        this.data = data
    }
}

// Lê o token JWT salvo (quando o usuário está logado).
export function getToken() {
    return localStorage.getItem(TOKEN_STORAGE_KEY)
}

// Salva (ou remove, passando null) o token JWT.
export function setToken(token) {
    if (token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, token)
    } else {
        localStorage.removeItem(TOKEN_STORAGE_KEY)
    }
}

// Faz a requisição à API. Ex: request('/atores'), request('/api/v1/auth/login', { method: 'POST', body })
export async function request(path, { method = 'GET', body, headers } = {}) {
    const token = getToken()

    // FormData (upload de arquivo): o browser define o Content-Type certo
    // (com o boundary do multipart) sozinho — não dá pra forçar nem serializar.
    const isFormData = body instanceof FormData

    // Envolve o fetch em try/catch para transformar falha de rede (sem conexão,
    // DNS, CORS, etc.) em um ApiError padronizado com status 0.
    let response
    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
            method,
            headers: {
                ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...headers,
            },
            body: isFormData ? body : body != null ? JSON.stringify(body) : undefined,
        })
    } catch {
        throw new ApiError('Falha de conexão. Verifique sua internet.', 0, null)
    }

    // O corpo pode vir vazio (ex: 204 No Content); por isso o catch.
    const data = await response.json().catch(() => null)

    if (!response.ok) {
        const message = data?.message ?? `Erro ${response.status}`
        throw new ApiError(message, response.status, data)
    }

    return data
}

// Simula a latência da rede no modo mock, deixando a experiência parecida
// com a da API real (telas com carregamento, etc).
export function delay(ms = 400) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
