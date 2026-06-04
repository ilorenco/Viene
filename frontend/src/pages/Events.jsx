import { useState } from 'react'

import { PageBanner } from '@/components/layout/PageBanner'
import { PageHeader } from '@/components/layout/PageHeader'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { EventList } from '@/features/events/components/EventList'
import { mockEventCategories } from '@/features/events/mocks/eventCategories'
import { mockEvents } from '@/features/events/mocks/events'

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

            <EventList events={mockEvents} />
        </>
    )
}
