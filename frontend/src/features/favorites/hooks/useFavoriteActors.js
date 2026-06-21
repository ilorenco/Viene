// Hook de busca dos atores favoritados, no mesmo padrão de useActors
// (useSuspenseQuery) — usado pela tela de Favoritos.

import { useSuspenseQuery } from '@tanstack/react-query'

import { listFavoriteActors } from '@/features/favorites/services/favorites'

export function useFavoriteActors() {
    return useSuspenseQuery({ queryKey: ['favorites', 'actors'], queryFn: listFavoriteActors }).data
}
