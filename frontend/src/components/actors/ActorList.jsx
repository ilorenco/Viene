import { ActorCard } from './ActorCard'

export function ActorList({ actors }) {
    return (
        <ul className="flex flex-col gap-3">
            {actors.map((actor) => (
                <li key={actor.id}>
                    <ActorCard
                        name={actor.name}
                        description={actor.description}
                        image={actor.image}
                    />
                </li>
            ))}
        </ul>
    )
}
