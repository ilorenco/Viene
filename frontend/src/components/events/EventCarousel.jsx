import { useDraggableCarousel } from '@/hooks/useDraggableCarousel'

import { EventCard } from './EventCard'

export function EventCarousel({ title, events }) {
    const [emblaRef] = useDraggableCarousel()

    return (
        <section className="flex flex-col gap-2">
            <h2 className="text-foreground text-xl font-extrabold">{title}</h2>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4">
                    {events.map((event) => (
                        <EventCard key={event.id} title={event.title} />
                    ))}
                </div>
            </div>
        </section>
    )
}
