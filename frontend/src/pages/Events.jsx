import { Suspense, useState } from 'react'

import { PageBanner } from '@/components/layout/PageBanner'
import { PageHeader } from '@/components/layout/PageHeader'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { EventList, EventListSkeleton } from '@/features/events/components/EventList'
import { useEvents } from '@/features/events/hooks/useEvents'
import { mockEventCategories } from '@/features/events/mocks/eventCategories'

function EventsResults({ category }) {
    const { data: events } = useEvents(category)
    return <EventList events={events} />
}

export function Events() {
    const [category, setCategory] = useState('workshops')

    return (
        <>
            <PageBanner>
                <PageHeader title="Encontre Eventos" />
                <CategoryFilter
                    value={category}
                    onChange={setCategory}
                    options={mockEventCategories}
                />
            </PageBanner>

            <Suspense fallback={<EventListSkeleton />}>
                <EventsResults category={category} />
            </Suspense>
        </>
    )
}
