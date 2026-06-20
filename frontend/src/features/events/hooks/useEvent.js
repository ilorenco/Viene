// Hook de busca de UM evento pelo id — mesmo padrão de detalhe do colega (igual ao
// useEvent dele na main e ao nosso useActor): useSuspenseQuery com a chave
// ['event', id]. O loading sobe via <Suspense> e o "não encontrado" (data null) é
// tratado na própria tela. O service getEventById já está no estilo mockDelay.

import { useSuspenseQuery } from '@tanstack/react-query'

import { getEventById } from '@/features/events/services/events'

export function useEvent(id) {
    return useSuspenseQuery({ queryKey: ['event', id], queryFn: () => getEventById(id) })
}
