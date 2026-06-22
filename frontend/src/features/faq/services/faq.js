// Serviço de Perguntas Frequentes (FAQ / Ajuda).
//
// Conectado à API real (ver FaqController):
//   GET    /ajuda            -> lista pública de perguntas
//   POST   /admin/ajuda      -> cria pergunta (admin)
//   PUT    /admin/ajuda/{id}  -> edita pergunta (admin)
//   DELETE /admin/ajuda/{id}  -> remove pergunta (admin)

import { request } from '@/services/http'

export async function listFaqs() {
    return request('/ajuda')
}

export async function createFaq({ category, question, answer }) {
    return request('/admin/ajuda', { method: 'POST', body: { category, question, answer } })
}

export async function updateFaq(id, { category, question, answer }) {
    return request(`/admin/ajuda/${id}`, { method: 'PUT', body: { category, question, answer } })
}

export async function deleteFaq(id) {
    return request(`/admin/ajuda/${id}`, { method: 'DELETE' })
}
