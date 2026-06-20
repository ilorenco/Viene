import { ActorCard, ActorCardSkeleton } from './ActorCard'

const GRID = 'grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-[3%] lg:grid-cols-3 2xl:grid-cols-4'

export function ActorList({ actors }) {
    return (
        <ul className={GRID}>
            {actors.map((actor) => (
                <li key={actor.id}>
                    <ActorCard
                        id={actor.id}
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

// Grade de placeholders, exibida pelo <Suspense> enquanto os atores carregam.
export function ActorListSkeleton({ count = 8 }) {
    return (
        <ul className={GRID}>
            {Array.from({ length: count }).map((_, index) => (
                <li key={index}>
                    <ActorCardSkeleton />
                </li>
            ))}
        </ul>
    )
}
