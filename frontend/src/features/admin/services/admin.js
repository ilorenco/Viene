// Serviço do módulo de Administração.
//
// Aprovações conectadas à API real (ver ApprovalController, prefixo /admin):
//   GET    /admin/aprovacoes          -> fila de moderação (eventos/atores pendentes)
//   PUT    /admin/eventos|atores/{id} -> aprovar/rejeitar
//   POST   /admin/comentarios         -> comentário de moderação
//
// Usuários ainda em mock (módulo de Usuários é outra rodada):
//   GET    /admin/usuarios            -> lista de usuários
//   DELETE /admin/usuarios/{id}       -> remover usuário
//   PUT    /admin/usuarios/{id}/status -> bloquear/desbloquear

import { mockAdminUsers } from '@/features/admin/mocks/admin'
import { mockDelay } from '@/mocks/delay'
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

// Cópia mutável em memória (mock): exclusão/bloqueio refletem nas listas.
let users = mockAdminUsers.map((user) => ({ ...user }))

export async function listUsers() {
    await mockDelay()
    return users.map((user) => ({ ...user }))
}

export async function deleteUser(id) {
    await mockDelay()
    users = users.filter((user) => user.id !== id)
    return { id, deleted: true }
}

// Bloqueia/desbloqueia um usuário (alterna ativo <-> bloqueado).
export async function toggleUserStatus(id) {
    await mockDelay()
    let updated = null
    users = users.map((user) => {
        if (user.id !== id) return user
        updated = { ...user, status: user.status === 'ativo' ? 'bloqueado' : 'ativo' }
        return updated
    })
    return updated
}
