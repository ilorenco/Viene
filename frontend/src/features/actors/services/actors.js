// Serviço de Atores (agentes do ecossistema de inovação).
//
// Conectado à API real (ver ActorController, prefixo /atores):
//   GET    /atores        -> lista de atores
//   GET    /atores/{id}   -> detalhe de um ator
//   POST   /atores        -> solicita o cadastro (autenticado; entra como pendente)
//   DELETE /atores/{id}   -> remove um ator (admin)

import { ApiError, request } from '@/services/http'

export async function listActors() {
    return request('/atores')
}

// Ator inexistente devolve null (em vez de lançar), pra manter o mesmo contrato
// que a tela de perfil (ActorProfile) já espera: `if (!actor) return <NotFound/>`.
export async function getActorById(id) {
    try {
        return await request(`/atores/${id}`)
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) return null
        throw error
    }
}

// Remove um ator (ação de admin). Ainda não há UI que chame isto.
export async function deleteActor(id) {
    return request(`/atores/${id}`, { method: 'DELETE' })
}

// Solicita o cadastro de um ator (RegisterActorModal). RN_003: entra como
// pendente até a moderação de um administrador.
export async function createActor({ name, address, type, position, description, website, email, phone }) {
    return request('/atores', {
        method: 'POST',
        body: { name, address, type, position, description, website, email, phone },
    })
}
