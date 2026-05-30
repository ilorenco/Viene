import { useState } from 'react'

import { EventList } from '@/components/events/EventList'
import { PageBanner } from '@/components/layout/PageBanner'
import { PageHeader } from '@/components/layout/PageHeader'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { mockEventCategories } from '@/mocks/eventCategories'
import { mockEvents } from '@/mocks/events'

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
