// Seção "Histórico de eventos" do Perfil: tickets de eventos cuja data já
// passou, mais recente primeiro, limitado a 3 (mesmo recorte do mock antigo).
// A seção inteira não renderiza se não houver nenhum (mesmo padrão de
// MyQuestions) — sem histórico ainda, não faz sentido mostrar a seção vazia.

import { useSuspenseQuery } from '@tanstack/react-query'
import { CalendarCheck } from 'lucide-react'
import { Suspense } from 'react'

import {
    CollectionItem,
    listClass,
    Section,
    SeeAll,
} from '@/features/profile/components/ProfileLayout'
import { listMyTickets, TICKETS_KEY } from '@/features/tickets/services/tickets'

const today = () => new Date().toISOString().slice(0, 10)

function EventHistorySummaryContent() {
    const { data: tickets } = useSuspenseQuery({ queryKey: TICKETS_KEY, queryFn: listMyTickets })

    const past = tickets
        .filter((ticket) => ticket.eventDate < today())
        .sort((a, b) => b.eventDate.localeCompare(a.eventDate))
        .slice(0, 3)

    if (past.length === 0) {
        return null
    }

    return (
        <Section title="Histórico de eventos" action={<SeeAll to="/tickets" />}>
            <ul className={`${listClass} flex flex-col divide-y`}>
                {past.map((ticket) => (
                    <CollectionItem
                        key={ticket.id}
                        icon={CalendarCheck}
                        title={ticket.eventTitle}
                        description={ticket.eventAddress}
                        meta={ticket.eventDatetime}
                        to={`/events/${ticket.eventId}`}
                    />
                ))}
            </ul>
        </Section>
    )
}

export function EventHistorySummary() {
    return (
        <Suspense fallback={null}>
            <EventHistorySummaryContent />
        </Suspense>
    )
}
