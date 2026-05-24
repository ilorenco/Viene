import { useState } from 'react'

import { ActorCard } from '@/components/actors/ActorCard'
import { PageBanner } from '@/components/layout/PageBanner'
import { PageHeader } from '@/components/layout/PageHeader'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { mockActorCategories } from '@/mocks/actorCategories'
import { mockActors } from '@/mocks/actors'

export function Actors() {
    const [category, setCategory] = useState('parques')

    return (
        <>
            <PageBanner>
                <PageHeader title="Encontre Atores" />
                <CategoryFilter
                    value={category}
                    onChange={setCategory}
                    options={mockActorCategories}
                />
            </PageBanner>

            <ul className="flex flex-col gap-3">
                {mockActors.map((actor) => (
                    <li key={actor.id}>
                        <ActorCard name={actor.name} description={actor.description} />
                    </li>
                ))}
            </ul>
        </>
    )
}
