// Serviço de Denúncias de atores (mock).
//
// As denúncias enviadas pelos usuários (no perfil do ator) ficam nesta cópia em
// memória e aparecem na administração (Plataforma > Denúncias). Sem back-end, isso
// simula o estado que viria do banco. Quando a API existir, troca-se o CORPO destas
// funções por chamadas reais.
//
// Endpoints reais (sugestão): POST /atores/{id}/denuncias -> registra denúncia;
//   GET /admin/denuncias -> lista; DELETE/PUT /admin/denuncias/{id} -> resolver.

import { mockDelay } from '@/mocks/delay'

let reports = []
let nextId = 1

export async function listReports() {
    await mockDelay()
    return reports.map((report) => ({ ...report }))
}

// Registra uma denúncia com a justificativa do usuário. `type` = 'ator' | 'evento'.
export async function submitReport({ name, type = 'ator', reason }) {
    await mockDelay()
    const report = {
        id: nextId++,
        name,
        type,
        reason: (reason ?? '').trim(),
        date: new Date().toLocaleDateString('pt-BR'),
    }
    reports = [report, ...reports]
    return report
}

// Resolve (descarta) uma denúncia — remove da fila do administrador.
export async function resolveReport(id) {
    await mockDelay()
    reports = reports.filter((report) => report.id !== id)
    return { id, resolved: true }
}
