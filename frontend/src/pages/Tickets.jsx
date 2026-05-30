import { useState } from 'react'

import { EventList } from '@/components/events/EventList'
import { FullBleed } from '@/components/layout/FullBleed'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { DatePicker } from '@/components/ui/DatePicker'
import { mockEvents } from '@/mocks/events'
import { mockTicketDays } from '@/mocks/ticketDays'

export function Tickets() {
    const [selectedDate, setSelectedDate] = useState(14)

    return (
        <>
            <PageHeader title="INGRESSOS" className="text-secondary" />

            <FullBleed className="bg-secondary text-background flex flex-col gap-5 p-6">
                <h2 className="text-3xl font-semibold">Hoje</h2>
                <DatePicker days={mockTicketDays} value={selectedDate} onChange={setSelectedDate} />
            </FullBleed>

            <EventList
                events={mockEvents}
                onGenerateTicket={(id) => console.log('gerar ticket', id)}
            />

            <Button size="sm" className="self-center">
                VER MAIS EVENTOS
            </Button>
        </>
    )
}
