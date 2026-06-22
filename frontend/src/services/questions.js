// Serviço de perguntas dos usuários ao administrador.
//
// Fluxo: o usuário (logado) envia uma pergunta pela página /ajuda -> ela entra
// como "pendente" -> o admin responde -> a resposta aparece no perfil do usuário.
//
// Conectado à API real (ver QuestionController):
//   POST   /ajuda/perguntas                -> usuário envia pergunta (autenticado)
//   GET    /ajuda/perguntas                -> lista só as MINHAS perguntas
//   GET    /admin/perguntas                -> admin lista TODAS as perguntas
//   PUT    /admin/perguntas/{id}/responder -> admin responde
//   DELETE /admin/perguntas/{id}           -> admin remove
//
// IMPORTANTE: listQuestions (admin, todas) e listMyQuestions (perfil, só as
// minhas) usam queries DIFERENTES — antes do back-end existir, o mock
// compartilhava os dois, mas isso devolveria as perguntas de todo mundo na
// tela de perfil de qualquer usuário (falha de privacidade) e quebraria com
// 403 quando GET /admin/perguntas exige admin.

import { request } from '@/services/http'

// Chave do React Query da lista do ADMIN (todas as perguntas).
export const QUESTIONS_KEY = ['questions', 'admin']

// Chave do React Query da lista do PERFIL (só as minhas).
export const MY_QUESTIONS_KEY = ['questions', 'mine']

export async function listQuestions() {
    return request('/admin/perguntas')
}

export async function listMyQuestions() {
    return request('/ajuda/perguntas')
}

export async function submitQuestion({ question }) {
    return request('/ajuda/perguntas', { method: 'POST', body: { question } })
}

export async function answerQuestion(id, { answer }) {
    return request(`/admin/perguntas/${id}/responder`, { method: 'PUT', body: { answer } })
}

export async function deleteQuestion(id) {
    return request(`/admin/perguntas/${id}`, { method: 'DELETE' })
}
