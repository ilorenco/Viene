import { EventDetailCard } from './EventDetailCard'

export function EventList({ events, onGenerateTicket }) {
    return (
        <ul className="flex flex-col gap-3">
            {events.map((event) => (
                <li key={event.id}>
                    <EventDetailCard
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
