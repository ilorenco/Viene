import { EmptyState } from '@/components/feedback/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'

import { EventDetailCard } from './EventDetailCard'

const GRID = 'grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-[3%] lg:grid-cols-3 2xl:grid-cols-4'

export function EventList({ events, onGenerateTicket }) {
    if (events.length === 0) {
        return <EmptyState message="Nenhum evento encontrado." />
    }

    return (
        <ul className={GRID}>
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
        <ul className={GRID}>
            {Array.from({ length: count }).map((_, index) => (
                <li key={index}>
                    <article
                        aria-hidden="true"
                        className="border-secondary/15 flex w-full flex-col gap-3 rounded-lg border-2 p-3"
                    >
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-3 w-2/3" />
                        <div className="flex items-center justify-between gap-3">
                            <Skeleton className="h-3 w-1/2" />
                            <Skeleton className="h-7 w-20 rounded-full" />
                        </div>
                    </article>
                </li>
            ))}
        </ul>
    )
}
