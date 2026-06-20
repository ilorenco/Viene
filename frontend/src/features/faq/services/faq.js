// Serviço de Perguntas Frequentes (FAQ / Ajuda).
//
// Estilo da branch do colega: cada função espera um mockDelay() e devolve o mock,
// sem o ramo duplo USE_MOCKS/http.js. A cópia editável em memória simula o banco
// (admin adiciona/edita/remove e vê o reflexo na página pública durante a sessão).
//
// Endpoints reais (a confirmar no contrato — base no InstitucionalController):
//   GET    /ajuda            -> lista pública de perguntas
//   POST   /admin/ajuda      -> cria pergunta (admin)
//   PUT    /admin/ajuda/{id}  -> edita pergunta (admin)
//   DELETE /admin/ajuda/{id}  -> remove pergunta (admin)

import { mockFaqs } from '@/features/faq/mocks/faqs'
import { mockDelay } from '@/mocks/delay'

let faqs = mockFaqs.map((faq) => ({ ...faq }))
let nextId = Math.max(0, ...faqs.map((faq) => faq.id)) + 1

export async function listFaqs() {
    await mockDelay()
    return faqs.map((faq) => ({ ...faq }))
}

export async function createFaq({ question, answer }) {
    await mockDelay()
    const item = { id: nextId++, question, answer }
    faqs = [item, ...faqs]
    // Retorna uma cópia para não expor a referência interna da lista mock.
    return { ...item }
}

export async function updateFaq(id, { question, answer }) {
    await mockDelay()
    faqs = faqs.map((faq) => (faq.id === id ? { ...faq, question, answer } : faq))
    // Retorna uma cópia para não expor a referência interna da lista mock.
    return { ...faqs.find((faq) => faq.id === id) }
}

export async function deleteFaq(id) {
    await mockDelay()
    faqs = faqs.filter((faq) => faq.id !== id)
    return { id, deleted: true }
}
