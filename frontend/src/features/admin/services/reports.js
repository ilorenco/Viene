// Serviço de Denúncias de atores/eventos.
//
// Conectado à API real (ver ReportController):
//   POST   /denuncias            -> registra denúncia { type, targetId, reason }
//   GET    /admin/denuncias      -> lista (admin)
//   DELETE /admin/denuncias/{id} -> resolve/descarta (admin)

import { request } from '@/services/http'

export async function listReports() {
    return request('/admin/denuncias')
}

// Registra uma denúncia com a justificativa do usuário. `type` = 'ator' | 'evento'.
// O nome exibido é derivado pelo back-end a partir de `targetId` (não confiamos
// em texto vindo do front pra isso).
export async function submitReport({ type = 'ator', targetId, reason }) {
    return request('/denuncias', { method: 'POST', body: { type, targetId, reason } })
}

// Resolve (descarta) uma denúncia — remove da fila do administrador.
export async function resolveReport(id) {
    return request(`/admin/denuncias/${id}`, { method: 'DELETE' })
}
