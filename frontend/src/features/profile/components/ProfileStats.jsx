// Linha de estatísticas do cartão "Minha conta": favoritos, ingressos e eventos
// participados (passados) — todos vindos de dados reais (Favoritos/Ingressos).
// "Eventos participados" conta só os tickets de eventos cuja data já passou;
// "Ingressos comprados" conta todos (passados + futuros).

import { useSuspenseQuery } from '@tanstack/react-query'
import { CalendarRange, Heart, Ticket } from 'lucide-react'
import { Suspense } from 'react'

import { FAVORITES_KEY, listFavoriteIds } from '@/features/favorites/services/favorites'
import { listMyTickets, TICKETS_KEY } from '@/features/tickets/services/tickets'

const today = () => new Date().toISOString().slice(0, 10)

function ProfileStatsContent() {
    const { data: favorites } = useSuspenseQuery({
        queryKey: FAVORITES_KEY,
        queryFn: listFavoriteIds,
    })
    const { data: tickets } = useSuspenseQuery({ queryKey: TICKETS_KEY, queryFn: listMyTickets })

    const eventsAttended = tickets.filter((ticket) => ticket.eventDate < today()).length

    const stats = [
        { icon: CalendarRange, value: eventsAttended, label: 'Eventos participados' },
        { icon: Ticket, value: tickets.length, label: 'Ingressos comprados' },
        { icon: Heart, value: favorites.length, label: 'Favoritos salvos' },
    ]

    return (
        <ul className="border-secondary/10 divide-secondary/10 flex divide-x border-t pt-5">
            {stats.map(({ icon: Icon, value, label }) => (
                <li key={label} className="flex flex-1 flex-col items-center gap-1 px-3">
                    <div className="text-primary flex items-center gap-1.5">
                        <Icon className="size-5" />
                        <span className="text-secondary font-bold">{value}</span>
                    </div>
                    <span className="text-secondary/50 text-center text-xs">{label}</span>
                </li>
            ))}
        </ul>
    )
}

function ProfileStatsFallback() {
    return (
        <ul className="border-secondary/10 flex divide-x border-t pt-5" aria-hidden="true">
            {Array.from({ length: 3 }).map((_, index) => (
                <li key={index} className="flex flex-1 flex-col items-center gap-1.5 px-3">
                    <div className="bg-secondary/10 h-5 w-10 animate-pulse rounded" />
                    <div className="bg-secondary/10 h-3 w-16 animate-pulse rounded" />
                </li>
            ))}
        </ul>
    )
}

export function ProfileStats() {
    return (
        <Suspense fallback={<ProfileStatsFallback />}>
            <ProfileStatsContent />
        </Suspense>
    )
}
