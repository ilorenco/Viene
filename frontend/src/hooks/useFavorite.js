// Hook compartilhado de "favoritar" um item (ator ou evento). Usado pelos
// botões de coração (ver ActorActions). Consulta a lista crua de favoritos
// (leve, só ids) pra saber se ESTE item específico já está favoritado, e
// expõe `toggle()` pra favoritar/desfavoritar.
//
// Sem login, `isFavorited` é sempre false e a consulta nem dispara — quem
// chama `toggle()` deve garantir o login antes (ver useRequireAuth).

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { useAuth } from '@/contexts/AuthContext'
import {
    addFavorite,
    FAVORITES_KEY,
    listFavoriteIds,
    removeFavorite,
} from '@/features/favorites/services/favorites'

export function useFavorite(type, targetId) {
    const { isAuthenticated } = useAuth()
    const queryClient = useQueryClient()

    const { data: favorites } = useQuery({
        queryKey: FAVORITES_KEY,
        queryFn: listFavoriteIds,
        enabled: isAuthenticated,
    })

    const isFavorited =
        isAuthenticated &&
        (favorites ?? []).some((fav) => fav.type === type && fav.targetId === targetId)

    async function toggle() {
        if (isFavorited) {
            await removeFavorite({ type, targetId })
        } else {
            await addFavorite({ type, targetId })
        }
        queryClient.invalidateQueries({ queryKey: FAVORITES_KEY })
    }

    return { isFavorited, toggle }
}
