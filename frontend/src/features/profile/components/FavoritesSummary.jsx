// Resumo "Meus favoritos" do Perfil: substitui os cards fixos "Empresas"/
// "Parques" (que nem batiam com a tela real de Favoritos, organizada por
// Atores/Eventos) por contagens reais, nos mesmos ícones já usados em
// /favorites.

import { useSuspenseQuery } from '@tanstack/react-query'
import { CalendarDays, Users } from 'lucide-react'
import { Suspense } from 'react'

import { FAVORITES_KEY, listFavoriteIds } from '@/features/favorites/services/favorites'
import { CollectionItem, listClass } from '@/features/profile/components/ProfileLayout'

function FavoritesSummaryContent() {
    const { data: favorites } = useSuspenseQuery({
        queryKey: FAVORITES_KEY,
        queryFn: listFavoriteIds,
    })

    const actorsCount = favorites.filter((favorite) => favorite.type === 'ator').length
    const eventsCount = favorites.filter((favorite) => favorite.type === 'evento').length

    return (
        <ul className={`${listClass} grid grid-cols-2 divide-x`}>
            <CollectionItem
                icon={Users}
                title="Atores"
                description={`${actorsCount} favoritado${actorsCount === 1 ? '' : 's'}`}
                to="/favorites"
            />
            <CollectionItem
                icon={CalendarDays}
                title="Eventos"
                description={`${eventsCount} favoritado${eventsCount === 1 ? '' : 's'}`}
                to="/favorites"
            />
        </ul>
    )
}

function FavoritesSummaryFallback() {
    return (
        <ul className={`${listClass} grid grid-cols-2 divide-x`} aria-hidden="true">
            {Array.from({ length: 2 }).map((_, index) => (
                <li key={index} className="flex items-center gap-3 p-4">
                    <div className="bg-secondary/10 size-11 shrink-0 animate-pulse rounded-full" />
                    <div className="bg-secondary/10 h-4 w-20 animate-pulse rounded" />
                </li>
            ))}
        </ul>
    )
}

export function FavoritesSummary() {
    return (
        <Suspense fallback={<FavoritesSummaryFallback />}>
            <FavoritesSummaryContent />
        </Suspense>
    )
}
