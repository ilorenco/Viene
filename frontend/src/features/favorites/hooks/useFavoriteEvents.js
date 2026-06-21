// Hook de busca dos eventos favoritados, no mesmo padrão de useEvents
// (useSuspenseQuery) — usado pela tela de Favoritos.

import { useSuspenseQuery } from '@tanstack/react-query'

import { listFavoriteEvents } from '@/features/favorites/services/favorites'

export function useFavoriteEvents() {
    return useSuspenseQuery({ queryKey: ['favorites', 'events'], queryFn: listFavoriteEvents }).data
}
