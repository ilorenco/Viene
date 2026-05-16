import useEmblaCarousel from 'embla-carousel-react'

import { EventCard } from './EventCard'

export function EventCarousel({ title, events }) {
    const [emblaRef] = useEmblaCarousel({ align: 'start', dragFree: true })

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
