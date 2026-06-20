// Hook de busca de UM ator pelo id — no MESMO padrão de detalhe do colega (igual
// ao useEvent dele na main): useSuspenseQuery com a chave ['actor', id]. O loading
// sobe via <Suspense> e o "não encontrado" (data null) é tratado na própria tela.
//
// Mantém o service local getActorById() (src/services/actors.js) como ponto único de
// troca mock -> API real. Devolve o objeto da query (a tela usa `.data`), como o
// useEvent do colega.

import { useSuspenseQuery } from '@tanstack/react-query'

import { getActorById } from '@/features/actors/services/actors'

export function useActor(id) {
    return useSuspenseQuery({ queryKey: ['actor', id], queryFn: () => getActorById(id) })
}
