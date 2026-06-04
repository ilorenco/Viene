import { DraggableTrack } from '@/components/ui/DraggableTrack'

import { EventCard, EventCardSkeleton } from './EventCard'

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

export function EventCarouselSkeleton({ title, count = 8 }) {
    return (
        <section className="flex flex-col gap-2">
            <h2 className="text-foreground text-xl font-extrabold">{title}</h2>

            <div className="overflow-hidden">
                <div className="flex gap-4">
                    {Array.from({ length: count }).map((_, index) => (
                        <EventCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
