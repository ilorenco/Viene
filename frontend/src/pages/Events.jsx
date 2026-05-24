import { useState } from 'react'

import { EventDetailCard } from '@/components/events/EventDetailCard'
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

            <ul className="flex flex-col gap-3">
                {mockEvents.map((event) => (
                    <li key={event.id}>
                        <EventDetailCard
                            title={event.title}
                            address={event.address}
                            datetime={event.datetime}
                        />
                    </li>
                ))}
            </ul>
        </>
    )
}
