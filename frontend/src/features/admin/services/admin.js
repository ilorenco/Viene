// Serviço do módulo de Administração.
//
// Conectado à API real (ver ApprovalController/UserAdminController, prefixo /admin):
//   GET    /admin/aprovacoes          -> fila de moderação (eventos/atores pendentes)
//   PUT    /admin/eventos|atores/{id} -> aprovar/rejeitar
//   POST   /admin/comentarios         -> comentário de moderação
//   GET    /admin/usuarios            -> lista de usuários
//   DELETE /admin/usuarios/{id}       -> remover usuário
//   PUT    /admin/usuarios/{id}/status -> bloquear/desbloquear

import { request } from '@/services/http'

export async function getApprovals() {
    return request('/admin/aprovacoes')
}

// Aprova ou rejeita um item (evento ou ator). RN_003: o item só é publicado
// após esta ação afirmativa do administrador.
export async function moderateApproval({ id, type, approved, comment }) {
    const path = type === 'ator' ? `/admin/atores/${id}` : `/admin/eventos/${id}`
    await request(path, { method: 'PUT', body: { approved, comment } })
    return { id, type, status: approved ? 'aprovado' : 'rejeitado', comment }
}

// Registra um comentário de moderação (ex: motivo de rejeição).
export async function addModerationComment({ targetId, type, comment }) {
    return request('/admin/comentarios', { method: 'POST', body: { targetId, type, comment } })
}

export async function listUsers() {
    return request('/admin/usuarios')
}

export async function deleteUser(id) {
    return request(`/admin/usuarios/${id}`, { method: 'DELETE' })
}

// Bloqueia/desbloqueia um usuário (alterna ativo <-> bloqueado).
export async function toggleUserStatus(id) {
    return request(`/admin/usuarios/${id}/status`, { method: 'PUT' })
}
