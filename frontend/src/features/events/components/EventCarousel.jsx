import { CarouselCard } from '@/components/ui/CarouselCard'
import { DraggableTrack } from '@/components/ui/DraggableTrack'

// Carrossel de eventos (seção "Explore!" da Home, fundo escuro → título claro).
export function EventCarousel({ title, events }) {
    return (
        <section className="flex flex-col gap-2">
            <h2 className="text-background text-xl font-extrabold">{title}</h2>

            {events.length === 0 ? (
                <p className="text-background/50 text-sm">Nenhum evento por aqui.</p>
            ) : (
                <DraggableTrack className="gap-4">
                    {events.map((event) => (
                        <CarouselCard
                            key={event.id}
                            to={`/events/${event.id}`}
                            title={event.title}
                        />
                    ))}
                </DraggableTrack>
            )}
        </section>
    )
}
