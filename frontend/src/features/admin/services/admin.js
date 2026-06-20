// Serviço do módulo de Administração.
//
// Estilo da branch do colega: cada função espera um mockDelay() e devolve o mock,
// sem o ramo duplo USE_MOCKS/http.js. Mantemos cópias mutáveis em memória para que
// aprovar/rejeitar e excluir usuários reflitam nas listas durante a navegação
// (sem back-end, isso simula o estado que viria do banco). Quando a API existir,
// troca-se o CORPO de cada função por uma chamada real.
//
// Endpoints reais (ver AdminController, prefixo /admin):
//   GET    /admin/aprovacoes          -> fila de moderação (eventos/atores pendentes)
//   PUT    /admin/eventos|atores/{id} -> aprovar/rejeitar
//   GET    /admin/usuarios            -> lista de usuários
//   DELETE /admin/usuarios/{id}       -> remover usuário
//   PUT    /admin/usuarios/{id}/status -> bloquear/desbloquear
//   POST   /admin/comentarios         -> comentário de moderação

import { mockAdminUsers, mockPendingApprovals } from '@/features/admin/mocks/admin'
import { mockDelay } from '@/mocks/delay'

// Cópias mutáveis em memória (mock): aprovar/rejeitar e excluir refletem nas listas.
let approvals = mockPendingApprovals.map((item) => ({ ...item }))
let users = mockAdminUsers.map((user) => ({ ...user }))

export async function getApprovals() {
    await mockDelay()
    return approvals.map((item) => ({ ...item }))
}

// Aprova ou rejeita um item (evento ou ator). Marca como revisado e guarda a
// decisão, em vez de remover — assim o filtro "revisados/não revisados" funciona.
// RN_003: o item só é publicado após esta ação afirmativa do administrador.
export async function moderateApproval({ id, type, approved, comment }) {
    await mockDelay()
    const decision = approved ? 'aprovado' : 'rejeitado'
    approvals = approvals.map((item) =>
        item.id === id ? { ...item, reviewed: true, decision } : item,
    )
    return { id, type, status: decision, comment }
}

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

// Registra um comentário de moderação (ex: motivo de rejeição).
export async function addModerationComment({ targetId, type, comment }) {
    await mockDelay()
    return { id: 999, targetId, type, comment }
}
