import { EmptyState } from '@/components/feedback/EmptyState'

import { ActorCard, ActorCardSkeleton } from './ActorCard'

export function ActorList({ actors }) {
    if (actors.length === 0) {
        return <EmptyState message="Nenhum ator encontrado." />
    }

    return (
        <ul className="flex flex-col gap-3">
            {actors.map((actor) => (
                <li key={actor.id}>
                    <ActorCard
                        name={actor.name}
                        description={actor.description}
                        image={actor.image}
                        neighborhood={actor.neighborhood}
                        city={actor.city}
                    />
                </li>
            ))}
        </ul>
    )
}

export function ActorListSkeleton({ count = 6 }) {
    return (
        <ul className="flex flex-col gap-3">
            {Array.from({ length: count }).map((_, index) => (
                <li key={index}>
                    <ActorCardSkeleton />
                </li>
            ))}
        </ul>
    )
}
