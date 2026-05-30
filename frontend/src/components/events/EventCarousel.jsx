import { DraggableTrack } from '@/components/ui/DraggableTrack'

import { EventCard } from './EventCard'

export function EventCarousel({ title, events }) {
    return (
        <section className="flex flex-col gap-2">
            <h2 className="text-foreground text-xl font-extrabold">{title}</h2>

            <DraggableTrack className="gap-4">
                {events.map((event) => (
                    <EventCard key={event.id} id={event.id} title={event.title} />
                ))}
            </DraggableTrack>
        </section>
    )
}
