// Serviço de Favoritos.
//
// Conectado à API real (ver FavoriteController, prefixo /favoritos):
//   GET    /favoritos         -> lista crua {id, type, targetId} do usuário logado
//   GET    /favoritos/atores  -> atores favoritados (objetos completos)
//   GET    /favoritos/eventos -> eventos favoritados (objetos completos)
//   POST   /favoritos         -> favorita {type, targetId}
//   DELETE /favoritos/{type}/{targetId} -> desfavorita

import { request } from '@/services/http'

export async function listFavoriteIds() {
    return request('/favoritos')
}

export async function listFavoriteActors() {
    return request('/favoritos/atores')
}

export async function listFavoriteEvents() {
    return request('/favoritos/eventos')
}

export async function addFavorite({ type, targetId }) {
    return request('/favoritos', { method: 'POST', body: { type, targetId } })
}

export async function removeFavorite({ type, targetId }) {
    return request(`/favoritos/${type}/${targetId}`, { method: 'DELETE' })
}
