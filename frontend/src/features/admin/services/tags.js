// Serviço de Tags (verticais de atores e categorias de eventos), usado pelo
// editor de Tags do admin (Plataforma → Tags).
//
// Estilo da branch do colega: cada função espera um mockDelay() e devolve o mock.
// Hoje os dados de exibição vêm de src/lib/tags.js (atores) e
// src/mocks/eventCategories.js (eventos).
//
// Endpoints reais previstos (a confirmar no contrato — AdminController/Tags):
//   POST   /admin/tags          -> cria uma tag      { label, kind }
//   DELETE /admin/tags/{id}     -> remove uma tag
//
// IMPORTANTE (cascade): ao REMOVER uma tag, o back-end deve, na MESMA operação,
// retirá-la de TODOS os atores/eventos que a utilizavam (atualizar cada registro
// relacionado). O front dispara só esta chamada; quem propaga é o back-end.

import { mockDelay } from '@/mocks/delay'

// kind: 'ator' | 'evento' (a qual conjunto a tag pertence).
export async function createTag({ label, kind }) {
    await mockDelay()
    return { id: `${kind}-${label}`, label, kind }
}

export async function deleteTag({ id, label, kind }) {
    await mockDelay()
    return { id: id ?? `${kind}-${label}`, label, kind, deleted: true }
}
