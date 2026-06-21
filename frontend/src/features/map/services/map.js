// Serviço do Mapa Interativo (atores georreferenciados + eventos no mapa).
//
// O Mapa não tem endpoints próprios — reaproveita os catálogos reais de Atores
// e Eventos (que já trazem `position` quando existe). "Sugerir um ponto" também
// reaproveita createActor/createEvent (mesmo POST /atores ou /eventos que os
// modais de cadastro usam): o Mapa só decide, pelo `kind`, qual dos dois chamar.

import { createActor, listActors } from '@/features/actors/services/actors'
import { createEvent, listEvents } from '@/features/events/services/events'

export async function listInnovationUnits() {
    return listActors()
}

export async function listMapEvents() {
    return listEvents()
}

// Sugere um novo ponto (ator ou evento). RN_003: a sugestão entra como pendente
// e passa pela moderação de um administrador antes de aparecer publicamente.
export async function suggestPoint({ kind, ...data }) {
    return kind === 'ator' ? createActor(data) : createEvent(data)
}
