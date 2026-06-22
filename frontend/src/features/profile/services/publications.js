// Serviço das "Minhas publicações" do Perfil de ator: os ATORES e EVENTOS sob a
// responsabilidade do usuário logado (que ele cadastrou). Edição direta, sem nova
// moderação de admin.
//
// Conectado à API real (ver PublicationController/ActorController/EventController):
//   GET /usuarios/me/publicacoes -> { actors, events } com `status` ('ativo'|'bloqueado')
//   PUT /atores/{id}             -> edita um ator do próprio usuário
//   PUT /eventos/{id}            -> edita um evento do próprio usuário

import { request } from '@/services/http'

export const MY_PUBLICATIONS_KEY = ['my-publications']

export async function listMyPublications() {
    return request('/usuarios/me/publicacoes')
}

export async function updateMyActor(id, changes) {
    return request(`/atores/${id}`, { method: 'PUT', body: changes })
}

// `datetime` é só um texto calculado no front pra preview — o back já calcula
// isso a partir de date/start/end, então não faz parte do contrato real. `start`/
// `end` viram null quando vazios — o back não aceita string vazia como horário.
export async function updateMyEvent(id, changes) {
    const { datetime: _datetime, start, end, ...payload } = changes
    return request(`/eventos/${id}`, {
        method: 'PUT',
        body: { ...payload, start: start || null, end: end || null },
    })
}
