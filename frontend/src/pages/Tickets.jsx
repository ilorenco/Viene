import { useState } from 'react'

import { EventDetailCard } from '@/components/events/EventDetailCard'
import { FullBleed } from '@/components/layout/FullBleed'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { DatePicker } from '@/components/ui/DatePicker'
import { mockEvents } from '@/mocks/events'

export function Tickets() {
    const [selectedDate, setSelectedDate] = useState(14)

    return (
        <>
            <PageHeader main="INGRESSOS" className="text-secondary" />

            <FullBleed className="bg-secondary text-background flex flex-col gap-5 p-6">
                <h2 className="text-3xl font-semibold">Hoje</h2>
                <DatePicker value={selectedDate} onChange={setSelectedDate} />
            </FullBleed>

            <ul className="flex flex-col gap-3">
                {mockEvents.map((event) => (
                    <li key={event.id}>
                        <EventDetailCard
                            title={event.title}
                            address={event.address}
                            datetime={event.datetime}
                            onGenerateTicket={() => console.log('gerar ticket', event.id)}
                        />
                    </li>
                ))}
            </ul>

            <Button className="self-center text-base">VER MAIS EVENTOS</Button>
        </>
    )
}
