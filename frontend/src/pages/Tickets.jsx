import { Suspense, useState } from 'react'

import { FullBleed } from '@/components/layout/FullBleed'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { DatePicker } from '@/components/ui/DatePicker'
import { EventList, EventListSkeleton } from '@/features/events/components/EventList'
import { useEvents } from '@/features/events/hooks/useEvents'
import { mockTicketDays } from '@/features/tickets/mocks/ticketDays'

function TicketsEvents({ onGenerateTicket }) {
    const { data: events } = useEvents()
    return <EventList events={events} onGenerateTicket={onGenerateTicket} />
}

export function Tickets() {
    const [selectedDate, setSelectedDate] = useState(14)

    function handleGenerateTicket() {
        // TODO: integrar com a geração de ticket quando o backend estiver pronto
    }

    return (
        <>
            <PageHeader title="INGRESSOS" className="text-secondary" />

            <FullBleed className="bg-secondary text-background flex flex-col gap-5 p-6">
                <h2 className="text-3xl font-semibold">Hoje</h2>
                <DatePicker days={mockTicketDays} value={selectedDate} onChange={setSelectedDate} />
            </FullBleed>

            <Suspense fallback={<EventListSkeleton />}>
                <TicketsEvents onGenerateTicket={handleGenerateTicket} />
            </Suspense>

            <Button size="sm" className="self-center">
                VER MAIS EVENTOS
            </Button>
        </>
    )
}
