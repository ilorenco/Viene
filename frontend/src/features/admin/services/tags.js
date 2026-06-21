// Serviço de Tags (verticais de atores e categorias de eventos), usado pelo
// editor de Tags do admin (Plataforma → Tags).
//
// Conectado à API real (ver TagController, prefixo /admin/tags):
//   GET    /admin/tags       -> lista todas as tags (front filtra por kind)
//   POST   /admin/tags       -> cria uma tag      { label, kind }
//   DELETE /admin/tags/{id}  -> remove uma tag
//
// IMPORTANTE (cascade): ao REMOVER uma tag, o back-end retira ela, na MESMA
// operação, de todos os atores/eventos que a utilizavam.

import { request } from '@/services/http'

// kind: 'ator' | 'evento' (a qual conjunto a tag pertence).
export async function listTags(kind) {
    const tags = await request('/admin/tags')
    return kind ? tags.filter((tag) => tag.kind === kind) : tags
}

export async function createTag({ label, kind }) {
    return request('/admin/tags', { method: 'POST', body: { label, kind } })
}

export async function deleteTag({ id }) {
    return request(`/admin/tags/${id}`, { method: 'DELETE' })
}
