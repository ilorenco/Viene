import { useState } from 'react'

import { ActorList } from '@/components/actors/ActorList'
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

            <ActorList actors={mockActors} />
        </>
    )
}
