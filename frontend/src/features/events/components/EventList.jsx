import { EmptyState } from '@/components/feedback/EmptyState'

import { EventDetailCard, EventDetailCardSkeleton } from './EventDetailCard'

export function EventList({ events, onGenerateTicket }) {
    if (events.length === 0) {
        return <EmptyState message="Nenhum evento encontrado." />
    }

    return (
        <ul className="flex flex-col gap-3">
            {events.map((event) => (
                <li key={event.id}>
                    <EventDetailCard
                        id={event.id}
                        title={event.title}
                        address={event.address}
                        datetime={event.datetime}
                        onGenerateTicket={onGenerateTicket && (() => onGenerateTicket(event.id))}
                    />
                </li>
            ))}
        </ul>
    )
}

export function EventListSkeleton({ count = 4 }) {
    return (
        <ul className="flex flex-col gap-3">
            {Array.from({ length: count }).map((_, index) => (
                <li key={index}>
                    <EventDetailCardSkeleton />
                </li>
            ))}
        </ul>
    )
}
