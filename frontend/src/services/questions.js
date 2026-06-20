// Serviço de perguntas dos usuários ao administrador.
//
// Fluxo: o usuário (logado) envia uma pergunta pela página /ajuda -> ela entra
// como "pendente" -> o admin responde -> a resposta aparece no perfil do usuário.
//
// Estilo da branch do colega: cada função espera um mockDelay() e devolve o mock,
// sem o ramo duplo USE_MOCKS/http.js. A lista editável em memória simula o banco.
//
// Endpoints reais (a confirmar no contrato):
//   POST   /ajuda/perguntas                -> usuário envia pergunta
//   GET    /admin/perguntas                -> admin lista as perguntas
//   PUT    /admin/perguntas/{id}/responder -> admin responde
//   DELETE /admin/perguntas/{id}           -> admin remove

import { mockDelay } from '@/mocks/delay'

import { getCurrentUser } from './auth'

// Chave ÚNICA do React Query para a lista de perguntas — usada por TODOS os
// consumidores (Perfil, Admin) para que uma invalidação atualize ambas as telas.
export const QUESTIONS_KEY = ['questions']

// Lista editável em memória (mock) — compartilhada entre FAQ, Admin e Perfil.
let questions = [
    {
        id: 1,
        question: 'Consigo transferir meu ingresso para outra pessoa?',
        userName: 'João Silva',
        userEmail: 'joao.silva@viene.com',
        status: 'respondida',
        answer: 'Sim! Em breve a transferência de ingressos estará disponível direto pelo app.',
        createdAt: '28 Mai. 2026',
        answeredAt: '29 Mai. 2026',
    },
    {
        id: 2,
        question: 'Como minha empresa vira um "ator" verificado no mapa?',
        userName: 'João Silva',
        userEmail: 'joao.silva@viene.com',
        status: 'pendente',
        answer: null,
        createdAt: '01 Jun. 2026',
        answeredAt: null,
    },
]
let nextId = 3

function today() {
    try {
        return new Date().toLocaleDateString('pt-BR')
    } catch {
        return ''
    }
}

export async function listQuestions() {
    await mockDelay()
    return questions.map((item) => ({ ...item }))
}

export async function submitQuestion({ question }) {
    await mockDelay()
    const user = getCurrentUser()
    const item = {
        id: nextId++,
        question,
        userName: user?.name ?? 'Usuário',
        userEmail: user?.email ?? '',
        status: 'pendente',
        answer: null,
        createdAt: today(),
        answeredAt: null,
    }
    questions = [item, ...questions]
    return item
}

export async function answerQuestion(id, { answer }) {
    await mockDelay()
    questions = questions.map((item) =>
        item.id === id ? { ...item, answer, status: 'respondida', answeredAt: today() } : item,
    )
    // Retorna uma cópia para não expor a referência interna da lista mock.
    const item = questions.find((item) => item.id === id)
    return { ...item }
}

export async function deleteQuestion(id) {
    await mockDelay()
    questions = questions.filter((item) => item.id !== id)
    return { id, deleted: true }
}
