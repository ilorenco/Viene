// Serviço das "Minhas publicações" do Perfil de ator: os ATORES e EVENTOS sob a
// responsabilidade do usuário logado (que ele cadastrou ou assumiu a manutenção).
//
// Estilo da branch do colega: cada função espera um mockDelay() e devolve o mock.
// A lista editável em memória simula o banco — por ser do próprio usuário, as
// edições entram DIRETO (sem nova moderação de admin).
//
// Endpoints reais (quando a API existir):
//   GET    /usuarios/me/publicacoes          -> { actors, events } com `status`
//   PUT    /atores/{id}                       -> edita um ator do próprio usuário
//   PUT    /eventos/{id}                       -> edita um evento do próprio usuário
// O `status` ('ativo' | 'bloqueado') vem da moderação; o usuário não o altera.

import { mockActors } from '@/features/actors/mocks/actors'
import { mockEvents } from '@/features/events/mocks/events'
import { mockDelay } from '@/mocks/delay'

export const MY_PUBLICATIONS_KEY = ['my-publications']

// Cópia MUTÁVEL em memória (simula o banco). Reaproveita alguns atores/eventos
// reais e acrescenta o `status` de moderação + os vínculos (linkedEventIds /
// linkedActorIds). ⚠️ recarregar a página zera para este estado inicial.
let myActors = [
    { ...mockActors[0], status: 'ativo', linkedEventIds: [1] },
    { ...mockActors[4], status: 'bloqueado', linkedEventIds: [] },
]
let myEvents = [
    { ...mockEvents[0], status: 'ativo', linkedActorIds: [1] },
    { ...mockEvents[2], status: 'bloqueado', linkedActorIds: [] },
]

export async function listMyPublications() {
    await mockDelay()
    // Cópias para não expor as referências internas das listas mock.
    return {
        actors: myActors.map((actor) => ({ ...actor })),
        events: myEvents.map((event) => ({ ...event })),
    }
}

// Edita um ATOR do próprio usuário (direto, sem moderação). `changes` traz os
// campos do formulário + `linkedEventIds` (eventos vinculados).
export async function updateMyActor(id, changes) {
    await mockDelay()
    myActors = myActors.map((actor) => (actor.id === id ? { ...actor, ...changes } : actor))
    // Mantém o vínculo coerente nos DOIS lados: os eventos do usuário passam a
    // referenciar (ou não) este ator conforme os linkedEventIds escolhidos.
    if (changes.linkedEventIds) {
        const linkedEvents = new Set(changes.linkedEventIds)
        myEvents = myEvents.map((event) => {
            const actorIds = new Set(event.linkedActorIds ?? [])
            if (linkedEvents.has(event.id)) actorIds.add(id)
            else actorIds.delete(id)
            return { ...event, linkedActorIds: [...actorIds] }
        })
    }
    return myActors.find((actor) => actor.id === id)
}

// Edita um EVENTO do próprio usuário (direto, sem moderação).
export async function updateMyEvent(id, changes) {
    await mockDelay()
    myEvents = myEvents.map((event) => (event.id === id ? { ...event, ...changes } : event))
    // Sincroniza o outro lado: os atores do usuário passam a referenciar (ou não)
    // este evento conforme os linkedActorIds escolhidos.
    if (changes.linkedActorIds) {
        const linkedActors = new Set(changes.linkedActorIds)
        myActors = myActors.map((actor) => {
            const eventIds = new Set(actor.linkedEventIds ?? [])
            if (linkedActors.has(actor.id)) eventIds.add(id)
            else eventIds.delete(id)
            return { ...actor, linkedEventIds: [...eventIds] }
        })
    }
    return myEvents.find((event) => event.id === id)
}
