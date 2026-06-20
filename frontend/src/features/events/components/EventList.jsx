import { EventDetailCard } from './EventDetailCard'

export function EventList({ events, onGenerateTicket }) {
    return (
        <ul className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-[3%] lg:grid-cols-3 2xl:grid-cols-4">
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
