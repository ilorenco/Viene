import { Suspense, useState } from 'react'

import { PageBanner } from '@/components/layout/PageBanner'
import { PageHeader } from '@/components/layout/PageHeader'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { ActorList, ActorListSkeleton } from '@/features/actors/components/ActorList'
import { useActors } from '@/features/actors/hooks/useActors'
import { mockActorCategories } from '@/features/actors/mocks/actorCategories'

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
