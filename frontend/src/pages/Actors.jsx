import { Suspense, useState } from 'react'

import { ActorList, ActorListSkeleton } from '@/components/actors/ActorList'
import { PageBanner } from '@/components/layout/PageBanner'
import { PageHeader } from '@/components/layout/PageHeader'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { useActors } from '@/hooks/queries/useActors'
import { mockActorCategories } from '@/mocks/actorCategories'

function ActorsResults({ category }) {
    const { data: actors } = useActors(category)
    return <ActorList actors={actors} />
}

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

            <Suspense fallback={<ActorListSkeleton />}>
                <ActorsResults category={category} />
            </Suspense>
        </>
    )
}
