// Carrossel de atores (seção "Explore!" da Home, fundo escuro → título claro). Usa
// o MESMO CarouselCard do carrossel de eventos, para os dois ficarem idênticos.

import { CarouselCard } from '@/components/ui/CarouselCard'
import { DraggableTrack } from '@/components/ui/DraggableTrack'

export function ActorCarousel({ title, actors }) {
    return (
        <section className="flex flex-col gap-2">
            <h2 className="text-background text-xl font-extrabold">{title}</h2>

            {actors.length === 0 ? (
                <p className="text-background/50 text-sm">Nenhum ator por aqui.</p>
            ) : (
                <DraggableTrack className="gap-4">
                    {actors.map((actor) => (
                        <CarouselCard
                            key={actor.id}
                            to={`/actors/${actor.id}`}
                            title={actor.name}
                            image={actor.image}
                            entityType="ator"
                            entityId={actor.id}
                        />
                    ))}
                </DraggableTrack>
            )}
        </section>
    )
}
